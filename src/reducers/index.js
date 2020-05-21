import { combineReducers } from "redux";
import collapseReducer from "./collapseReducer";

const rootReducer = combineReducers({
  collapsed: collapseReducer,
});

export default rootReducer;
