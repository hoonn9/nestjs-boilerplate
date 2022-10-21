import request from 'superagent';

export const getCookies = (
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
