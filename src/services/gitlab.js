import { config } from "./config";
import axios from 'axios';

const gitlabTokenRoute = `${config.URL}:${config.GITLAB_PORT_NUMBER}/${config.API.GITLAB_TOKEN}`
const gitlabProjectsRoute = `${config.URL}:${config.GITLAB_PORT_NUMBER}/${config.API.GITLAB_PROJECTS}`

export function checkToken(token){
  return axios({url: gitlabTokenRoute, headers :{"PRIVATE-TOKEN":token}});
}

export function fetchGitlabRepositories(token, route){
  if(!route) route = gitlabProjectsRoute;
  return axios({type: "post", url: route, headers :{"PRIVATE-TOKEN":token}, params:{membership:true, statistics:true} //with_stats:true, per_page:10000}
  });
}

export function fetchGitlabCommits(token, index){
  let route = gitlabProjectsRoute+"/"+index+"/repository/commits";
  return axios({type: "post", url: route, headers :{"PRIVATE-TOKEN":token}, params:{with_stats:true, per_page:10000}
  });
}
