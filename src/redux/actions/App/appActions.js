import { appConstants } from "src/redux/constants/action-types";

export const appActions = {
  sendNotification: data =>({
    type: appConstants.SEND_NOTIFICATION,
    payload: data
  }),
  clearSnackbar: () =>({
    type: appConstants.CLEAR_SNACKBAR
  }),
  setBackdrop: data =>({
    type: appConstants.SET_BACKDROP,
    payload: data
  }),
  setMobileNavOpen: data =>({
    type: appConstants.SET_NAVBAR,
    payload: data
  })
};
