import { config } from "./config";
import axios from 'axios';

const loginRoute = `${config.URL}:${config.PORT_NUMBER}/${config.API.LOGIN}`;
const registerRoute = `${config.URL}:${config.PORT_NUMBER}/${config.API.REGISTER}`;

export function loginUser(email,password){
  console.log(loginRoute);
  return axios.post(loginRoute,
    {email, password}
  );
}

export function registerUser(name, surname , email, password){
  return axios.post(registerRoute,
    { email, name, surname, password }
  );
}
