import { config } from "./config";
import axios from 'axios';

const taigaRoute = `${config.URL}:${config.TAIGA_PORT_NUMBER}/`
const PROJECTS = config.API.TAIGA_PROJECTS
const USERS = config.API.TAIGA_USERS
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
    const route = `taigaRoute${config.API.TAIGA_TOKEN}`
    const credentials = {
        username: usr,
        password: psw,
        type: normal
    }

    return axios({
        type: REQ_TYPES.POST,
        url: route,
        data: credentials
    });
}
/*
    curl -X GET \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer ${AUTH_TOKEN}" \
    -s http://localhost:8000/api/v1/users/me
*/
// Lo user ID è necessario per poter poi ottenere le stats dell'utente
function fetchUserId(token){
    let route = `taigaRoute${USERS}/me`

    return axios({
        type: REQ_TYPES.GET,
        url: route,
        headers: {
            'Content-Type': APPLICATION_JSON,
            'Authorization': BEARER(token)
        }
    })
}
/*
    curl -X GET \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer ${AUTH_TOKEN}" \
    -s http://localhost:8000/api/v1/users/6/stats
*/
export function fetchUserStats(id, token){
    let route = `taigaRoute${USERS}/${id}/stats`

    return axios({
        type: GET,
        url: route,
        headers: {
            'Content-Type': APPLICATION_JSON,
            'Authorization': BEARER(token)
        }
    })
}

/*
    curl -X GET \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer ${AUTH_TOKEN}" \
    -s http://localhost:8000/api/v1/projects?member=1
*/
export function fetchUserProjects(id, token){
    let route = `taigaRoute${PROJECTS}?member=${id}`

    return axios({
        type: GET,
        url: route,
        headers: {
            'Content-Type': APPLICATION_JSON,
            'Authorization': BEARER(token)
        }
    })
}
