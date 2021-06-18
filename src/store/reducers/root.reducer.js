import { combineReducers } from "redux";
import freeTimeReducer from "./freeTime.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  freeTime: freeTimeReducer,
});

export default rootReducer;
