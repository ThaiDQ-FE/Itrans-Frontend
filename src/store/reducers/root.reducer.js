import { combineReducers } from "redux";
import dealReducer from "./deal.reducer";
import freeTimeReducer from "./freeTime.reducer";
import registerReducre from "./register.reducer";
import roundReducer from "./round.reducer";
import userReducer from "./user.reducer";
import loadingReducer from "./loading.reducer";
import organizationReducer from "./organization.reducer";
const rootReducer = combineReducers({
  user: userReducer,
  freeTime: freeTimeReducer,
  register: registerReducre,
  round: roundReducer,
  deal: dealReducer,
  loading: loadingReducer,
  organization: organizationReducer,
});

export default rootReducer;
