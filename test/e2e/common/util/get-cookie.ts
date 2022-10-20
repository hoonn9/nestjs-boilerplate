import request from 'superagent';

export const getCookies = (response: request.Response): string[] => {
  const setCookies: string[] = response.header['set-cookie'];

  return [];
  // setCookies.map((cookie) => {
  //   const splitCookie = cookie.split(';');
  //   if (splitCookie.length) {
  //     const [nameValue] = splitCookie;
  //     nameValue;
  //   }
  // });
};
