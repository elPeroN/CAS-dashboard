import { taigaTypes } from "../constants/action-types";

const TOKEN_STRING = 'taigaToken'
const ID_STRING = 'taigaId'

const initialState = ({
    token: localStorage.getItem(TOKEN_STRING) ?
        localStorage.getItem(TOKEN_STRING) : null,

    id: localStorage.getItem(ID_STRING) ?
        localStorage.getItem(ID_STRING) : null,

    roles: null,
    user: null,
    projects: null,
    stories: null


})

export const taigaReducer = (state = initialState, action) => {
    switch(action.type) {

        case(taigaTypes.SUCCESSFUL_LOGIN):
            return {
                ...state,
                token: action.payload.auth_token,
                id: action.payload.id,
                roles: action.payload.roles,
                user: action.payload.username
            }

        case(taigaTypes.SET_PROJECTS):
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
