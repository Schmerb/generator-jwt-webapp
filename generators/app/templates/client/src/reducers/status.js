import { SET_LOADED } from 'actions/status';

const initialState = {
  loaded: false,
};

export const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADED:
      return {
        ...state,
        loaded: true,
      };
    default:
      return state;
  }
};

export default statusReducer;
