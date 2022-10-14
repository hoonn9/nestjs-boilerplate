import { IsNumberOrString } from '@core/common/decorator/validator/is-number-or-string';
import { IsString, Validate } from 'class-validator';

export class JwtConfig {
  @IsString()
  secret: string;

  @Validate(IsNumberOrString)
  expiresIn: string | number;

  @IsString()
  key: string;
}
