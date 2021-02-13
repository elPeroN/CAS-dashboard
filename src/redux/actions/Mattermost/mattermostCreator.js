import { mattermostActions } from "./mattermostActions";
import { appActions } from "src/redux/actions/App/appActions";
import { loginUser, fetchTeams } from "src/services/mattermost";

export const mattermostCreator = {
  loginMattermost,
  logoutMattermost,
  fetchMattermost
};

function loginMattermost(values){
  return dispatch => loginUser(values).then( (res) =>{
    localStorage.setItem('mattermostToken', res.headers.token);
    dispatch(mattermostActions.setMattermostToken(res.headers.token, res.data.id));
    dispatch(fetchMattermost());
  })
  .catch( (e) => {
    console.log(e);
    dispatch(appActions.sendNotification({message:"Wrong token", severity:'error'}));
  });
}

function logoutMattermost(){
  localStorage.removeItem('mattermostToken');
  localStorage.removeItem('mattermostId');
  return dispatch => {
    dispatch(mattermostActions.logoutMattermost());
    dispatch(appActions.sendNotification({message:'SUCCESSFULLY LOGOUT', severity:'success'}));
  }
}

function fetchMattermost(){
  return (dispatch, getState) =>{
    fetchTeams(getState().mattermost.mattermostToken).then((response)=>{
      dispatch(mattermostActions.fetchTeams(response.data));
    })
    .catch(e =>{
      dispatch(appActions.sendNotification({message:'No channels', severity:'warning'}));
    })
  }
}
