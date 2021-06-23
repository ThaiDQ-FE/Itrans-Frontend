import { combineReducers } from "redux";
import dealReducer from "./deal.reducer";
import freeTimeReducer from "./freeTime.reducer";
import registerReducre from "./register.reducer";
import roundReducer from "./round.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  freeTime: freeTimeReducer,
  register: registerReducre,
  round: roundReducer,
  deal: dealReducer
});

export default rootReducer;
