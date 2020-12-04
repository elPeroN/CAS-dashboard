import { userConstants } from "../constants/action-types";

export const userActions = {
  login,
  logout
};

function login(){
  return {type: userConstants.LOGIN}
}

function logout(){
  return {type: userConstants.LOGOUT}
}
