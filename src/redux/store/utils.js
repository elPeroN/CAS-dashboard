import {loggerActionsCreator} from '../actions/Logger/loggerActionsCreator';
import {gitlabActionsCreator} from '../actions/Gitlab/gitlabActionsCreator';

export function startApp(store){
  store.dispatch(loggerActionsCreator.loggedFlow(store.getState().logger.token));
  if(store.getState().gitlab.gitlabToken) store.dispatch(gitlabActionsCreator.gitlabFlow(store.getState().gitlab.gitlabToken));
};
