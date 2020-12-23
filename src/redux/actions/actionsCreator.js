import { userActions } from "./actions"
import { loginUser, registerUser} from "src/services/auth";
import { getActivities } from "src/services/activities";

export const actionsCreator = {
  login,
  logout,
  register,
  fetchActivities,
  setEndDate
};

function login(values){
  return dispatch => loginUser(values.email, values.password).then( (response) =>{
    console.log(response);
    if(response.data.token){
      dispatch(userActions.loginSuccess(response.data));
    } else {
      dispatch(userActions.loginError(response.data.message));
    }
  })
}

function logout(){
  return userActions.logout;
}

function register(values){
  return dispatch => registerUser(values.firstName, values.lastName, values.email, values.password).then( (response) =>{
    if(response.status === 200){
      dispatch(userActions.registerSuccess(true));
    } else {
      dispatch(userActions.registerError(response.message));
    }
  })
}

function fetchActivities(token){
  return dispatch => getActivities(token).then( (response) =>{
    if(response.status === 200){
      dispatch(userActions.activitiesReport(response.data.activities));
    } else {
      //TODO: gestione errore
    }
  })
}

function setEndDate(date){
  return dispatch => dispatch(userActions.setEndDate(date));
}
