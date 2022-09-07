import { getEnv } from '@infra/config/utils/get-env';
import { registerAs } from '@nestjs/config';
import { configValidate } from '../utils/env-validation';
import { ApiConfig } from './api.config';

export const apiConfigRegister = registerAs('api', (): ApiConfig => {
  return configValidate(ApiConfig, {
    port: getEnv('PORT'),
  });
});
