import { config } from "./config";
import axios from 'axios';
/*
 * NB: ONLY FOR TESTING WE USE AMINSEP SERVER
*/
//export const aminsep = "http://aminsep.disi.unibo.it/"

const PROJECTS = config.API.TAIGA_PROJECTS
const TASKS = config.API.TAIGA_TASKS
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
    const route = `${config.URL}:${config.TAIGA_PORT_NUMBER}/${config.API.TAIGA_TOKEN}`
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
    let route = `${config.URL}:${config.TAIGA_PORT_NUMBER}/${USERS}/${id}/stats`

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
    let route = `${config.URL}:${config.TAIGA_PORT_NUMBER}/${PROJECTS}?member=${id}`

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
    let route = `${config.URL}:${config.TAIGA_PORT_NUMBER}/${TASKS}?assigned_to=${id}`

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
    const route = `${config.URL}:${config.TAIGA_PORT_NUMBER}/${STORIES}?assigned_to=${id}`

    return axios({
        type: GET,
        url: route,
        headers: {
            'Content-Type': APPLICATION_JSON,
            'Authorization': BEARER(token)
        }
    })
}
