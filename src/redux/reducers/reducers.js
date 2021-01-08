import { combineReducers } from "redux";
import { appReducer } from './appReducer';
import { loggerReducer } from './loggerReducer';
import { gitlabReducer } from './gitlabReducer';

export const createRootReducer = () =>
  combineReducers({
    app: appReducer,
    logger: loggerReducer,
    gitlab: gitlabReducer
  });
