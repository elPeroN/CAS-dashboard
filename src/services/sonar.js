import axios from 'axios';
import { config } from "./config";

function BASIC(token) {
  return `basic ${btoa(token+':')}`
}
// 1e2291f3c23e3f808cb788829b617e469c6c239f

export function checkToken(values){
    let tokenRoute = `${config.URL}:${config.SONAR_PORT_NUMBER}/api/user_tokens/search`;
    return axios({
        type: 'get',
        url: tokenRoute,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': BASIC(values.token),
                  }
    })
}

/*
    Fetch user projects
    GET api/projects/search_my_projects
*/
export function fetchProjects(token){
  let userRoute = `${config.URL}:${config.SONAR_PORT_NUMBER}/api/projects/search_my_projects`;
    return axios({
        type: 'get',
        url: userRoute,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': BASIC(token),
                  }
    })
}
/*
    Badges
    GET api/project_badges/measure?project=key

    GET api/project_badges/quality_gate?project=key
*/
export function fetchMeasure(values, key) {
  let measureRoute = `${config.URL}:${config.SONAR_PORT_NUMBER}/api/measures/component`;
    return axios({
        type: 'get',
        url: measureRoute,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': BASIC(values),
                  },
        params: {
                  'metricKeys': "sqale_index",
                  'component': key
                 }
    })
}
