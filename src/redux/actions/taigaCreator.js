import { taigaActions } from "./taiga-actions"
import { fetchToken, fetchUserId, fetchUserStats, fetchUserProjects } from "src/services/taiga"

export const taigaCreator = {
    login,
    getUserId,
    getUserStats,
    getUserProjects
}

function login(args){
    return dispatch => fetchToken(args.username, args.password).then( res => {
        localStorage.setItem('Taiga_Token', res.data.token);
        dispatch(taigaActions.login(res.data))
    })
}

function getUserId(token){
    return dispatch => fetchUserId(token).then( res => {
        localStorage.setItem('Taiga_ID', res.id)
    })
}
/*
    TODO chiedere a stefano perchè usa return (dispatch, getState)
    anziche return dispatch
*/
function getUserStats(id, token){
    return dispatch => fetchUserStats(id, token).then( res => {
        dispatch(taigaActions.userStatsReceived(res))
    })
}

function getUserProjects(id, token){
    return dispatch => fetchUserProjects(id, token).then( res => {
        dispatch(taigaActions.projectsStatsReceived(res))
    })
}
