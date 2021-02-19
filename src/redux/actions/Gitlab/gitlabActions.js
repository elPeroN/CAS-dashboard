import { gitlabConstants } from "src/redux/constants/action-types";

export const gitlabActions = {
  setGitlabToken : data =>({
    type: gitlabConstants.SET_GITLAB_TOKEN,
    payload:data
  }),
  gitlabReport: data => ({
    type:gitlabConstants.GITLAB_REPORT,
    payload:data
  }),
  setGitlabMenuIndex: data =>({
    type:gitlabConstants.SET_GITLAB_MENU_INDEX,
    payload:data
  }),
  setRepositoryIndex: data =>({
    type:gitlabConstants.SET_REPOSITORY_INDEX,
    payload:data
  }),
  setGitlabView: data =>({
    type:gitlabConstants.SET_GITLAB_VIEW,
    payload:data
  }),
  develStats: data =>({
    type:gitlabConstants.DEVEL_STATS,
    payload:data
  })
};
