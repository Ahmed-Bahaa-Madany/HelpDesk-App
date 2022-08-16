import { applyMiddleware } from "redux";
import reducers from "./reducers/combineReducers"
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk"
import { createStore } from 'redux'

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);