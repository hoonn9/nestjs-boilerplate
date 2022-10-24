import { JwtConfig } from '@infra/config/auth/jwt/jwt.config';
import request from 'superagent';

export const getSetCookies = (
  response: request.Response,
): Record<string, string> => {
  const setCookies: string[] = response.header['set-cookie'];

  return setCookies.reduce((prev, cookie) => {
    const splitCookie = cookie.split(';');
    if (splitCookie.length) {
      const [nameValue] = splitCookie;
      const [name, value] = nameValue.split('=');

      prev[name] = value;
    }

    return prev;
  }, {} as Record<string, string>);
};

export const getAuthCookieByRes = (
  jwtConfig: JwtConfig,
  response: request.Response,
) => {
  const accessTokenCookieName = jwtConfig.access.cookieName;
  const refreshTokenCookieName = jwtConfig.refresh.cookieName;

  const cookies = getSetCookies(response);

  return [
    `${accessTokenCookieName}=${cookies[accessTokenCookieName]}`,
    `${refreshTokenCookieName}=${cookies[refreshTokenCookieName]}`,
  ];
};
