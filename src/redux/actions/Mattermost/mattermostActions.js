import { mattermostConstants } from "src/redux/constants/action-types";

export const mattermostActions = {
  setMattermostToken : (token,id) =>({
    type: mattermostConstants.SET_MATTERMOST_TOKEN,
    payload: {token:token, id:id}
  }),
  logoutMattermost: () =>({
    type: mattermostConstants.MATTERMOST_LOGOUT
  }),
  setChannels: data =>({
    type: mattermostConstants.SET_CHANNELS,
    payload: data
  }),
  setTeams: data =>({
    type: mattermostConstants.FETCH_TEAMS,
    payload: data
  }),
  setMattermostMenuIndex: data =>({
    type:mattermostConstants.SET_MATTERMOST_MENU_INDEX,
    payload:data
  }),
  setTeamId: data =>({
    type:mattermostConstants.SET_TEAM_ID,
    payload:data
  }),
  increaseCounter: data =>({
    type:mattermostConstants.INCREASE_COUNTER,
    payload:data
  }),
  setMessages: data =>({
    type:mattermostConstants.SET_MESSAGES,
    payload:data
  })
};
