import { API_URL, USERS, ME } from 'utils/http/urls';
import { normalizeResponseErrors } from './utils';

/**
 *  Creates a new user in database.
 *
 *  Fields:
 *  Required: ["email", "username", "password"]
 *  Accepted: ["email", "username", "password", "firstName", "lastName"
 *
 * @param {String} data.email - Email of user account
 * @param {String} data.username - Username of user account, used to log in
 * @param {String} data.password - Password of user account
 * @param {String} data.firstName - Password of user account
 * @param {String} data.lastName - Password of user account
 */
export const createUser = data =>
  new Promise((resolve, reject) => {
    const url = `${API_URL}${USERS}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    fetch(url, options)
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json())
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const updateUser = (authToken, data) =>
  new Promise((resolve, reject) => {
    const url = `${API_URL}${ME}`;

    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    const options = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: formData,
    };

    fetch(url, options)
      .then(res => normalizeResponseErrors(res))
      .then(res => res.json())
      .then(res => resolve(res))
      .catch(err => reject(err));
  });

export const deleteUser = authToken =>
  new Promise((resolve, reject) => {
    const url = `${API_URL}${ME}`;
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    };

    fetch(url, options)
      .then(normalizeResponseErrors)
      .then(res => {
        if (res.status === 204) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => {
        const { reason } = err;
        if (reason === 'ValidationError') {
          // eslint-disable-next-line
          console.log(err);
          reject(err);
        }
      });
  });
