export const SHOW_MODAL = 'SHOW_MODAL';
export const showModal = (isOpen, metaData) => ({
  type: SHOW_MODAL,
  isOpen,
  metaData,
});

export const CLOSE_MODAL = 'CLOSE_MODAL';
export const closeModal = () => ({
  type: CLOSE_MODAL,
});

export const RESET_MODAL = 'RESET_MODAL';
export const resetModal = () => ({
  type: RESET_MODAL,
});

export const SHOW_CHANGE_PASSWORD_MODAL = 'SHOW_CHANGE_PASSWORD_MODAL';
export const showChangePasswordModal = (isOpen = true) => ({
  type: SHOW_CHANGE_PASSWORD_MODAL,
  isOpen,
});

export const TOGGLE_MENU = 'TOGGLE_MENU';
export const toggleMenu = () => ({
  type: TOGGLE_MENU,
});

export const CLOSE_MENU = 'CLOSE_MENU';
export const closeMenu = () => ({
  type: CLOSE_MENU,
});

export const SET_DIMENSIONS = 'SET_DIMENSIONS';
export const setDimensions = (width, height) => ({
  type: SET_DIMENSIONS,
  width,
  height,
});
