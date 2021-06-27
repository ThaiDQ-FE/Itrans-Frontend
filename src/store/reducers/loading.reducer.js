import { START_LOADING, STOP_LOADING } from "../constants/loading.const";
const initialState = {
  loading: false,
};

const loadingReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
export default loadingReducer;
