import { config } from "./config";
import axios from 'axios';

const gitlabTokenRoute = `${config.URL}:${config.GITLAB_PORT_NUMBER}/${config.API.GITLAB_TOKEN}`;
const gitlabRoute = 'http://localhost:8929/api/v4/projects';



export function checkToken(token){
  return axios({url: gitlabTokenRoute, headers :{"PRIVATE-TOKEN":token}});
}
//vX27GoVyf61XsXstmoRU
export function fetchGitlab(dio){
  let token = null;
  return axios.get(gitlabRoute, {"PRIVATE-TOKEN":dio})
}
//curl --header "PRIVATE-TOKEN: iD6Eyj923CBpuSY7f9rL" "http://localhost:8929/api/v4/projects"

//curl "https://gitlab.com/api/v4/projects"

//curl --header "PRIVATE-TOKEN: iD6Eyj923CBpuSY7f9rL" "http://localhost:8929/api/v4/personal_access_tokens"
