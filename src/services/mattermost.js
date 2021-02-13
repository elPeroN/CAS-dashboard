import { config } from "./config";
import axios from 'axios';

const loginRoute = `${config.URL}:${config.MATTERMOST_PORT_NUMBER}/${config.API.MATTERMOST_LOGIN}`
//const channelsRoute = 'http://localhost:1080/api/v4/channels';
const teamsRoute = 'http://localhost:1080/api/v4/teams';

export function loginUser(values){
  return axios.post(
    loginRoute,
    {
      "login_id": values.login_id,
      "password": values.password
    }
  )
}

export function fetchTeams(token){
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
  return axios.get(
      teamsRoute,
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
