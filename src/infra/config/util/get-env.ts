import { PickKeyType } from '@core/type/common';
import { EnvironmentVariables } from '../env-variable';

type EnvType = string | number | boolean | undefined;

export const getEnv = (
  key: PickKeyType<EnvironmentVariables, EnvType>,
): string => {
  return process.env[key]!;
};
