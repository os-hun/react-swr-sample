const main = 'https://api.github.com';

export const fetch_u_repos = (username: string) => {
  return `${main}/users/${username}/repos`;
};
