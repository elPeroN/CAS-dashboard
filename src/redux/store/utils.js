import {loggerCreator} from '../actions/Logger/loggerCreator';
import {taigaCreator} from '../actions/Taiga/creator';
import {gitlabCreator} from '../actions/Gitlab/gitlabCreator';
import {mattermostCreator} from '../actions/Mattermost/mattermostCreator';

export function startApp(store){
  store.dispatch(loggerCreator.loggedFlow(store.getState().logger.token));
  if(store.getState().gitlab.gitlabToken) store.dispatch(gitlabCreator.gitlabFlow(store.getState().gitlab.gitlabToken));
  //if(store.getState().taiga.taigaToken) store.dispatch(taigaCreator.taigaFlow(store.getState().taiga.taigaId, store.getState().taiga.taigaToken));
};
