import { taiga } from "./actions";
import { appActions } from "src/redux/actions/App/appActions";
import { config } from "src/services/config";
import {
  fetchToken,
  fetchUserProjects,
  fetchUserStories,
  fetchUserTasks} from "src/services/taiga";

export const taigaCreator = {
  login,
  logout,
  getProjects,
  getUserUStories,
  refresh
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
            localStorage.setItem('taigaToken', res.data.auth_token);
            localStorage.setItem('taigaId', res.data.id);
            localStorage.setItem('taigaRoles', res.data.roles);
            localStorage.setItem('taigaUsername', res.data.username);
            dispatch(taiga.succLogin(payload));
            dispatch(appActions.sendNotification({message:'Logged in!', severity:'success'}));
            dispatch(getProjects());
        })
        .catch( err => {
          dispatch(appActions.sendNotification({message:'Something goes wrong, try again', severity:'error'}));
        })
}

function getProjects() {
    return (dispatch, getState) => {
        const id = getState().taiga.id
        const token = getState().taiga.token
        fetchUserProjects(id, token).then( res => {
                let projects = []
                res.data.forEach( proj => {
                console.debug(proj)
                    let x = {
                        name: proj.name,
                        id: proj.id,
                        description: proj.description,
                        members: proj.members,
                        is_private: proj.is_private,
                        address: `${config.URL}/project/${proj.slug}`
                    }
                    projects.push(x)

                })
                dispatch(taiga.setProjects(projects))
                dispatch(getUserUStories())
            })
            .catch( err => {
              dispatch(logout());
            })
    }
}

function logout() {
  localStorage.removeItem('taigaId');
  localStorage.removeItem('taigaToken');
  localStorage.removeItem('taigaRoles');
  localStorage.removeItem('taigaUsername');
    return dispatch => {
      dispatch(taiga.askLogout());
    }
}

function refresh(){
  return dispatch => {
    dispatch(taiga.clean());
    dispatch(getProjects());
  }
}

function getUserUStories() {
    return (dispatch, getState) => {
        const id = getState().taiga.id
        const token = getState().taiga.token
        let stories = []

        fetchUserTasks(id,token,null)

            .then( res => {
                if (res.data.length > 0) {

                    res.data.forEach( s => {
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
                }
            })
            .then( () => {
                fetchUserStories(id, token, null)
                    .then( res => {
                        if (res.data.length > 0) {
                            res.data.forEach( s => {
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
                            dispatch(taiga.setStories(stories));
                        }
                    })
                    .catch( err => console.error(err))
            })

            .catch( err => console.error(err))
    }
}
