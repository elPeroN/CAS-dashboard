import { userConstants } from "../constants/action-types";

export const userActions = {
  loginSuccess: data => ({
    type: userConstants.LOGIN_SUCCESS,
    payload: data
  }),
  loginError: data => ({
    type: userConstants.LOGIN_ERROR,
    payload: data
  }),
  logout: () =>({
    type: userConstants.LOGOUT
  }),
  registerSuccess: data => ({
    type: userConstants.REGISTER_SUCCESS,
    payload: data
  }),
  registerError: data => ({
    type: userConstants.REGISTER_ERROR,
    payload: data
  })
};
