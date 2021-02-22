import { sonarTypes } from "../../constants/action-types";

export const sonarActions = {
    succLogin: data => ({
        type: sonarTypes.SUCCESSFUL_LOGIN,
        payload: data
    }),

    setToken: data => ({
        type: sonarTypes.SET_TOKEN,
        payload: data
    }),

    askLogout: () => ({
        type: sonarTypes.LOGOUT
    }),

    setProjects: data => ({
        type: sonarTypes.SET_PROJECTS,
        payload: data
    }),

    setGate: data => ({
        type: sonarTypes.SET_GATE,
        payload: data
    }),

    setMeasure: data => ({
        type: sonarTypes.SET_MEASURE,
        payload: data
    })

}
