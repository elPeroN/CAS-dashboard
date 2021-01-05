import { userActions } from "./actions"
import { loginUser, registerUser} from "src/services/auth";
import { checkToken, fetchGitlabRepositories, fetchGitlabCommits } from "src/services/gitlab"
import { getActivities } from "src/services/activities";

export const actionsCreator = {
  login,
  loggedFlow,
  logout,
  register,
  fetchActivities,
  setStartDate,
  setEndDate,
  clearSnackbar,
  loginGitlab,
  gitlabFlow,
  logoutGitlab,
  getDevelStats
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
    dispatch(userActions.setBackdrop(true));
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
    dispatch(userActions.setBackdrop(false))
  })
  .catch( error =>{
     dispatch(userActions.activitiesReport(null));
     dispatch(userActions.sendNotification({message:"NO DATA IN SELECTED PERIOD", severity:'warning'}));//TODO: switch sui casi di errore
     dispatch(userActions.setBackdrop(false));
  })
}

function setEndDate(date){
  return (dispatch, getState) => {
    dispatch(userActions.setBackdrop(true));
    dispatch(userActions.setEndDate(date));
    dispatch(fetchActivities(getState().token,getState().startDate,getState().endDate));
  }
}

function setStartDate(date){
  return (dispatch, getState) => {
    dispatch(userActions.setBackdrop(true));
    dispatch(userActions.setStartDate(date));
    dispatch(fetchActivities(getState().token,getState().startDate,getState().endDate));
  }
}

function clearSnackbar(){
  return dispatch => {
    dispatch(userActions.clearSnackbar())
  }
}

function loginGitlab(values){
  return dispatch => checkToken(values.token).then( (res) =>{
    localStorage.setItem('gitlabToken', values.token);
    dispatch(userActions.setGitlabToken(values.token));
  })
  .catch( (e) => {
    dispatch(userActions.sendNotification({message:"Wrong token", severity:'error'}));
  });
}


function gitlabFlow(token){
  return dispatch => fetchGitlabRepositories(token).then( response => {
    let filter = response.data.filter( (item) =>{
      if(item.name !== "Monitoring") return item;
      else return null;
    })
    if(filter[0]) dispatch(userActions.gitlabReport(filter));
    else dispatch(userActions.sendNotification({message:"GITLAB: No Repositories Found", severity:'warning'}));
  })
  .catch( error => {
    dispatch(userActions.sendNotification({message:"Gitlab token expired", severity:'warning'}));
    dispatch(logoutGitlab());
  });
}

function logoutGitlab(){
  return dispatch => {
    localStorage.removeItem('gitlabToken');
    dispatch(userActions.setGitlabToken(null));
  }
}

function getDevelStats(token,devel){
  return (dispatch, getState) => {
    dispatch(userActions.setGitlabView('devel'));
    dispatch(userActions.setBackdrop(true));
    dispatch(userActions.sendNotification({message:"it may take some time", severity:'info'}));
    fetchGitlabCommits(getState().gitlabToken,getState().repositoryIndex).then(response=>{
      let filter = response.data.filter( item =>{
        if(item.author_name === devel) return item;
        else return null;
      })
      dispatch(userActions.develStats(filter));
      dispatch(userActions.setBackdrop(false));
    })
    .catch(error =>{
      dispatch(userActions.setBackdrop(false));
      dispatch(userActions.sendNotification({message:error, severity:'warning'}));
    })
  }
}
