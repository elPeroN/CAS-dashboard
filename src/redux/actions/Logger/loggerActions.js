import { loggerConstants } from "src/redux/constants/action-types";

export const loggerActions = {
  loginSuccess: data => ({
    type: loggerConstants.LOGIN_SUCCESS,
    payload: data
  }),
  loginError: data => ({
    type: loggerConstants.LOGIN_ERROR,
    payload: data
  }),
  logout: () =>({
    type: loggerConstants.LOGOUT
  }),
  registerSuccess: data => ({
    type: loggerConstants.REGISTER_SUCCESS,
    payload: data
  }),
  registerError: data => ({
    type: loggerConstants.REGISTER_ERROR,
    payload: data
  }),
  activitiesReport: data =>({
    type: loggerConstants.ACTIVITIES_REPORT,
    payload: data
  }),
  setEndDate: data => ({
    type: loggerConstants.SET_END_DATE,
    payload: data
  }),
  setStartDate: data => ({
    type: loggerConstants.SET_START_DATE,
    payload: data
  })
};
