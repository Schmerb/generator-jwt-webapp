import uuid from 'uuid';
import { GENERAL_ERROR } from '../utils/text';

export const ADD_FLASH_MESSAGE = 'ADD_FLASH_MESSAGE';
export const flashMessage = (message, messageType = 'success', options) => ({
  type: ADD_FLASH_MESSAGE,
  messageType,
  message,
  options,
  // used to remove specific message from store
  // on animationEnd and onDismissal
  id: uuid(),
});

export const flashSuccess = (message = 'Success', opts = {}) => dispatch => {
  dispatch(flashMessage(message, 'success', opts));
};

// Can be called with message arg
// OR
// without and use generic error message
export const flashError = (message = GENERAL_ERROR, opts = {}) => dispatch => {
  dispatch(flashMessage(message, 'error', opts));
};

export const REMOVE_FLASH_MESSAGE = 'REMOVE_FLASH_MESSAGE';
export const removeFlashMessage = id => ({
  type: REMOVE_FLASH_MESSAGE,
  id,
});
