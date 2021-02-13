import {loggerCreator} from '../actions/Logger/loggerCreator';
import {gitlabCreator} from '../actions/Gitlab/gitlabCreator';
import {mattermostCreator} from '../actions/Mattermost/mattermostCreator';

export function startApp(store){
  store.dispatch(loggerCreator.loggedFlow(store.getState().logger.token));
  if(store.getState().gitlab.gitlabToken) store.dispatch(gitlabCreator.gitlabFlow(store.getState().gitlab.gitlabToken));
  if(store.getState().mattermost.mattermostToken) store.dispatch(mattermostCreator.fetchMattermost(store.getState().mattermost.mattermostToken));
};
