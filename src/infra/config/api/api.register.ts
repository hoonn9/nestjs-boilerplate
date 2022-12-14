import { getEnv } from '@infra/config/util/get-env';
import { registerAs } from '@nestjs/config';
import { configValidate } from '../util/env-validation';
import { ApiConfig } from './api.config';

export const apiConfigRegister = registerAs('api', (): ApiConfig => {
  return configValidate(ApiConfig, {
    port: getEnv('PORT'),
    isEnableOpenApiDocs: getEnv('OPEN_API_DOCS_ENABLE') === 'true',
    openApiDocsPath: getEnv('OPEN_API_DOCS_PATH'),
  });
});
