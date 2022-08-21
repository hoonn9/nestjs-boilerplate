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
}
