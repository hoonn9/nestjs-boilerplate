import { JwtConfig } from '@infra/config/auth/jwt/jwt.config';
import { getEnv } from '@infra/config/util/get-env';
import { registerAs } from '@nestjs/config';
import { configValidate } from '../util/env-validation';
import { AuthConfig } from './auth.config';

export const authConfigRegister = registerAs('auth', (): AuthConfig => {
  const jwtConfig = configValidate(JwtConfig, {
    secret: getEnv('JWT_SECRET_KEY'),
    expiresIn: getEnv('JWT_ACCESS_TOKEN_EXPIRES_IN'),
    key: getEnv('JWT_ACCESS_TOKEN_KEY'),
  });

  return configValidate(AuthConfig, {
    jwt: jwtConfig,
  });
});
