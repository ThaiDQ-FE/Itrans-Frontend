import {
  GET_LIST_INTRODUCE_FAILED,
  GET_LIST_INTRODUCE_SUCCESS,
} from "../constants/introduce.const";

const initialState = {
  listIntroduce: [],
  errors: [],
};

const introduceReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_LIST_INTRODUCE_SUCCESS:
      return { ...state, listIntroduce: payload };
    case GET_LIST_INTRODUCE_FAILED:
      return { ...state, errors: payload };

    default:
      return state;
  }
};

export default introduceReducer;
