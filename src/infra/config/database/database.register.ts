import { getEnv } from '@infra/config/utils/get-env';
import { registerAs } from '@nestjs/config';
import { configValidate } from '../utils/env-validation';
import { DatabaseConfig } from './database.config';

export const databaseConfigRegister = registerAs('database', () => {
  return configValidate(DatabaseConfig, {
    database: getEnv('DB_DATABASE'),
    host: getEnv('DB_HOST'),
    port: getEnv('DB_PORT'),
  });
});
