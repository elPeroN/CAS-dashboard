import { config } from "./config";
import axios from 'axios';

const loginRoute = `${config.URL}:${config.PORT_NUMBER}/${config.API.LOGIN}`;
const registerRoute = `${config.URL}:${config.PORT_NUMBER}/${config.API.REGISTER}`;
const gitlabRoute = 'http://localhost:8929/api/v4/projects';

export function loginUser(email,password){
  return axios.post(loginRoute,
    {email, password}
  );
}

export function registerUser(name, surname , email, password){
  return axios.post(registerRoute,
    { email, name, surname, password }
  );
}

export function loginGit(){
  let token = "i83oAnvNp95XnmowXryB";
  return axios.get(gitlabRoute, {"PRIVATE-TOKEN":token});
}
