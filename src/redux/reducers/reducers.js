import { combineReducers } from "redux";
import { appReducer } from './appReducer';
import { loggerReducer } from './loggerReducer';
import { gitlabReducer } from './gitlabReducer';
import { mattermostReducer } from './mattermostReducer';

export const createRootReducer = () =>
  combineReducers({
    app: appReducer,
    logger: loggerReducer,
    gitlab: gitlabReducer,
    mattermost: mattermostReducer
  });
