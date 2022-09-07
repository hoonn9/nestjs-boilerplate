import { getEnv } from '@infra/config/util/get-env';
import { registerAs } from '@nestjs/config';
import { configValidate } from '../util/env-validation';
import { DatabaseConfig } from './database.config';

export const databaseConfigRegister = registerAs('database', () => {
  return configValidate(DatabaseConfig, {
    database: getEnv('DB_DATABASE'),
    host: getEnv('DB_HOST'),
    port: getEnv('DB_PORT'),
    username: getEnv('DB_USERNAME'),
    password: getEnv('DB_PASSWORD'),
  });
});
