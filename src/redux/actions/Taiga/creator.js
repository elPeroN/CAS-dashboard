import { taiga } from "./actions"
import { appActions } from "src/redux/actions/App/appActions"

import { fetchToken,
        fetchUserProjects,
        fetchUserStories,
        fetchUserTasks, aminsep } from "src/services/taiga"

export const taigaCreator = {
    login,
    logout,
    getProjects,
    getUserUStories
}

function login(args){
    return dispatch => fetchToken(args.username, args.password)
        .then( res => {

            let payload = {
                auth_token:    res.data.auth_token,
                id:            res.data.id,
                roles:         res.data.roles,
                username:      res.data.username
            }
            dispatch(taiga.succLogin(payload))
            dispatch(appActions.sendNotification({message:'Logged in!', severity:'info'}))
            dispatch(getProjects())
            //dispatch(checkstate())
        })
        .catch( err => {
            console.error(err)
        })
}

function checkstate() {
    return (dispatch, getState) => {
        console.log(getState().taiga)
    }
}

function getProjects() {
    return (dispatch, getState) => {
        const id = getState().taiga.id
        const token = getState().taiga.token
        // console.log(id,token)
        fetchUserProjects(id, token)

            .then( res => {
                let projects = []
                res.data.map( proj => {
                console.debug(proj)
                    let x = {
                        name: proj.name,
                        id: proj.id,
                        description: proj.description,
                        members: proj.members,
                        is_private: proj.is_private,
                        address: `${aminsep}project/${proj.slug}`
                    }
                    projects.push(x)

                })
                dispatch(taiga.setProjects(projects))
                dispatch(getUserUStories())
            })

            .catch( err => console.error(err))
    }
}

function logout() {
    return dispatch => {
        localStorage.removeItem('taigaId')
        localStorage.removeItem('taigaToken')
    }
}

/*
proj_id,
subject,
is_closed,
user_story,
user_story_extra_info: {
	subject,
	id,
}
finished_date , (range di data, seleziono un intervallo in cui mostrare le US terminate da me)
milestone_slug,
*/

function getUserUStories() {
    return (dispatch, getState) => {
        const id = getState().taiga.id
        const token = getState().taiga.token
        const projects = getState().taiga.projects
        let stories = []

        fetchUserTasks(id,token,null)

            .then( res => {
                if (res.data.length > 0) {

                    res.data.map( s => {
                        let x = {
                            subject: s.subject,
                            finished_date: s.finished_date,
                            is_closed: s.is_closed,
                            milestone: s.milestone_slug,
                            belongs_to: s.user_story_extra_info ?
                                s.user_story_extra_info.subject : null
                        }
                        stories.push(x)
                    })

                    // dispatch(checkstate())
                }
            })
            .then( () => {
                fetchUserStories(id, token, null)
                    .then( res => {
                        // console.debug(res.data)
                        if (res.data.length > 0) {
                            res.data.map( s => {
                                let x = {
                                    subject: s.subject,
                                    finished_date: s.finished_date,
                                    is_closed: s.is_closed,
                                    milestone: s.milestone_slug,
                                    belongs_to: s.user_story_extra_info ?
                                        s.user_story_extra_info.subject : null
                                }
                                stories.push(x)

                            })
                            dispatch(taiga.setStories(stories))
                            // console.log(stories)
                        }
                    })
                    .catch( err => console.error(err))
            })

            .catch( err => console.error(err))
    }
}
