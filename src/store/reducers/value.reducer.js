import {
  GET_VALUE_LIST_INDUSTRY_FAILED,
  GET_VALUE_LIST_INDUSTRY_SUCCESS,
  GET_VALUE_LIST_PROVINCE_FAILED,
  GET_VALUE_LIST_PROVINCE_SUCCESS,
  GET_VALUE_LIST_REGION_FAILED,
  GET_VALUE_LIST_REGION_SUCCESS,
  GET_VALUE_LIST_STAGE_FAILED,
  GET_VALUE_LIST_STAGE_SUCCESS,
} from "../constants/value.const";

const initialState = {
  listValueProvince: [],
  listValueStage: [],
  listValueIndustry: [],
  listValueRegion: [],
  errors: [],
};

const valueReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_VALUE_LIST_PROVINCE_SUCCESS:
      return { ...state, listValueProvince: payload };
    case GET_VALUE_LIST_PROVINCE_FAILED:
      return { ...state, errors: payload };
    case GET_VALUE_LIST_INDUSTRY_SUCCESS:
      return { ...state, listValueIndustry: payload };
    case GET_VALUE_LIST_INDUSTRY_FAILED:
      return { ...state, errors: payload };
    case GET_VALUE_LIST_STAGE_SUCCESS:
      return { ...state, listValueStage: payload };
    case GET_VALUE_LIST_STAGE_FAILED:
      return { ...state, errors: payload };
    case GET_VALUE_LIST_REGION_SUCCESS:
      return { ...state, listValueRegion: payload };
    case GET_VALUE_LIST_REGION_FAILED:
      return { ...state, errors: payload };
    default:
      return state;
  }
};

export default valueReducer;
