import { InfraTokens } from '@infra/infra.token';
import { DatabaseHandler } from '@core/common/adapter/database/database.handler';
import { ModuleMetadata } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';

export class TestingServer {
  constructor(
    public readonly testingModule: TestingModule,
    public readonly application: NestApplication,
  ) {}

  public static async new(metadata: ModuleMetadata) {
    const module: TestingModule = await Test.createTestingModule(
      metadata,
    ).compile();

    return new TestingServer(module, module.createNestApplication());
  }

  public async finishTest() {
    const dbHandler = this.testingModule.get<DatabaseHandler>(
      InfraTokens.DatabaseHandler,
    );

    await dbHandler.drop();
    await this.application.close();
  }
}
