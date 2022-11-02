import { JwtConfig } from '@infra/config/auth/jwt/jwt.config';

export type JwtPayload = {
  id: string;
};

export type JwtToken = {
  accessToken: string;
  refreshToken: string;
};

export type JwtType = Pick<JwtConfig, 'access' | 'refresh'>;
