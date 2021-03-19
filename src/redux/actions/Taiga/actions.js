import { taigaTypes } from "../../constants/action-types";

export const taiga = {
    succLogin: data => ({
        type: taigaTypes.TAIGA_LOGIN,
        payload: data
    }),

    askLogout: () => ({
        type: taigaTypes.TAIGA_LOGOUT
    }),
    clean: () =>({
        type: taigaTypes.TAIGA_CLEAN
    }),
    setProjects: data => ({
        type: taigaTypes.TAIGA_SET_PROJECTS,
        payload: data
    }),
    setStories: data => ({
        type: taigaTypes.SET_STORIES,
        payload: data
    })

}
