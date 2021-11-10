import { taigaTypes } from "../constants/action-types";

const TOKEN_STRING = 'taigaToken';
const ID_STRING = 'taigaId';
const USER_STRING = 'taigaUsername';
const ROLES_STRING = 'taigaRoles';

const initialState = ({
    taigaToken: localStorage.getItem(TOKEN_STRING) ? localStorage.getItem(TOKEN_STRING) : null,
    id: localStorage.getItem(ID_STRING) ? localStorage.getItem(ID_STRING) : null,
    roles: localStorage.getItem(ROLES_STRING) ? localStorage.getItem(ROLES_STRING) : null,
    user: localStorage.getItem(USER_STRING) ? localStorage.getItem(USER_STRING) : null,
    projects: null,
    stories: null


})

export const taigaReducer = (state = initialState, action) => {
    switch(action.type) {

        case(taigaTypes.TAIGA_LOGIN):
          return {
            ...state,
            taigaToken: action.payload.auth_token,
            id: action.payload.id,
            roles: action.payload.roles,
            user: action.payload.username
          }
        case(taigaTypes.TAIGA_LOGOUT) :
          return {
            ...state,
            taigaToken: null,
            id: null,
            roles: null,
            user: null
          }
        case(taigaTypes.TAIGA_CLEAN):
          return {
            ...state,
            projects:null,
            stories:null
          }
        case(taigaTypes.TAIGA_SET_PROJECTS):
          return{
            ...state,
            projects: action.payload
          }
        case(taigaTypes.SET_STORIES):
          return {
            ...state,
            stories: action.payload
          }
        default: return state;
    }
}
