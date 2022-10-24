import { UserModelDto } from '@core/domain/user/dto/user.dto';
import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';
import { TestingServer } from '@test/e2e/common/testing-server';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import * as supertest from 'supertest';

describe('CreateUser E2E', () => {
  let testingServer: TestingServer;

  beforeAll(async () => {
    testingServer = await TestingServer.new();

    await testingServer.application.init();
  });

  afterAll(async () => {
    await testingServer.finishTest();
  });

  describe('POST /user', () => {
    it('When create user, expect it returns CreateUserDto', async () => {
      const loginUserRes = await supertest(
        testingServer.application.getHttpServer(),
      )
        .post('/user')
        .send({
          email: faker.internet.email(),
          password: faker.internet.password(),
          phoneNumber: faker.phone.number('###-####-####'),
        });

      expect(loginUserRes.status).toBe(HttpStatus.CREATED);

      const loginUserDto = plainToInstance(UserModelDto, loginUserRes.body);
      expect(validate(loginUserDto)).resolves.toHaveLength(0);
    });
  });
});
