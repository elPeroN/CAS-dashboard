import { sonarActions as sonar } from './actions'
import { appActions } from "src/redux/actions/App/appActions"

import {
        projects, details, measure,
        checkToken,
        fetchProjects,
        fetchGate,
        fetchUserDetails,
        fetchMeasure}  from "src/services/sonar"

export const sonarCreator = {
    login,

}


function login(token) {
    return dispatch => checkToken(token)
        .then( res => {
            dispatch(sonar.setToken(token))
            dispatch(getDetails())
        })
        .catch( err => console.error(err))

}

function checkstate(){
    return (dispatch, getState) => {
        console.debug(getState().sonar)
    }
}

function getDetails() {
    return (dispatch, getState) => {
        const token = getState().sonar.token
        fetchUserDetails(token)
            .then( res => {
                res = details
                let payload = {
                    username: res.login,
                    roles: res.permissions.global,
                }
                dispatch(sonar.succLogin(payload))
                dispatch(appActions.sendNotification({message:'Logged in!', severity:'info'}))
                dispatch(getProjects())
            })
            .catch( err => console.error(err))
    }
}

function getProjects(){
    return (dispatch, getState) => {
        const token = getState().sonar.token
        let projs = [];
        fetchProjects(token)
            .then( res => {
                projects.projects.map( p => {
                    let x = {
                        key: p.key,
                        last_analysis: p.lastAnalysisDate,
                        name: p.name,
                        quality_gate: p.qualityGate,
                        address: `http://aminsep.disi.unibo.it:9000/dashboard?id=${p.key}`
                    }
                    projs.push(x)
                })
                dispatch(sonar.setProjects(projs))
                //dispatch(getMeasureAndGate())
            })
            .catch( err => console.error(err))
    }
}

function getMeasureAndGate(){
    return (dispatch, getState) => {
        const token = getState().sonar.token
        const projects = getState().sonar.projects

        projects.map( P => {
            fetchGate(token)
                .then( res => {

                })
        })

    }
}
