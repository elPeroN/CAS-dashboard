import { userActions } from "./actions"
import { loginUser, registerUser} from "src/services/auth";
import { getActivities } from "src/services/activities";

export const actionsCreator = {
  login,
  loggedFlow,
  logout,
  register,
  fetchActivities,
  setStartDate,
  setEndDate,
  clearSnackbar
};

function login(values){
  return dispatch => loginUser(values.email, values.password).then( response =>{
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('name', response.data.name);
    localStorage.setItem('surname', response.data.surname);
    dispatch(userActions.loginSuccess(response.data));
    dispatch(userActions.sendNotification({message:'SUCCESSFULLY LOGIN', severity:'success'}));
  })
  .catch( error => {
    dispatch(userActions.loginError(error));
    dispatch(userActions.sendNotification({message:error.toString(), severity:'error'}));//TODO: switch sui casi di errore
  });
}

function loggedFlow(token){
  return dispatch => {
    let endDate = new Date();
    let startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    dispatch(userActions.setStartDate(startDate));
    dispatch(userActions.setEndDate(endDate));
    //dispatch(userActions.setNavbar());
    dispatch(fetchActivities(token,startDate,endDate));
  }
}
function logout(){
  localStorage.clear();
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
  return (dispatch, getState) => getActivities(token,startDate,endDate).then( (response) =>{
    dispatch(userActions.activitiesReport(response.data.activities));
    if(getState().backdrop) dispatch(userActions.closeBackdrop())
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
