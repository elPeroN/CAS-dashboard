import { gitlabConstants } from "../constants/action-types";

const initialState = ({
  gitlabToken: localStorage.getItem('gitlabToken') ? localStorage.getItem('gitlabToken') : null,
  gitlabView : "recap"
});

export const gitlabReducer = (state = initialState, action) => {
  switch(action.type) {
    case gitlabConstants.SET_GITLAB_TOKEN:
      return {
        ...state,
        gitlabToken: action.payload
    }
    case gitlabConstants.GITLAB_REPORT:
      return {
        ...state,
        gitlabRepos: action.payload,
        gitlabMenuIndex: 0
      }
    case gitlabConstants.SET_GITLAB_MENU_INDEX:
     return {
       ...state,
       gitlabMenuIndex: action.payload
     }
    case gitlabConstants.SET_REPOSITORY_INDEX:
      return {
        ...state,
        repositoryIndex: action.payload
      }
    case gitlabConstants.SET_GITLAB_VIEW:
      return {
        ...state,
        gitlabView: action.payload
      }
    case gitlabConstants.DEVEL_STATS:
      return {
        ...state,
        develStats: action.payload
      }
    default: return state;
  }
};
