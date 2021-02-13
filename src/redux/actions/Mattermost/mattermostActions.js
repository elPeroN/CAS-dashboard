import { mattermostConstants } from "src/redux/constants/action-types";

export const mattermostActions = {
  setMattermostToken : (token,id) =>({
    type: mattermostConstants.SET_MATTERMOST_TOKEN,
    payload: {token:token, id:id}
  }),
  logoutMattermost: () =>({
    type: mattermostConstants.MATTERMOST_LOGOUT
  }),
  fetchChannels: data =>({
    type: mattermostConstants.FETCH_CHANNELS,
    payload: data
  }),
  fetchTeams: data =>({
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
  })
};
