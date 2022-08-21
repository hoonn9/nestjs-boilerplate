import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as request from 'supertest';
import { TestingServer } from '@test/e2e/common/testing-server';
import { AppController } from '@application/api/app.controller';
import loadConfig from '@infra/config/load';
describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const server = await TestingServer.new({
      imports: [
        ConfigModule.forRoot({
          load: [loadConfig],
        }),
      ],
      controllers: [AppController],
      providers: [ConfigService],
    });
    app = await server.application.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
