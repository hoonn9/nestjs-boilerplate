import { InfraInjectTokens } from '@infra/infra.token';
import { DatabaseHandler } from '@core/common/handler/database/database.handler';
import { NestApplication } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { Config } from '@infra/config/config';
import { HttpExceptionFilter } from '@application/api/common/exception-filter/http.exception-filter';
import * as cookieParser from 'cookie-parser';
import { RootModule } from '@application/root.module';

const defaultModule = () => {
  return Test.createTestingModule({
    imports: [RootModule],
  }).compile();
};

export class TestingServer {
  constructor(
    public readonly testingModule: TestingModule,
    public readonly application: NestApplication,
  ) {}

  static async new(module?: TestingModule) {
    if (!module) {
      module = await defaultModule();
    }

    const app: NestApplication = module.createNestApplication();

    const configService: ConfigService<Config> = app.get(ConfigService);
    app.use(cookieParser());
    app.useGlobalFilters(new HttpExceptionFilter(configService));

    return new TestingServer(module, app);
  }

  async finishTest() {
    const dbHandler = this.testingModule.get<DatabaseHandler>(
      InfraInjectTokens.DatabaseHandler,
    );

    await dbHandler.drop();
    await this.application.close();
  }
}
