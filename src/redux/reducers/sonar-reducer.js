import { sonarTypes } from "../constants/action-types"

const initialState = ({
    sonarToken: localStorage.getItem('sonarToken') ? localStorage.getItem('sonarToken') : null,
    username: localStorage.getItem('sonarUsername') ? localStorage.getItem('sonarUsername') : null,
    projects: [],
    measure: null,

})

export const sonarReducer = (state = initialState, action) => {
    switch(action.type){
      case(sonarTypes.SONAR_LOGIN):
        return {
          ...state,
          username: action.payload
        }
      case(sonarTypes.SONAR_CLEAN):
        return {
          ...state,
          projects: []
        }
      case(sonarTypes.SET_SONAR_TOKEN):
        return {
            ...state,
            sonarToken: action.payload
        }
      case(sonarTypes.SONAR_SET_PROJECTS):
        return {
            ...state,
            projects: [ ...state.projects , action.payload]
        }
      default: return state;
    }
}
