import { getEnv } from '@infra/config/util/get-env';
import { registerAs } from '@nestjs/config';
import { configValidate } from '../util/env-validation';
import { AuthConfig } from './auth.config';

export const authConfigRegister = registerAs('auth', (): AuthConfig => {
  return configValidate(AuthConfig, {
    secret: getEnv('JWT_SECRET_KEY'),
    expiresIn: getEnv('JWT_ACCESS_TOKEN_EXPIRES_IN'),
  });
});
