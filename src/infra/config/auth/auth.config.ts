import { JwtConfig } from '@infra/config/auth/jwt/jwt.config';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class AuthConfig {
  @Type(() => JwtConfig)
  @ValidateNested()
  jwt: JwtConfig;
}
