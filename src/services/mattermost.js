import { config } from "./config";
import axios from 'axios';

const loginRoute = `${config.URL}:${config.MATTERMOST_PORT_NUMBER}/${config.API.MATTERMOST_LOGIN}`
const teamsRoute = 'http://localhost:1080/api/v4/teams';
const channelsRoute = 'http://localhost:1080/api/v4/channels';

export function loginUser(values){
  return axios.post(
    loginRoute,
    {
      "login_id": values.login_id,
      "password": values.password
    }
  )
}

export function fetchTeams(token, userId){
  const route = 'http://localhost:1080/api/v4/users/'+userId+'/teams';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
  return axios.get(
      route,
      {headers}
  )
}

export function getUserChannels(token, userId, teamId){
  const route = 'http://localhost:1080/api/v4/users/'+userId+'/teams/'+teamId+'/channels';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
  return axios.get(
      route,
      {headers}
  )
}

export function getChannelData(token, channelId){
  const route = 'http://localhost:1080/api/v4/channels/'+channelId;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
  return axios.get(
      route,
      {headers}
  )
}

export function fetchUnread(token, userId, channelId){
  const route = 'http://localhost:1080/api/v4/users/'+userId+'/channels/'+channelId+'/unread';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
  return axios.get(
      route,
      {headers}
  )
}

export function fetchThreads(token, userId, teamId){
  const threadsRoute= "http://localhost:1080/api/v4/users/"+userId+"/threads";
  console.log(threadsRoute);
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
  return axios.get(
      threadsRoute,
      {headers}
  )
}
