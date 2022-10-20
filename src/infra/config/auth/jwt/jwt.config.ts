import { IsNumberOrString } from '@core/common/decorator/validator/is-number-or-string';
import { Type } from 'class-transformer';
import { IsString, Validate } from 'class-validator';

export class JwtTokenConfig {
  @IsString()
  secret: string;

  @Validate(IsNumberOrString)
  expiresIn: string | number;

  @IsString()
  cookieName: string;
}

export class JwtConfig {
  @Type(() => JwtTokenConfig)
  access: JwtTokenConfig;

  @Type(() => JwtTokenConfig)
  refresh: JwtTokenConfig;
}
