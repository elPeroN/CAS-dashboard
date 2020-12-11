import { userConstants } from "../constants/action-types";

const initialState = ({
  isLogged: false,
  token: "",
  error: null,
  time: null
});

export function rootReducer(state = initialState, action) {
  switch(action.type) {
    case userConstants.LOGIN_SUCCESS:
      return  {
        ...state,
        isLogged: true
      };
    case userConstants.LOGIN_ERROR:
      return {
        ...state,
        error:action.payload,
        time: new Date()
      };
    case userConstants.LOGOUT:
      return { initialState };
    case userConstants.REGISTER_SUCCESS:
      return  {
        ...state,
        isLogged: true
      };
    case userConstants.REGISTER_ERROR:
      return {
        ...state,
        error:action.payload,
        time: new Date()
      };
    default: return state;
  }
};

export default rootReducer;
