import { UserModelDto } from '@core/domain/user/dto/user.dto';
import { faker } from '@faker-js/faker';
import { AuthConfig } from '@infra/config/auth/auth.config';
import { JwtConfig } from '@infra/config/auth/jwt/jwt.config';
import { HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TestingServer } from '@test/e2e/common/testing-server';
import {
  getAuthCookieByRes,
  getSetCookies,
} from '@test/e2e/common/util/get-cookie';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import request from 'superagent';
import * as supertest from 'supertest';

describe('AuthJwt E2E', () => {
  let testingServer: TestingServer;
  let jwtConfig: JwtConfig;

  describe('RefreshToken', () => {
    let email: string;
    let password: string;
    let loginUserRes: request.Response;

    beforeAll(async () => {
      // Set access token expire time to 0 second
      process.env = {
        ...process.env,
        JWT_ACCESS_TOKEN_EXPIRES_IN: '0',
      };

      testingServer = await TestingServer.new();

      const configService = testingServer.application.get(ConfigService);
      jwtConfig = configService.getOrThrow<AuthConfig>('auth').jwt;

      await testingServer.application.init();
    });

    afterAll(async () => {
      await testingServer.finishTest();
    });

    it('When create user, expect it returns CreateUserDto', async () => {
      email = faker.internet.email();
      password = faker.internet.password();

      const joinUserRes = await supertest(
        testingServer.application.getHttpServer(),
      )
        .post('/user')
        .send({
          email,
          password,
          phoneNumber: faker.phone.number('###-####-####'),
        });

      expect(joinUserRes.status).toBe(HttpStatus.CREATED);
      expect(joinUserRes.body.statusCode).toBe(HttpStatus.CREATED);

      const joinUserDto = plainToInstance(UserModelDto, joinUserRes.body.data);

      expect(validate(joinUserDto)).resolves.toHaveLength(0);
    });

    it('When login user, expect it returns UserModelDto and set-cookie with accessToken and refreshToken in response header', async () => {
      loginUserRes = await supertest(testingServer.application.getHttpServer())
        .post('/auth/login')
        .send({
          email,
          password,
        });

      expect(loginUserRes.status).toBe(HttpStatus.OK);
      expect(loginUserRes.body.statusCode).toBe(HttpStatus.OK);

      const loginUserDto = plainToInstance(
        UserModelDto,
        loginUserRes.body.data,
      );
      expect(validate(loginUserDto)).resolves.toHaveLength(0);
    });

    it('When request with an expired accessToken, expect it returns Unauthorized response', async () => {
      const getUserMeRes = await supertest(
        testingServer.application.getHttpServer(),
      )
        .get('/user/me')
        .set('Cookie', getAuthCookieByRes(jwtConfig, loginUserRes))
        .withCredentials();

      expect(getUserMeRes.status).toBe(HttpStatus.UNAUTHORIZED);
      expect(getUserMeRes.body.statusCode).toBe(HttpStatus.UNAUTHORIZED);
    });

    it('When refreshToken, expect it returns new access token and new refresh token', async () => {
      // for expire time gap
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const refreshTokenRes = await supertest(
        testingServer.application.getHttpServer(),
      )
        .post('/auth/refresh')
        .set('Cookie', getAuthCookieByRes(jwtConfig, loginUserRes))
        .withCredentials();

      expect(refreshTokenRes.status).toBe(HttpStatus.OK);
      expect(refreshTokenRes.body.statusCode).toBe(HttpStatus.OK);

      const prevCookies = getSetCookies(loginUserRes);
      const newCookies = getSetCookies(refreshTokenRes);

      expect(newCookies).toHaveProperty(jwtConfig.access.cookieName);
      expect(newCookies).toHaveProperty(jwtConfig.refresh.cookieName);

      expect(newCookies[jwtConfig.access.cookieName]).not.toEqual(
        prevCookies[jwtConfig.access.cookieName],
      );
      expect(newCookies[jwtConfig.refresh.cookieName]).not.toEqual(
        prevCookies[jwtConfig.refresh.cookieName],
      );
    });
  });
});
