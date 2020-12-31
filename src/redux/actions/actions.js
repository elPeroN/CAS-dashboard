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
  }),
  activitiesReport: data =>({
    type: userConstants.ACTIVITIES_REPORT,
    payload: data
  }),
  setEndDate: data => ({
    type: userConstants.SET_END_DATE,
    payload: data
  }),
  setStartDate: data => ({
    type: userConstants.SET_START_DATE,
    payload: data
  }),
  sendNotification: data =>({
    type: userConstants.SEND_NOTIFICATION,
    payload: data
  }),
  clearSnackbar: () =>({
    type: userConstants.CLEAR_SNACKBAR
  }),
  closeBackdrop: () =>({
    type: userConstants.CLOSE_BACKDROP
  }),
  setMobileNavOpen: data =>({
    type: userConstants.SET_NAVBAR,
    payload: data
  }),
  setGitlabToken : data =>({
    type: userConstants.SET_GITLAB_TOKEN,
    payload:data
  }),
  gitlabReport: data => ({
    type:userConstants.GITLAB_REPORT,
    payload:data
  }),
  setGitlabIndex: data =>({
    type:userConstants.SET_GITLAB_INDEX,
    payload:data
  })
};
