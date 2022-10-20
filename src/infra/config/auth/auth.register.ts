import { JwtConfig, JwtTokenConfig } from '@infra/config/auth/jwt/jwt.config';
import { getEnv } from '@infra/config/util/get-env';
import { registerAs } from '@nestjs/config';
import { configValidate } from '../util/env-validation';
import { AuthConfig } from './auth.config';

export const authConfigRegister = registerAs('auth', (): AuthConfig => {
  const accessTokenConfig = configValidate(JwtTokenConfig, {
    secret: getEnv('JWT_ACCESS_TOKEN_SECRET_KEY'),
    expiresIn: getEnv('JWT_ACCESS_TOKEN_EXPIRES_IN'),
    cookieName: getEnv('JWT_ACCESS_TOKEN_NAME'),
  });

  const refreshTokenConfig = configValidate(JwtTokenConfig, {
    secret: getEnv('JWT_REFRESH_TOKEN_SECRET_KEY'),
    expiresIn: getEnv('JWT_REFRESH_TOKEN_EXPIRES_IN'),
    cookieName: getEnv('JWT_REFRESH_TOKEN_NAME'),
  });

  const jwtConfig = configValidate(JwtConfig, {
    access: accessTokenConfig,
    refresh: refreshTokenConfig,
  });

  return configValidate(AuthConfig, {
    jwt: jwtConfig,
  });
});
