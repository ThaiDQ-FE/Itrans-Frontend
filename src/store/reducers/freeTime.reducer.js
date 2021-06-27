import {
  GET_FREE_TIME_DETAIL_OF_ORGANIZATION_FAIL,
  GET_FREE_TIME_DETAIL_OF_ORGANIZATION_SUCCESS,
  GET_ALL_FREE_TIME_LIST_FAILED,
  GET_ALL_FREE_TIME_LIST_SUCCESS,
  GET_FREE_TIME_LIST_FAILED,
  GET_FREE_TIME_LIST_OF_ORGANIZATION_FAIL,
  GET_FREE_TIME_LIST_OF_ORGANIZATION_SUCCESS,
  GET_FREE_TIME_LIST_SUCCESS,
} from "../constants/freeTime.const";

const initialState = {
  listAllFreeTime: [],
  listFreeTime: [],
  listFreeTimeOfOrganization: [],
  errors: [],
  listFreeTimeDetailOfOrganization: []
};

const freeTimeReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_FREE_TIME_LIST_SUCCESS:
      return { ...state, listFreeTime: payload };
    case GET_FREE_TIME_LIST_FAILED:
      return { ...state, errors: payload };
    case GET_FREE_TIME_LIST_OF_ORGANIZATION_SUCCESS:
      return { ...state, listFreeTimeOfOrganization: payload };
    case GET_FREE_TIME_LIST_OF_ORGANIZATION_FAIL:
      return { ...state, errors: payload };
    case GET_ALL_FREE_TIME_LIST_SUCCESS:
      return { ...state, listAllFreeTime: payload };
    case GET_ALL_FREE_TIME_LIST_FAILED:
      return { ...state, errors: payload };
    case GET_FREE_TIME_DETAIL_OF_ORGANIZATION_SUCCESS:
      return { ...state, listFreeTimeDetailOfOrganization: payload };
    case GET_FREE_TIME_DETAIL_OF_ORGANIZATION_FAIL:
      return { ...state, errors: payload };
    default:
      return state;
  }
};

export default freeTimeReducer;
