import {
  GET_ALL_LIST_ROUND_ACCTIVE_FAILED,
  GET_ALL_LIST_ROUND_ACTIVE_SUCCESS,
  GET_LIST_ROUND_ACTIVE_BY_ID_ORGANIZATION_FAILED,
  GET_LIST_ROUND_ACTIVE_BY_ID_ORGANIZATION_SUCCESS,
  GET_LIST_ROUND_PASS_BY_ID_ORGANIZATION_FAILED,
  GET_LIST_ROUND_PASS_BY_ID_ORGANIZATION_SUCCESS,
  GET_LIST_ROUND_PENDING_BY_ID_ORGANIZATION_FAILED,
  GET_LIST_ROUND_PENDING_BY_ID_ORGANIZATION_SUCCESS,
} from "../constants/round.const";

const initialState = {
  listRoundActive: [],
  listRoundPending: [],
  listRoundPass: [],
  listAllRoundActive: [],
  errors: [],
};

const roundReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_LIST_ROUND_ACTIVE_BY_ID_ORGANIZATION_SUCCESS:
      return { ...state, listRoundActive: payload };
    case GET_LIST_ROUND_ACTIVE_BY_ID_ORGANIZATION_FAILED:
      return { ...state, errors: payload };
    case GET_LIST_ROUND_PENDING_BY_ID_ORGANIZATION_SUCCESS:
      return { ...state, listRoundPending: payload };
    case GET_LIST_ROUND_PENDING_BY_ID_ORGANIZATION_FAILED:
      return { ...state, errors: payload };
    case GET_LIST_ROUND_PASS_BY_ID_ORGANIZATION_SUCCESS:
      return { ...state, listRoundPass: payload };
    case GET_LIST_ROUND_PASS_BY_ID_ORGANIZATION_FAILED:
      return { ...state, errors: payload };
    case GET_ALL_LIST_ROUND_ACTIVE_SUCCESS:
      return { ...state, listAllRoundActive: payload };
    case GET_ALL_LIST_ROUND_ACCTIVE_FAILED:
      return { ...state, errors: payload };
    default:
      return state;
  }
};

export default roundReducer;
