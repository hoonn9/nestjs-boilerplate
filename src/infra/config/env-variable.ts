import { IsNumberOrString } from '@core/common/decorator/validator/is-number-or-string';
import { Transform } from 'class-transformer';
import {
  IsBooleanString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';

export enum Environment {
  Local = 'local',
  Test = 'test',
  Production = 'production',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  @IsString()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_DATABASE: string;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsOptional()
  @IsBooleanString()
  API_LOG_ENABLE: boolean | null;

  @IsString()
  JWT_SECRET_KEY: string;

  @Validate(IsNumberOrString)
  @Transform(({ value }) => {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? value : parsed;
  })
  JWT_ACCESS_TOKEN_EXPIRES_IN: string | number;
}
