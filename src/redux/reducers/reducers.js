import { combineReducers } from "redux";
import { appReducer } from './appReducer';
import { loggerReducer } from './loggerReducer';
import { gitlabReducer } from './gitlabReducer';
import { mattermostReducer } from './mattermostReducer';
import { taigaReducer } from './taiga-reducer';
import { sonarReducer } from './sonar-reducer'

export const createRootReducer = () =>
  combineReducers({
    app: appReducer,
    logger: loggerReducer,
    gitlab: gitlabReducer,
    mattermost: mattermostReducer,
    taiga: taigaReducer,
    sonar: sonarReducer
  });
