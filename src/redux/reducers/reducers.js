import { userConstants } from "../constants/action-types";

const initialState = ({
  isLogged: false,
  token: "",
  error: null,
  time: null,
  data: null
});

export function rootReducer(state = initialState, action) {
  switch(action.type) {
    case userConstants.LOGIN_SUCCESS:
      return  {
        ...state,
        isLogged: true,
        data: action.payload,
        token: action.payload.token
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
        registered: action.payload
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
