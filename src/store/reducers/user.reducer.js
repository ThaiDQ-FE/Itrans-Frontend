import {
  CHECK_LOGIN_SUCCESS,
  GET_LIST_ACCOUNT_NOT_CONFIRM_SUCCESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
} from "../constants/user.const";

const initialState = {
  userDetail: {},
  errors: {},
  checkLogin: false,
  listAccountNotConfirm: [],
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHECK_LOGIN_SUCCESS:
      return { ...state, checkLogin: payload };
    case LOGIN_SUCCESS:
      return { ...state, userDetail: payload };
    case LOGIN_FAILED:
      return { ...state, errors: payload };
    case GET_LIST_ACCOUNT_NOT_CONFIRM_SUCCESS: {
      if (payload === "No Data") {
        return { ...state, listAccountNotConfirm: [] };
      } else {
        return { ...state, listAccountNotConfirm: payload };
      }
    }
    default:
      return state;
  }
};

export default userReducer;
