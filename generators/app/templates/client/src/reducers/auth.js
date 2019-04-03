import { SET_AUTH_TOKEN, SET_LOGGING_OUT } from 'actions/auth';

const initialState = {
  authToken: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      return { ...state, authToken: action.authToken };
    default:
      return state;
  }
};

export const loggingOutReducer = (state = false, action) => {
  switch (action.type) {
    case SET_LOGGING_OUT:
      return action.loggingOut;
    default:
      return state;
  }
};

export default authReducer;
