import { Module } from '@nestjs/common';
import {
  ConfigModule as BaseConfigModule,
  ConfigService,
} from '@nestjs/config';
import { apiConfigRegister } from './api/api.register';
import { databaseConfigRegister } from './database/database.register';
import { configValidate } from './utils/env-validation';
import { EnvironmentVariables } from './env-variables';

@Module({
  imports: [
    BaseConfigModule.forRoot({
      validate: (config) => configValidate(EnvironmentVariables, config),
      load: [databaseConfigRegister, apiConfigRegister],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
