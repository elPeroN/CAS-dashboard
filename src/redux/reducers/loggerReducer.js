import { loggerConstants } from "../constants/action-types";
import jwt_decode from 'jwt-decode';

const isValidToken = (token) => {
  let decoded = jwt_decode(token)
  return new Date(decoded.exp*1000) > new Date() ? decoded : null;
}

const initialState = ({
  name: localStorage.getItem('name') ? localStorage.getItem('name') : null,
  surname: localStorage.getItem('surname') ? localStorage.getItem('surname') : null,
  user: localStorage.getItem('loggerToken') ? isValidToken(localStorage.getItem('loggerToken')) : null,
  loggerToken: localStorage.getItem('loggerToken') ? localStorage.getItem('loggerToken') : null,
  startDate: null,
  endDate: null
});

export const loggerReducer = (state = initialState, action) => {
  switch(action.type) {
    case loggerConstants.LOGIN_SUCCESS:
      return  {
        ...state,
        name: action.payload.name,
        surname: action.payload.surname,
        loggerToken: action.payload.token,
        user: jwt_decode(action.payload.token),
      };
    case loggerConstants.LOGIN_ERROR:
      return {
        ...state,
        error:action.payload
      };
    case loggerConstants.LOGOUT:
      return { ...initialState,
        loggerToken: null,
        user: null
      };
    case loggerConstants.REGISTER_SUCCESS:
      return  {
        ...state,
        registered: action.payload
      };
    case loggerConstants.REGISTER_ERROR:
      return {
        ...state,
        error:action.payload
      };
    case loggerConstants.ACTIVITIES_REPORT:
      return {
        ...state,
        activities:action.payload
      };
    case loggerConstants.SET_END_DATE:
      return {
        ...state,
        endDate: action.payload
      };
    case loggerConstants.SET_START_DATE:
      return {
        ...state,
        startDate: action.payload
      }
    default: return state;
  }
};
