import { GET_DEAL_BY_ID_FAILD, GET_DEAL_BY_ID_SUCCESS } from "../constants/deal.const";

const initialState = {
  listDeal: [],
  errors: [],
};

const dealReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_DEAL_BY_ID_SUCCESS:
      return { ...state, listDeal: payload };
    case GET_DEAL_BY_ID_FAILD:
      return { ...state, errors: payload };

    default:
      return state;
  }
};

export default dealReducer;