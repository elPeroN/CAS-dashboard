import { taigaTypes, taigaKeys } from "../constants/taiga-types";

const initialState = ({
    taigaToken: localStorage.getItem(taigaKeys.TOKEN) ?
        localStorage.getItem(taigaKeys.TOKEN) : null,
    taigaId: localStorage.getItem(taigaKeys.ID) ?
        localStorage.getItem(taigaKeys.ID) : null,
    taigaView: "recap"
})

export const taigaReducer = (state = initialState, action) => {
    switch(action.type) {

        case taigaTypes.LOGIN:
            return {
                ...state,
                taigaToken: action.payload
            }

        case taigaTypes.PROJECTS_STATS_RECEIVED:
            return {
                ...state,
                taigaProjects: action.payload
            }

        case taigaTypes.USER_ID_RECEIVED:
            return {
                ...state,
                taigaUserId: action.payload
            }

        case taigaTypes.USER_STATS_RECEIVED:
            return {
                ...state,
                taigaUserStats: action.payload
            }
        default: return state;
    }
}
