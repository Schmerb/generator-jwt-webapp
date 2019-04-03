import { SET_CURRENT_USER, CLEAR_CURRENT_USER } from 'actions/user';

export const userReducer = (state = null, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.currentUser;
    case CLEAR_CURRENT_USER:
      return null;
    default:
      return state;
  }
};

export default userReducer;
