import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk" //lets you write async logic that interacts with the store.
import { createRootReducer } from "src/redux/reducers/reducers";
import { startApp } from "./utils.js";

const store = createStore(
  createRootReducer(),
  applyMiddleware(thunk)
);

startApp(store);

export default store;
