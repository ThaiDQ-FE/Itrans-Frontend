import {
  GET_ALL_LIST_ROUND_ACCTIVE_FAILED,
  GET_ALL_LIST_ROUND_ACTIVE_SUCCESS,
  GET_LIST_ALL_ROUND_FAILED,
  GET_LIST_ALL_ROUND_SUCCESS,
  GET_LIST_ROUND_ACTIVE_BY_ID_ORGANIZATION_FAILED,
  GET_LIST_ROUND_ACTIVE_BY_ID_ORGANIZATION_SUCCESS,
  GET_LIST_ROUND_BY_ID_INVESTOR_FAILED,
  GET_LIST_ROUND_BY_ID_INVESTOR_SUCCESS,
  GET_LIST_ROUND_BY_ID_ORGANIZATION_FAILED,
  GET_LIST_ROUND_BY_ID_ORGANIZATION_SUCCESS,
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
  listRoundByIdInvestor: [],
  listRoundByIdOrganization: [],
  listAllRound: [],
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
      if (payload === "No Data") {
        return { ...state, listAllRoundActive: [] };
      } else {
        return { ...state, listAllRoundActive: payload };
      }
    case GET_ALL_LIST_ROUND_ACCTIVE_FAILED:
      return { ...state, errors: payload };
    // ver 2
    case GET_LIST_ROUND_BY_ID_INVESTOR_SUCCESS:
      if (payload === "No Data") {
        return { ...state, listRoundByIdInvestor: [] };
      } else {
        return { ...state, listRoundByIdInvestor: payload };
      }
    case GET_LIST_ROUND_BY_ID_INVESTOR_FAILED:
      return { ...state, errors: payload };
    case GET_LIST_ROUND_BY_ID_ORGANIZATION_SUCCESS:
      if (payload === "No Data") {
        return { ...state, listRoundByIdOrganization: [] };
      } else {
        return { ...state, listRoundByIdOrganization: payload };
      }
    case GET_LIST_ROUND_BY_ID_ORGANIZATION_FAILED:
      return { ...state, errors: payload };
    case GET_LIST_ALL_ROUND_SUCCESS:
      if (payload === "No Data") {
        return { ...state, listAllRound: [] };
      } else {
        return { ...state, listAllRound: payload };
      }
    case GET_LIST_ALL_ROUND_FAILED:
      return { ...state, errors: payload };
    default:
      return state;
  }
};

export default roundReducer;
