import { userConstants } from "../constants/action-types";

const initialState = {
  isLogged: false
};

export function rootReducer(state = initialState, action) {
  switch(action.type) {
    case userConstants.LOGIN:
      return { isLogged: true };
    case userConstants.LOGOUT:
      return { isLogged: false };
    default: return state;
  }
};

export default rootReducer;
