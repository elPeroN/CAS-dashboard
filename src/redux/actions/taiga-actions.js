import { taigaTypes } from "../constants/taiga-types";

export const taigaActions = {
    login: data => ({
        type: taigaTypes.LOGIN,
        payload: data
    }),

    tokenReceived: data => ({
        type: taigaTypes.TOKEN_RECEIVED,
        payload: data
    }),

    tokenExpired: data => ({
        type: taigaTypes.TOKEN_EXPIRED,
        payload: data
    }),

    userIdReceived: data => ({
        type: taigaTypes.USER_ID_RECEIVED,
        payload: data
    }),

    userStatsReceived: data => ({
        type: taigaTypes.USER_STATS_RECEIVED,
        payload: data
    }),

    projectsStatsReceived: data => ({
        type: taigaTypes.PROJECTS_STATS_RECEIVED,
        payload: data
    })
}
