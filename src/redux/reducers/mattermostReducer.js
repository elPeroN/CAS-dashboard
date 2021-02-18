import { mattermostConstants } from "../constants/action-types";

const initialState = ({
  mattermostToken: null,//localStorage.getItem('mattermostToken') ? localStorage.getItem('mattermostToken') : null,
  mattermostId: null,//localStorage.getItem('mattermostId') ? localStorage.getItem('mattermostId') : null,
  channels: [],
  teams: null,
  counter:0,
  messages: []
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
    case mattermostConstants.SET_CHANNELS:
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
    case mattermostConstants.INCREASE_COUNTER:
      return {
        ...state,
        counter:action.payload
      }
    case mattermostConstants.SET_MESSAGES:
      return {
        ...state,
        messages: action.payload
      }
    default: return state;
  }
};
