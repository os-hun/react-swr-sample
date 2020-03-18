const main = 'https://api.github.com';

export const URepo = (username: string) => {
  const api = main + `/users/${username}/repos`;
  return api
};
