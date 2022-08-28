import { getEnv } from '@core/config/get-env';
import { registerAs } from '@nestjs/config';
import { DatabaseConfig } from './database.config';

export const databaseConfigRegister = registerAs(
  'database',
  (): DatabaseConfig => {
    return {
      host: getEnv('DB_HOST'),
      port: getEnv('DB_PORT'),
      database: getEnv('DB_DATABASE'),
    };
  },
);
