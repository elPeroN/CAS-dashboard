import { userActions } from "./actions"
import { loginUser, registerUser } from "src/services/auth";
import { push } from 'react-router-redux'

export const actionsCreator = {
  login,
  logout,
  register
};

function login(values){
  return dispatch => loginUser(values.email, values.password).then( (response) =>{
    if(response.token){
      dispatch(userActions.loginSuccess(response));
    } else {
      dispatch(userActions.loginError(response.message));
    }
  })
}

function logout(){
  return userActions.logout;
}

function register(values){
  return dispatch => registerUser(values.firstName, values.lastName, values.email, values.password).then( (response) =>{
    console.log(response);
    if(response.status === 200){
      dispatch(userActions.registerSuccess(response));
      //TODO: aggiungere messagio di utente correttamente registrato
      push('/login');
    } else {
      dispatch(userActions.registerError(response.message));
    }
  })
}
