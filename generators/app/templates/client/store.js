import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import authReducer, { loggingOutReducer } from 'reducers/auth';
import displayReducer from 'reducers/display';
import flashMessageReducer from 'reducers/flashMessage';
import userReducer from 'reducers/user';
import statusReducer from 'reducers/status';

import { SET_DIMENSIONS } from 'actions/display';

const logger = createLogger({
  predicate: (getState, action) => action.type !== SET_DIMENSIONS,
});

export function initializeStore(initialState = {}) {
  return createStore(
    combineReducers({
      authentication: authReducer,
      display: displayReducer,
      flashMessages: flashMessageReducer,
      isLoggingOut: loggingOutReducer,
      user: userReducer,
      status: statusReducer,
    }),
    initialState,
    applyMiddleware(thunkMiddleware, logger),
  );
}
