import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk"
import { createRootReducer } from "src/redux/reducers/reducers";
import { startApp } from "./utils.js";

const store = createStore(
  createRootReducer(),
  applyMiddleware(thunk)
);

startApp(store);

export default store;
