import { taigaTypes } from "../../constants/action-types";

export const taiga = {
    setToken: data => ({
        type: taigaTypes.SET_TOKEN,
        payload: data
    }),
    succLogin: data => ({
        type: taigaTypes.SUCCESSFUL_LOGIN,
        payload: data
    }),

    askLogout: () => ({
        type: taigaTypes.LOGOUT
    }),

    setProjects: data => ({
        type: taigaTypes.SET_PROJECTS,
        payload: data
    }),
    setStories: data => ({
        type: taigaTypes.SET_STORIES,
        payload: data
    })

}
