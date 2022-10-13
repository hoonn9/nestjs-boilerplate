import { Module } from '@nestjs/common';
import {
  ConfigModule as BaseConfigModule,
  ConfigService,
} from '@nestjs/config';
import { apiConfigRegister } from './api/api.register';
import { databaseConfigRegister } from './database/database.register';
import { configValidate } from './util/env-validation';
import { Environment, EnvironmentVariables } from './env-variable';
import * as path from 'path';
import { authConfigRegister } from '@infra/config/auth/auth.register';

const rootPathEnv = (envFile: string) =>
  path.resolve(__dirname, '../../../', envFile);

const envPath: Record<Environment, string> = {
  local: rootPathEnv('.local.env'),
  test: rootPathEnv('.test.env'),
  production: rootPathEnv('.production.env'),
};

@Module({
  imports: [
    BaseConfigModule.forRoot({
      envFilePath: envPath[process.env.NODE_ENV || 'local'],
      validate: (config) => configValidate(EnvironmentVariables, config),
      load: [databaseConfigRegister, apiConfigRegister, authConfigRegister],
      isGlobal: true,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
