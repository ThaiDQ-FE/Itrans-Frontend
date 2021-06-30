import {
  GET_ORGANIZATION_FILTER_FAILED,
  GET_ORGANIZATION_FILTER_SUCCESS,
} from "../constants/organization.const";

const initialState = {
  listRoundFilter: [],
  errors: [],
};

const organizationReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ORGANIZATION_FILTER_SUCCESS:
      if (payload === "No Data") {
        return { ...state, listRoundFilter: [] };
      } else {
        return { ...state, listRoundFilter: payload };
      }
    case GET_ORGANIZATION_FILTER_FAILED:
      return { ...state, errors: payload };
    default:
      return state;
  }
};

export default organizationReducer;
