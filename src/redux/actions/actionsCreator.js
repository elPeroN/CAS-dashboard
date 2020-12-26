import { userActions } from "./actions"
import { loginUser, registerUser} from "src/services/auth";
import { getActivities } from "src/services/activities";

export const actionsCreator = {
  login,
  logout,
  register,
  fetchActivities,
  setStartDate,
  setEndDate,
  clearSnackbar
};

function login(values){
  return dispatch => loginUser(values.email, values.password).then( response =>{
    dispatch(userActions.loginSuccess(response.data));
    let endDate = new Date();
    let startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    dispatch(userActions.setStartDate(startDate));
    dispatch(userActions.setEndDate(endDate));
    dispatch(fetchActivities(response.data.token,startDate,endDate));
    dispatch(userActions.sendNotification({message:'SUCCESSFULLY LOGIN', severity:'success'}));
  })
  .catch( error => {
    dispatch(userActions.loginError(error));
    dispatch(userActions.sendNotification({message:error.toString(), severity:'error'}));//TODO: switch sui casi di errore
  });
}

function logout(){
  return dispatch => {
    dispatch(userActions.logout());
    dispatch(userActions.sendNotification({message:'SUCCESSFULLY LOGOUT', severity:'success'}));
  }
}

function register(values){
  return dispatch => registerUser(values.firstName, values.lastName, values.email, values.password).then(
    response => {
      dispatch(userActions.registerSuccess(true));
      dispatch(userActions.sendNotification({message:'SUCCESSFULLY REGISTER', severity:'success'}));
    }).catch( error => {
      dispatch(userActions.registerError(error));
      dispatch(userActions.sendNotification({message:error.toString(), severity:'error'}));//TODO: switch sui casi di errore
    });
}

function fetchActivities(token,startDate,endDate){

  return dispatch => getActivities(token,startDate,endDate).then( (response) =>{
    dispatch(userActions.activitiesReport(response.data.activities));
  })
  .catch( error =>{
     dispatch(userActions.activitiesReport(null));
     dispatch(userActions.sendNotification({message:"NO DATA IN SELECTED PERIOD", severity:'warning'}));//TODO: switch sui casi di errore
  })
}

function setEndDate(date){
  return (dispatch, getState) => {
    dispatch(userActions.setEndDate(date));
    dispatch(fetchActivities(getState().token,getState().startDate,getState().endDate));
  }
}

function setStartDate(date){
  return (dispatch, getState) => {
    dispatch(userActions.setStartDate(date));
    dispatch(fetchActivities(getState().token,getState().startDate,getState().endDate));
  }
}

function clearSnackbar(){
  return dispatch => {
    dispatch(userActions.clearSnackbar())
  }
}
