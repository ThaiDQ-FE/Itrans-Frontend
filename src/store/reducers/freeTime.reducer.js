import {
  GET_FREE_TIME_LIST_FAILED,
  GET_FREE_TIME_LIST_SUCCESS,
} from "../constants/freeTime.const";

const initialState = {
  listFreeTime: [],
  errors: [],
};

const freeTimeReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_FREE_TIME_LIST_SUCCESS:
      return { ...state, listFreeTime: payload };
    case GET_FREE_TIME_LIST_FAILED:
      return { ...state, errors: payload };
    default:
      return state;
  }
};

export default freeTimeReducer;
