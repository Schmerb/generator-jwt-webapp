import { ADD_FLASH_MESSAGE, REMOVE_FLASH_MESSAGE } from 'actions/flashMessage';

const initialState = {};
// {
//   message: '',
//   messageType: '',
// },

// stores messages keyed by an ID (uuid) used to keep track of message instances
// uuid keeps id's in sequence so creation order is preserved in object
export const displayReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FLASH_MESSAGE:
      return {
        ...state,
        [action.id]: {
          messageType: action.messageType,
          message: action.message,
          options: action.options,
        },
      };
    case REMOVE_FLASH_MESSAGE:
      const { [action.id]: removed, ...rest } = state;
      return rest;
    default:
      return state;
  }
};

export default displayReducer;
