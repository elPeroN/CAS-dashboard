import { config } from "./config";
import axios from 'axios';

const usersRoute = `${config.URL}/mattermost/${config.API.MATTERMOST_USERS}`;
const channelsRoute = `${config.URL}/mattermost/${config.API.MATTERMOST_CHANNELS}`;

export function loginUser(values){
  const route = usersRoute+'/login';
  return axios.post(
    route,
    {
      "login_id": values.login_id,
      "password": values.password
    }
  )
}

export function fetchTeams(token, userId){
  const route = usersRoute+"/"+userId+'/teams';
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
  const route = usersRoute+"/"+userId+'/teams/'+teamId+'/channels';
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
  const route = channelsRoute+"/"+channelId;
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
  const route = usersRoute+"/"+userId+'/channels/'+channelId+'/unread';
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
  const threadsRoute= usersRoute+"/"+userId+"/threads";
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
  return axios.get(
      threadsRoute,
      {headers}
  )
}
