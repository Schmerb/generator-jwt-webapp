//
// Session Storage
//
export const setSessionItem = (key, value) => {
  return sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionItem = key => {
  return JSON.parse(sessionStorage.getItem(key));
};

//
// Local Storage
//
export const setLocalItem = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalItem = key => {
  return JSON.parse(localStorage.getItem(key));
};
