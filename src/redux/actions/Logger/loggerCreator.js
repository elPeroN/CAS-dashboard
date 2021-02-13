import { loggerActions } from "./loggerActions"
import { appActions } from "src/redux/actions/App/appActions";
import { loginUser, registerUser} from "src/services/auth";
import { getActivities } from "src/services/activities";

export const loggerCreator = {
  login,
  loggedFlow,
  logout,
  register,
  fetchActivities,
  setStartDate,
  setEndDate
};

function login(values){
  return dispatch => loginUser(values.email, values.password).then( response =>{
    console.log(response);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('name', response.data.name);
    localStorage.setItem('surname', response.data.surname);
    dispatch(loggerActions.loginSuccess(response.data));
    dispatch(appActions.sendNotification({message:'SUCCESSFULLY LOGIN', severity:'success'}));
  })
  .catch( error => {
    dispatch(loggerActions.loginError(error));
    dispatch(appActions.sendNotification({message:error.toString(), severity:'error'}));
  });
}

function loggedFlow(token){
  return dispatch => {
    let endDate = new Date();
    let startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    dispatch(loggerActions.setStartDate(startDate));
    dispatch(loggerActions.setEndDate(endDate));
    dispatch(appActions.setBackdrop(true));
    dispatch(fetchActivities(token,startDate,endDate));
  }
}
function logout(){
  localStorage.clear();
  return dispatch => {
    dispatch(loggerActions.logout());
    dispatch(appActions.sendNotification({message:'SUCCESSFULLY LOGOUT', severity:'success'}));
  }
}

function register(values){
  return dispatch => registerUser(values.firstName, values.lastName, values.email, values.password).then(
    response => {
      dispatch(loggerActions.registerSuccess(true));
      dispatch(appActions.sendNotification({message:'SUCCESSFULLY REGISTER', severity:'success'}));
    }).catch( error => {
      dispatch(loggerActions.registerError(error));
      dispatch(appActions.sendNotification({message:error.toString(), severity:'error'}));
    });
}

function fetchActivities(token,startDate,endDate){
  return dispatch => getActivities(token,startDate,endDate).then( (response) =>{
    dispatch(loggerActions.activitiesReport(response.data.activities));
    dispatch(appActions.setBackdrop(false))
  })
  .catch( error =>{
     dispatch(loggerActions.activitiesReport(null));
     dispatch(appActions.sendNotification({message:"NO DATA IN SELECTED PERIOD", severity:'warning'}));
     dispatch(appActions.setBackdrop(false));
  })
}

function setEndDate(date){
  return (dispatch, getState) => {
    dispatch(appActions.setBackdrop(true));
    dispatch(loggerActions.setEndDate(date));
    dispatch(fetchActivities(getState().logger.token,getState().logger.startDate,getState().logger.endDate));
  }
}

function setStartDate(date){
  return (dispatch, getState) => {
    dispatch(appActions.setBackdrop(true));
    dispatch(loggerActions.setStartDate(date));
    dispatch(fetchActivities(getState().logger.token,getState().logger.startDate,getState().logger.endDate));
  }
}
