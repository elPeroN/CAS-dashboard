import { userConstants } from "../constants/action-types";
import jwt_decode from 'jwt-decode';

const isValidToken = (token) => {
  let decoded = jwt_decode(token)
  return new Date(decoded.exp*1000) > new Date() ? decoded : null;
}

const initialState = ({
  name: localStorage.getItem('name') ? localStorage.getItem('name') : null,
  surname: localStorage.getItem('surname') ? localStorage.getItem('surname') : null,
  user: localStorage.getItem('token') ? isValidToken(localStorage.getItem('token')) : null,
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  gitlabToken: localStorage.getItem('gitlabToken') ? localStorage.getItem('gitlabToken') : null,
  navbar: false,
  error: null,
  startDate: null,
  endDate: null,
  snackbar : null,
  backdrop : true
});

export function rootReducer(state = initialState, action) {
  switch(action.type) {
    case userConstants.LOGIN_SUCCESS:
      return  {
        ...state,
        name: action.payload.name,
        surname: action.payload.surname,
        token: action.payload.token,
        user: jwt_decode(action.payload.token),
      };
    case userConstants.LOGIN_ERROR:
      return {
        ...state,
        error:action.payload
      };
    case userConstants.LOGOUT:
      return { ...initialState,
        token: null,
        user: null
      };
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
        activities:action.payload
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
    case userConstants.CLOSE_BACKDROP:
     return {
       ...state,
       backdrop: false
     }
    case userConstants.SET_NAVBAR:
     return {
       ...state,
       mobileNav: action.payload
     }
    case userConstants.SET_GITLAB_TOKEN:
      return {
        ...state,
        gitlabToken: action.payload
    }
    case userConstants.GITLAB_REPORT:
      return {
        ...state,
        gitlabRepos: action.payload,
        gitlabIndex: 0
      }
    case userConstants.SET_GITLAB_INDEX:
     return {
       ...state,
       gitlabIndex: action.payload
     }
    default: return state;
  }
};

export default rootReducer;
