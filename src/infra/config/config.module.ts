import { Module } from '@nestjs/common';
import {
  ConfigModule as BaseConfigModule,
  ConfigService,
} from '@nestjs/config';
import { apiConfigRegister } from './api/api.register';
import { databaseConfigRegister } from './database/database.register';
import { configValidate } from './util/env-validation';
import { EnvironmentVariables } from './env-variable';
import * as path from 'path';

const rootPathEnv = (envFile: string) =>
  path.resolve(__dirname, '../../../', envFile);

const envPath: Record<EnvironmentVariables['NODE_ENV'], string> = {
  local: rootPathEnv('.local.env'),
  test: rootPathEnv('.test.env'),
  production: rootPathEnv('.production.env'),
};

@Module({
  imports: [
    BaseConfigModule.forRoot({
      envFilePath: envPath[process.env.NODE_ENV || 'local'],
      validate: (config) => configValidate(EnvironmentVariables, config),
      load: [databaseConfigRegister, apiConfigRegister],
      isGlobal: true,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
