import {
  SHOW_MODAL,
  CLOSE_MODAL,
  RESET_MODAL,
  SHOW_CHANGE_PASSWORD_MODAL,
  TOGGLE_MENU,
  CLOSE_MENU,
  SET_DIMENSIONS,
} from 'actions/display';

const initialModalState = {
  isOpen: false,
  metaData: null,
};

const initialState = {
  dimensions: {
    width: 0,
    height: 0,
  },
  modal: {
    ...initialModalState,
  },
  passwordModal: {
    ...initialModalState,
  },
  menuIsOpen: false, // Aside menu (slideout)
};

export const displayReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        modal: {
          isOpen: action.isOpen,
          metaData: action.metaData,
        },
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modal: {
          ...state.modal,
          isOpen: false,
        },
      };
    case RESET_MODAL: {
      return {
        ...state,
        modal: initialModalState,
      };
    }
    case SHOW_CHANGE_PASSWORD_MODAL:
      return {
        ...state,
        passwordModal: {
          isOpen: action.isOpen,
        },
      };
    case TOGGLE_MENU:
      return {
        ...state,
        menuIsOpen: !state.menuIsOpen,
      };
    case CLOSE_MENU:
      return {
        ...state,
        menuIsOpen: false,
      };
    case SET_DIMENSIONS:
      return {
        ...state,
        dimensions: {
          width: action.width,
          height: action.height,
        },
      };
    default:
      return state;
  }
};

export default displayReducer;
