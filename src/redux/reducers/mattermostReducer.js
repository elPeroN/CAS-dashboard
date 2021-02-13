import { mattermostConstants } from "../constants/action-types";

const initialState = ({
  mattermostToken: localStorage.getItem('mattermostToken') ? localStorage.getItem('mattermostToken') : null,
  mattermostId: localStorage.getItem('mattermostId') ? localStorage.getItem('mattermostId') : null,
  channels: null,
  teams: null
});

export const mattermostReducer = (state = initialState, action) => {
  switch(action.type) {
    case mattermostConstants.SET_MATTERMOST_TOKEN:
      return {
        ...state,
        mattermostToken: action.payload.token,
        mattermostId: action.payload.id
      };
    case mattermostConstants.MATTERMOST_LOGOUT:
      return {
        ...state,
        mattermostToken: null,
        mattermostId: null
      };
    case mattermostConstants.FETCH_CHANNELS:
      return {
        ...state,
        channels: action.payload
      };
    case mattermostConstants.FETCH_TEAMS:
      return {
        ...state,
        teams: action.payload,
        mattermostMenuIndex: 0
      }
    case mattermostConstants.SET_MATTERMOST_MENU_INDEX:
      return {
       ...state,
       mattermostMenuIndex: action.payload
     }
     case mattermostConstants.SET_TEAM_ID:
      return {
        ...state,
        mattermostTeamId:action.payload
      }
    default: return state;
  }
};
