import {loggerCreator} from '../actions/Logger/loggerCreator';
import {taigaCreator} from '../actions/Taiga/creator';
import {taiga} from '../actions/Taiga/actions';
import {gitlabCreator} from '../actions/Gitlab/gitlabCreator';
import {sonarCreator} from '../actions/Sonar/creator';
import {mattermostCreator} from '../actions/Mattermost/mattermostCreator';

export function startApp(store){
  let user = store.getState().logger.loggerToken;
  if(user){
    store.dispatch(loggerCreator.loggedFlow(user));
    if(store.getState().gitlab.gitlabToken)
      store.dispatch(gitlabCreator.gitlabFlow());
    if(store.getState().taiga.taigaToken) {
      let payload = {
          auth_token:    store.getState().taiga.taigaToken,
          id:            store.getState().taiga.id,
          roles:         store.getState().taiga.roles,
          username:      store.getState().taiga.user
      }
      store.dispatch(taiga.succLogin(payload));
      store.dispatch(taigaCreator.getProjects());
    }
    if(store.getState().sonar.sonarToken)
      store.dispatch(sonarCreator.getProjects());

    if(store.getState().mattermost.mattermostToken)
      store.dispatch(mattermostCreator.mattermostFlow());
  }
}
