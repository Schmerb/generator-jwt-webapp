import Cookies from 'universal-cookie';

const cookies = new Cookies();

const defaultOpts = {
  path: '/',
  maxAge: 60 * 60 * 24 * 4, // === 4 days, relative lifespan in seconds from now until maxAge
};

export const getCookie = (name, opts) => {
  const res = cookies.get(name, defaultOpts);
  if (res) {
    return JSON.parse(res);
  }
  return false;
};

export const setCookie = (name, value, opts) => {
  return cookies.set(name, JSON.stringify(value), defaultOpts);
};
