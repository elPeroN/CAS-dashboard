import { gitlabActions } from "./gitlabActions";
import { appActions } from "src/redux/actions/App/appActions";
import { checkToken, fetchGitlabRepositories, fetchGitlabCommits } from "src/services/gitlab"

export const gitlabActionsCreator = {
  loginGitlab,
  gitlabFlow,
  logoutGitlab,
  getDevelStats
};

function loginGitlab(values){
  return (dispatch, getState) => checkToken(values.token).then( (res) =>{
    localStorage.setItem('gitlabToken', values.token);
    dispatch(gitlabActions.setGitlabToken(values.token));
    dispatch(gitlabFlow(getState().gitlab.gitlabToken));
  })
  .catch( (e) => {
    dispatch(gitlabActions.sendNotification({message:"Wrong token", severity:'error'}));
  });
}


function gitlabFlow(token){
  return dispatch => {
    dispatch(appActions.setBackdrop(true));
    fetchGitlabRepositories(token).then( response => {
      let filter = response.data.filter( (item) =>{
        if(item.name !== "Monitoring") return item;
        else return null;
      })
    if(filter[0]) dispatch(gitlabActions.gitlabReport(filter));
    else dispatch(appActions.sendNotification({message:"GITLAB: No Repositories Found", severity:'warning'}));
    dispatch(appActions.setBackdrop(false));
    })
    .catch( error => {
      dispatch(appActions.setBackdrop(false));
      dispatch(appActions.sendNotification({message:"Gitlab token expired", severity:'warning'}));
      dispatch(logoutGitlab());
    });
  }
}

function logoutGitlab(){
  return dispatch => {
    localStorage.removeItem('gitlabToken');
    dispatch(gitlabActions.setGitlabToken(null));
  }
}

function getDevelStats(token,devel){
  return (dispatch, getState) => {
    dispatch(gitlabActions.setGitlabView('devel'));
    dispatch(appActions.setBackdrop(true));
    dispatch(appActions.sendNotification({message:"it may take some time", severity:'info'}));
    fetchGitlabCommits(getState().gitlab.gitlabToken, getState().gitlab.repositoryIndex).then(response=>{
      let filter = response.data.filter( item =>{
        if(item.author_name === devel) return item;
        else return null;
      })
      dispatch(gitlabActions.develStats(filter));
      dispatch(appActions.setBackdrop(false));
    })
    .catch(error =>{
      dispatch(appActions.setBackdrop(false));
      dispatch(appActions.sendNotification({message:error, severity:'warning'}));
    })
  }
}
