import jwtDecode from 'jwt-decode';

import { setCurrentUser, clearUserState } from 'actions/user';
import { getLocalItem, setLocalItem } from 'utils/storage';
import { refreshAuthToken, login as loginHttp } from 'utils/http/auth';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
  type: SET_AUTH_TOKEN,
  authToken,
});

export const SET_LOGGING_OUT = 'SET_LOGGING_OUT';
export const setLoggingOut = loggingOut => ({
  type: SET_LOGGING_OUT,
  loggingOut,
});

// Stores the auth token in state and localStorage, and decodes and stores
// the user data stored in the token
export const storeAuthInfo = authToken => dispatch =>
  new Promise(resolve => {
    const decodedToken = jwtDecode(authToken);
    const { user } = decodedToken;
    dispatch(setAuthToken(authToken));
    dispatch(setCurrentUser(user));
    setLocalItem('authToken', authToken);
    resolve();
  });

export const logout = () => dispatch =>
  new Promise(resolve => {
    dispatch(clearUserState());
    resolve();
  });

export const login = ({
  username,
  password,
  redirect = true,
  router,
}) => dispatch =>
  new Promise((resolve, reject) => {
    loginHttp({ username, password })
      .then(async res => {
        const { authToken } = res.data;
        await dispatch(storeAuthInfo(authToken));
        if (redirect) {
          router.push('/dashboard');
        }
        resolve(true);
      })
      .catch(err => reject(err));
  });

export const checkForAuthToken = () => dispatch =>
  new Promise(async resolve => {
    const authToken = getLocalItem('authToken');
    if (authToken) {
      refreshAuthToken(authToken)
        .then(newToken => {
          dispatch(storeAuthInfo(newToken));
          resolve(newToken);
        })
        .catch(err => {
          const { code } = err;
          if (code === 401) {
            // We couldn't get a refresh token because our current credentials
            // are invalid or expired, so clear them and sign us out
            dispatch(logout());
          }
          resolve(null);
        });
    } else {
      resolve(null);
    }
  });
