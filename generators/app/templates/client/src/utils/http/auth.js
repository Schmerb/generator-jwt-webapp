import { API_URL, LOGIN, REFRESH } from 'utils/http/urls';
import { normalizeResponseErrors } from './utils';

export const login = ({ username, password }) =>
  new Promise((resolve, reject) => {
    const url = `${API_URL}${LOGIN}`;
    // Base64 encode the string username:password, used in the basic
    // auth field
    const token = btoa(`${username}:${password}`);
    const config = {
      headers: {
        // Provide our username and password as login credentials
        Authorization: `Basic ${token}`,
      },
      method: 'POST',
    };
    fetch(url, config)
      .then(async res => {
        if (res.status === 200) {
          // need to check for 200 before trying to get json from body
          // otherwise throws error
          const data = await res.json();
          return resolve({ status: 200, data });
        }
        if (res.status === 401) {
          // reject if unauthorized
          const err = { status: 401, message: 'Unathorized' };
          reject(err);
        }
        // return entire response if not OK
        resolve(res);
      })
      .catch(err => reject(err));
  });

export const refreshAuthToken = authToken =>
  new Promise((resolve, reject) => {
    return fetch(`${API_URL}${REFRESH}`, {
      method: 'POST',
      headers: {
        // Provide our existing token as credentials to get a new one
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json())
      .then(res => {
        console.log({ res });
        resolve(res.authToken);
      })
      .catch(err => reject(err));
  });
