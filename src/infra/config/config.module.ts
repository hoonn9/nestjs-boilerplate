import { Module } from '@nestjs/common';
import {
  ConfigModule as BaseConfigModule,
  ConfigService,
} from '@nestjs/config';
import { apiConfigRegister } from './api/api.register';
import { databaseConfigRegister } from './database/database.register';
import { configValidate } from './util/env-validation';
import { EnvironmentVariables } from './env-variable';

@Module({
  imports: [
    BaseConfigModule.forRoot({
      validate: (config) => configValidate(EnvironmentVariables, config),
      load: [databaseConfigRegister, apiConfigRegister],
      isGlobal: true,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
