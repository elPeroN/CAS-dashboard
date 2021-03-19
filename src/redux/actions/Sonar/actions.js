import { sonarTypes } from "../../constants/action-types";

export const sonarActions = {
    succLogin: data => ({
        type: sonarTypes.SONAR_LOGIN,
        payload: data
    }),

    setToken: data => ({
        type: sonarTypes.SET_SONAR_TOKEN,
        payload: data
    }),

    clean: () => ({
        type: sonarTypes.SONAR_CLEAN
    }),

    setProjects: data => ({
        type: sonarTypes.SONAR_SET_PROJECTS,
        payload: data
    })
}
