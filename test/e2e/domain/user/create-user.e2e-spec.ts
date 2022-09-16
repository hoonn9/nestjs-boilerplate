import { RootModule } from '@application/root.module';
import { HttpStatus } from '@nestjs/common';
import { TestingServer } from '@test/e2e/common/testing-server';
import * as supertest from 'supertest';

describe('CreateUser E2E', () => {
  let testingServer: TestingServer;

  beforeAll(async () => {
    testingServer = await TestingServer.new({
      imports: [RootModule],
    });

    await testingServer.application.init();
  });

  afterAll(async () => {
    await testingServer.finishTest();
  });

  describe('POST /user', () => {
    it('When create user, expect it returns CreateUserDto', async () => {
      const res = await supertest(testingServer.application.getHttpServer())
        .post('/user')
        .query({
          password: undefined,
        })
        .expect(HttpStatus.CREATED);

      expect(res.body).toHaveProperty('id');
    });
  });
});
