import { userConstants } from "../constants/action-types";

const initialState = ({
  isLogged: false,
  token: "",
  error: null,
  data: null,
  startDate: null,
  endDate: null,
  snackbar : null
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
        error:action.payload
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
        error:action.payload
      };
    case userConstants.ACTIVITIES_REPORT:
      return {
        ...state,
        activities:action.payload,
      };
    case userConstants.SET_END_DATE:
      return {
        ...state,
        endDate: action.payload
      };
    case userConstants.SET_START_DATE:
      return {
        ...state,
        startDate: action.payload
      }
    case userConstants.SEND_NOTIFICATION:
      return {
        ...state,
        snackbar: {
          isOpen: true,
          severity: action.payload.severity,
          message: action.payload.message
        }
      }
    case userConstants.CLEAR_SNACKBAR:
      return {
        ...state,
        snackbar: null
      }
    default: return state;
  }
};

export default rootReducer;
