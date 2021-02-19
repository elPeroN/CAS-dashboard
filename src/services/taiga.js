import { config } from "./config";
import axios from 'axios';

/*
 * NB: ONLY FOR TESTING WE USE AMINSEP SERVER
*/
const aminsep = "http://aminsep.disi.unibo.it/"
const taigaRoute = `${config.URL}:${config.TAIGA_PORT_NUMBER}/`
const PROJECTS = config.API.TAIGA_PROJECTS
const TASKS = 'api/v1/tasks'
const USERS = config.API.TAIGA_USERS
const STORIES = config.API.TAIGA_U_STORIES
const GET = config.REQ_TYPES.GET
const POST = config.REQ_TYPES.POST
const APPLICATION_JSON = config.CONTENT_TYPES.APPLICATION_JSON

function BEARER(token) {
  return `Bearer ${token}`
}

/*
    Reference: https://taigaio.github.io/taiga-doc/dist/api.html
*/

// POST request to API in order to login and receive the user token
export function fetchToken(usr, psw){
    const route = `${aminsep}${config.API.TAIGA_TOKEN}`
    const credentials = {
        username: usr,
        password: psw,
        type: 'normal'
    }

    return axios({
        method: POST,
        url: route,
        data: credentials
    });
}

export function fetchUserStats(id, token){
    let route = `${aminsep}${USERS}/${id}/stats`

    return axios({
        type: GET,
        url: route,
        headers: {
            'Content-Type': APPLICATION_JSON,
            'Authorization': BEARER(token)
        }
    })
}

export function fetchUserProjects(id, token){
    let route = `${aminsep}${PROJECTS}?member=${id}`

    return axios({
        type: GET,
        url: route,
        headers: {
            'Content-Type': APPLICATION_JSON,
            'Authorization': BEARER(token)
        }
    })
}

export function fetchUserTasks(id, token, project){
    let route = `${aminsep}${TASKS}?assigned_to=${id}`

    return axios({
        type: GET,
        url: route,
        headers: {
            'Content-Type': APPLICATION_JSON,
            'Authorization': BEARER(token)
        }
    })
}

export function fetchUserStories(id, token, project){
    const route = `${aminsep}${STORIES}?assigned_to=${id}`

    return axios({
        type: GET,
        url: route,
        headers: {
            'Content-Type': APPLICATION_JSON,
            'Authorization': BEARER(token)
        }
    })
}
