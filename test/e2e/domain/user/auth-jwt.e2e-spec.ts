import { AuthService } from '@application/api/auth/auth.service';
import { RootModule } from '@application/root.module';
import { faker } from '@faker-js/faker';
import { AuthConfig } from '@infra/config/auth/auth.config';
import { JwtConfig } from '@infra/config/auth/jwt/jwt.config';
import { Config } from '@infra/config/config';
import { HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TestingServer } from '@test/e2e/common/testing-server';
import { getCookies } from '@test/e2e/common/util/get-cookie';
import * as supertest from 'supertest';

describe('AuthJwt E2E', () => {
  let testingServer: TestingServer;
  // let configService: ConfigService<Config>;
  let jwtConfig: JwtConfig;

  beforeAll(async () => {
    testingServer = await TestingServer.new({
      imports: [RootModule],
      providers: [
        {
          provide: ConfigService,
          useFactory: (configService: ConfigService) => {
            return {
              getOrThrow: (key: string) => {
                if (key === 'auth') {
                  return {};
                }
                return configService.getOrThrow(key);
              },
            };
          },
        },
      ],
    });

    const configService = testingServer.application.get(ConfigService);
    jwtConfig = configService.getOrThrow<AuthConfig>('auth').jwt;
    await testingServer.application.init();
  });

  afterAll(async () => {
    await testingServer.finishTest();
  });

  describe('POST /user', () => {
    it('When create user, expect it returns CreateUserDto', async () => {
      // configService.getOrThrow = jest.fn().mockReturnValue({
      //   jwt: {
      //     ...jwtConfig,
      //     access: {
      //       ...jwtConfig.access,
      //       expiresIn: 0,
      //     },
      //   },
      // });

      const email = faker.internet.email();
      const password = faker.internet.password();
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
      expect(joinUserRes.body).toHaveProperty('id');

      const loginUserRes = await supertest(
        testingServer.application.getHttpServer(),
      )
        .post('/auth/login')
        .send({
          email,
          password,
        });

      expect(loginUserRes.status).toBe(HttpStatus.OK);
      // expect(joinUserRes.body).toHaveProperty('id');
      const cookies = getCookies(loginUserRes);

      const setCookies = [
        `${jwtConfig.access.cookieName}=${
          cookies[jwtConfig.access.cookieName]
        }`,
        `${jwtConfig.refresh.cookieName}=${
          cookies[jwtConfig.refresh.cookieName]
        }`,
      ];

      const getUserMeRes = await supertest(
        testingServer.application.getHttpServer(),
      )
        .get('/user/me')
        .set('Cookie', setCookies)
        .withCredentials();

      expect(getUserMeRes.status).toBe(HttpStatus.UNAUTHORIZED);

      const requestAccessTokenRes = await supertest(
        testingServer.application.getHttpServer(),
      )
        .post('/auth/refresh')
        .set('Cookie', setCookies)
        .withCredentials();

      expect(requestAccessTokenRes.status).toBe(HttpStatus.OK);
    });
  });
});
