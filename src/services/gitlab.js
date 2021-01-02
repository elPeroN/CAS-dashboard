import { config } from "./config";
import axios from 'axios';

const gitlabTokenRoute = `${config.URL}:${config.GITLAB_PORT_NUMBER}/${config.API.GITLAB_TOKEN}`

export function checkToken(token){
  return axios({url: gitlabTokenRoute, headers :{"PRIVATE-TOKEN":token}});
}

export function fetchGitlab(token, route){
  return axios({url: route, headers :{"PRIVATE-TOKEN":token}});
}
