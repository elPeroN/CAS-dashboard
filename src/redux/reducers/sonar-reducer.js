import { sonarTypes } from "../constants/action-types"

const TOKEN_STRING = 'sonarToken'

const initialState = ({
    token: localStorage.getItem(TOKEN_STRING) ?
        localStorage.getItem(TOKEN_STRING) : null,
    username: null,
    projects: null,
    roles: null
})

export const sonarReducer = (state = initialState, action) => {
    switch(action.type){

        case(sonarTypes.SET_TOKEN):
            return {
                ...state,
                token: action.payload
            }

        case(sonarTypes.SUCCESSFUL_LOGIN):
            return {
                ...state,
                username: action.payload.username,
                roles: action.payload.roles
            }

        case(sonarTypes.SET_PROJECTS):
            return {
                ...state,
                projects: action.payload
            }

        default: return state;
    }
}
