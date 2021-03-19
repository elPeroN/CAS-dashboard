import { mattermostActions } from "./mattermostActions";
import { appActions } from "src/redux/actions/App/appActions";
import { loginUser, getUserChannels, fetchUnread, fetchTeams, getChannelData } from "src/services/mattermost";

export const mattermostCreator = {
  loginMattermost,
  logoutMattermost,
  mattermostFlow
};

function loginMattermost(values){
  return dispatch => loginUser(values).then( (res) =>{
    localStorage.setItem('mattermostToken', res.headers.token);
    localStorage.setItem('mattermostId', res.data.id);
    dispatch(mattermostActions.setMattermostToken(res.headers.token, res.data.id));
    dispatch(mattermostFlow());
  })
  .catch( (e) => {
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

function mattermostFlow(){
  return (dispatch, getState) =>{
    fetchTeams(getState().mattermost.mattermostToken, getState().mattermost.mattermostId).then((response)=>{
      dispatch(mattermostActions.setTeams(response.data));
      dispatch(fetchChannels());
    })
    .catch(e =>{
      dispatch(mattermostActions.logoutMattermost());
    })
  }
}

function fetchChannels(){
  return (dispatch, getState) => {
    let teams = getState().mattermost.teams;
    teams.forEach( team => {
      getUserChannels(getState().mattermost.mattermostToken,getState().mattermost.mattermostId, team.id).then(response =>{
        let channels = getState().mattermost.channels;
        channels = channels.concat(response.data);
        dispatch(mattermostActions.setChannels(channels));
        dispatch(getUnread(response.data));
      })
    })
  }
}

function getUnread(channels){
  return (dispatch, getState) => {
    channels.forEach( channel => {
      if(channel.team_id!== '') fetchUnread(getState().mattermost.mattermostToken,getState().mattermost.mattermostId,channel.id).then((response) => {
        let num = response.data.msg_count;
        if(num > 0) getChannelData(getState().mattermost.mattermostToken,response.data.channel_id).then( response =>{
          console.log(response);
          let element = {
            channel: response.data.name,
            num: num
          }
          let mess = getState().mattermost.messages;
          mess = mess.concat(element);
          dispatch(mattermostActions.setMessages(mess));
        })
        dispatch(mattermostActions.increaseCounter(getState().mattermost.counter + response.data.msg_count));
      })
      .catch(e => {
        dispatch(appActions.sendNotification({message:e, severity:'error'}));
      })
    });
  }
}
