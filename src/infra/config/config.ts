import { AuthConfig } from '@infra/config/auth/auth.config';
import { Environment } from '@infra/config/env-variable';
import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiConfig } from './api/api.config';
import { DatabaseConfig } from './database/database.config';

export class Config {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsBoolean()
  @IsOptional()
  API_LOG_ENABLE?: boolean;

  @IsString()
  CRYPTO_AES256_SECRET_KEY: string;

  @Type(() => ApiConfig)
  api: ApiConfig;

  @Type(() => DatabaseConfig)
  database: DatabaseConfig;

  @Type(() => AuthConfig)
  auth: AuthConfig;
}
