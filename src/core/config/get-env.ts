import { PickKeyType } from '@core/type-utils';
import { EnvironmentVariables } from '@infra/config/env-variables';

type EnvType = string | number | boolean | undefined;

export const getEnv = <T extends EnvType>(
  key: PickKeyType<EnvironmentVariables, T>,
): T => {
  const value = process.env[key];
  return value as T;
};
