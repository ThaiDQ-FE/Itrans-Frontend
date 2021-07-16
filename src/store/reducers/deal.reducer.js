import { GET_CURRENT_DEAL_CANCEL_FAIL, GET_CURRENT_DEAL_CANCEL_SUCCESS, GET_CURRENT_DEAL_DONE_FAIL, GET_CURRENT_DEAL_DONE_SUCCESS, GET_CURRENT_DEAL_FAILD, GET_CURRENT_DEAL_SUCCESS, GET_DEAL_BY_ID_FAILD, GET_DEAL_BY_ID_SUCCESS } from "../constants/deal.const";

const initialState = {
  listDeal: [],
  errors: [],
  listDealCurrent: [],
  listDealDone: [],
  listDealCancel: []
};

const dealReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_DEAL_BY_ID_SUCCESS:
      return { ...state, listDeal: payload };
    case GET_DEAL_BY_ID_FAILD:
      return { ...state, errors: payload };
    case GET_CURRENT_DEAL_SUCCESS:
      return { ...state, listDealCurrent: payload };
    case GET_CURRENT_DEAL_FAILD:
      return { ...state, errors: payload };
    case GET_CURRENT_DEAL_DONE_SUCCESS:
      return { ...state, listDealDone: payload };
    case GET_CURRENT_DEAL_DONE_FAIL:
      return { ...state, errors: payload };
    case GET_CURRENT_DEAL_CANCEL_SUCCESS:
      return { ...state, listDealCancel: payload };
    case GET_CURRENT_DEAL_CANCEL_FAIL:
      return { ...state, errors: payload };
    default:
      return state;
  }
};

export default dealReducer;