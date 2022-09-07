import { PickKeyType } from '@core/types/common';
import { EnvironmentVariables } from '../env-variables';

type EnvType = string | number | boolean | undefined;

export const getEnv = (
  key: PickKeyType<EnvironmentVariables, EnvType>,
): string => {
  return process.env[key]!;
};
