import { combineReducers } from "redux";
import freeTimeReducer from "./freeTime.reducer";
import registerReducre from "./register.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  freeTime: freeTimeReducer,
  register:registerReducre
});

export default rootReducer;
