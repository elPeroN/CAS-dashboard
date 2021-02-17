import { taigaTypes } from "../constants/action-types";

const TOKEN = 'taigaToken'
const ID = 'taigaId'

const initialState = ({
    token: localStorage.getItem(TOKEN) ?
        localStorage.getItem(TOKEN) : null,

    ID: localStorage.getItem(ID) ?
        localStorage.getItem(ID) : null,

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
                ID: action.payload.id,
                roles: action.payload.roles,
                user: action.payload.username
            }

        case(taigaTypes.SET_PROJECTS):
            return{
                ...state,
                projects: action.payload
            }

        case(taigaTypes.SET_USTORIES):
            return {
                ...state,
                stories: action.payload
            }

        default: return state;
    }
}
