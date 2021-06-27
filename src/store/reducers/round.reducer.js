import {
  GET_LIST_ROUND_ACTIVE_BY_ID_ORGANIZATION_FAILED,
  GET_LIST_ROUND_ACTIVE_BY_ID_ORGANIZATION_SUCCESS,
  GET_LIST_ROUND_PASS_BY_ID_ORGANIZATION_FAILED,
  GET_LIST_ROUND_PASS_BY_ID_ORGANIZATION_SUCCESS,
} from "../constants/round.const";

const initialState = {
  listRoundActive: [],
  listRoundPass: [],
  errors: [],
};

const roundReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_LIST_ROUND_ACTIVE_BY_ID_ORGANIZATION_SUCCESS:
      return { ...state, listRoundActive: payload };
    case GET_LIST_ROUND_ACTIVE_BY_ID_ORGANIZATION_FAILED:
      return { ...state, errors: payload };
    case GET_LIST_ROUND_PASS_BY_ID_ORGANIZATION_SUCCESS:
      return {...state, listRoundPass: payload}
    case GET_LIST_ROUND_PASS_BY_ID_ORGANIZATION_FAILED:
      return {...state, errors: payload}
    default:
      return state;
  }
};

export default roundReducer;
