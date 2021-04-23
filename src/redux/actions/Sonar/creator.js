import { sonarActions as sonar } from './actions';
import { appActions } from "src/redux/actions/App/appActions";

import {
  checkToken,
  fetchProjects,
  fetchMeasure}  from "src/services/sonar";

export const sonarCreator = {
    login,
    logout,
    refresh,
    getProjects
}


function login(values) {
    return (dispatch, getState) => checkToken(values)
        .then( res => {
            localStorage.setItem('sonarToken', values.token);
            localStorage.setItem('sonarUsername', res.data.login)
            dispatch(sonar.setToken(values.token));
            dispatch(sonar.succLogin(res.data.login));
            dispatch(appActions.sendNotification({message:'Successfully login', severity:'success'}));
            dispatch(getProjects());
        })
        .catch( err => {
          dispatch(appActions.sendNotification({message:'Wrong token', severity:'error'}));
        })
}

function logout() {
  return dispatch => {
    localStorage.removeItem('sonarToken');
    localStorage.removeItem('sonarUsername');
    dispatch(sonar.setToken(null));
    dispatch(sonar.askLogout());
  }
}

function refresh(){
  return dispatch => {
    dispatch(sonar.clean());
    dispatch(getProjects());
  }
}

function getProjects(){
    return (dispatch, getState) => {
        const token = getState().sonar.sonarToken;
        fetchProjects(token).then( response => {
                response.data.projects.forEach( p => {
                  let proj;
                  fetchMeasure(token,p.key).then( res => {
                    let debt,analysis,qual;

                    if(res.data.component.measures[0]) debt = res.data.component.measures[0].value;
                    else debt = "n/a";

                    if(p.lastAnalysisDate) analysis = p.lastAnalysisDate;
                    else analysis = "Never Analyzed";

                    if(p.qualityGate) qual = p.qualityGate;
                    else qual = "notDef";

                    proj = {
                      key: p.key,
                      last_analysis: analysis,
                      name: p.name,
                      quality_gate: qual,
                      address: `${config.URL}/sonarqube?id=${p.key}`,
                      debt: debt
                    };
                    dispatch(sonar.setProjects(proj));
                  })
                })
            })
            .catch( err => {
              dispatch(logout());
            })
    }
}
