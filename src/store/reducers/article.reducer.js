import {
  GET_ANOTHER_ARTICLE_FAILED,
  GET_ANOTHER_ARTICLE_SUCCESS,
  GET_DETAIL_ARTICLE_BY_ID_FAILED,
  GET_DETAIL_ARTICLE_BY_ID_SUCCESS,
  GET_LIST_ARTICLE_FAILED,
  GET_LIST_ARTICLE_SUCCESS,
  GET_LIST_VIEW_ARTICLE_FAILED,
  GET_LIST_VIEW_ARTICLE_SUCCESS,
} from "../constants/article.const";

const initialState = {
  listArticle: [],
  listViewArticle: [],
  detailArticle: {},
  listAnotherArticle: [],
  errors: [],
};

const articleReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_LIST_ARTICLE_SUCCESS:
      return { ...state, listArticle: payload };
    case GET_LIST_ARTICLE_FAILED:
      return { ...state, errors: payload };
    case GET_LIST_VIEW_ARTICLE_SUCCESS:
      return { ...state, listViewArticle: payload };
    case GET_LIST_VIEW_ARTICLE_FAILED:
      return { ...state, errors: payload };
    case GET_DETAIL_ARTICLE_BY_ID_SUCCESS:
      return { ...state, detailArticle: payload };
    case GET_DETAIL_ARTICLE_BY_ID_FAILED:
      return { ...state, errors: payload };
    case GET_ANOTHER_ARTICLE_SUCCESS:
      return { ...state, listAnotherArticle: payload };
    case GET_ANOTHER_ARTICLE_FAILED:
      return { ...state, errors: payload };
    default:
      return state;
  }
};

export default articleReducer;
