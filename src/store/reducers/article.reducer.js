import {
  GET_LIST_ARTICLE_FAILED,
  GET_LIST_ARTICLE_SUCCESS,
} from "../constants/article.const";

const initialState = {
  listArticle: [],
  errors: [],
};

const articleReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_LIST_ARTICLE_SUCCESS:
      return { ...state, listArticle: payload };
    case GET_LIST_ARTICLE_FAILED:
      return { ...state, errors: payload };
    default:
      return state;
  }
};

export default articleReducer;
