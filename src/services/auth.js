import { config } from "./config";
import axios from 'axios';

const loginRoute = `${config.URL}/logger/${config.API.LOGIN}`;
const registerRoute = `${config.URL}/logger/${config.API.REGISTER}`;

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
