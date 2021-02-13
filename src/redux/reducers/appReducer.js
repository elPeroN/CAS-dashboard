import { appConstants } from "../constants/action-types";

const initialState = ({
  navbar: false,
  error: null,
  snackbar : null,
  backdrop : false
});

export const appReducer = (state = initialState, action) => {
  switch(action.type) {
    case appConstants.SEND_NOTIFICATION:
      return {
        ...state,
        snackbar: {
          isOpen: true,
          severity: action.payload.severity,
          message: action.payload.message
        }
      }
    case appConstants.CLEAR_SNACKBAR:
      return {
        ...state,
        snackbar: null
      }
    case appConstants.SET_BACKDROP:
     return {
       ...state,
       backdrop: action.payload
     }
    case appConstants.SET_NAVBAR:
     return {
       ...state,
       mobileNav: action.payload
     }
    default: return state;
  }
};
