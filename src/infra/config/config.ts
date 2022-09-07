import { Type } from 'class-transformer';
import { ApiConfig } from './api/api.config';
import { DatabaseConfig } from './database/database.config';

export class Config {
  @Type(() => ApiConfig)
  api: ApiConfig;

  @Type(() => DatabaseConfig)
  database: DatabaseConfig;
}
