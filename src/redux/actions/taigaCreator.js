import { taigaActions } from "./taiga-actions"
import { appActions } from "src/redux/actions/App/appActions"
import { fetchToken, fetchUserId, fetchUserStats, fetchUserProjects } from "src/services/taiga"

export const taigaCreator = {
    login,
    getUserId,
    getUserStats,
    getUserProjects
}

function login(args){
    return dispatch => fetchToken(args.username, args.password).then( res => {
        console.log(res)
	localStorage.setItem('Taiga_Token', res.data.token);
	dispatch(appActions.sendNotification({message:'Logged in!', severity:'info'}))
        dispatch(taigaActions.tokenReceived(res.data))
    })
    .catch( error => {
    	dispatch(appActions.sendNotification({message:error.toString(), severity:'error'}))
    });
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
