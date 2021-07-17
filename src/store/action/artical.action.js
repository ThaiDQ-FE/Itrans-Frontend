import axios from "axios";
import { authorizationAccount } from "../../assets/helper/helper";
import {
  defaultUrlAPI,
  defaultUrlAPIAuthStringTemplate,
  defaultUrlAPIStringTemplate,
} from "../../configs/url";
import {
  GET_DETAIL_ARTICLE_BY_ID_FAILED,
  GET_DETAIL_ARTICLE_BY_ID_SUCCESS,
  GET_LIST_ARTICLE_FAILED,
  GET_LIST_ARTICLE_SUCCESS,
  GET_LIST_VIEW_ARTICLE_FAILED,
  GET_LIST_VIEW_ARTICLE_SUCCESS,
} from "../constants/article.const";
import { startLoading, stopLoading } from "./loading.action";

export const getListArticleByGmail = (gmail, isSelected) => {
  return (dispatch) => {
    if (isSelected === false) {
      dispatch(startLoading());
    }
    axios({
      method: "GET",
      url:
        defaultUrlAPIAuthStringTemplate() +
        `articles-by-account?gmail=${gmail}`,
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(getListArticleByGmailSuccess(res.data));
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getListArticleByGmailFailed(err));
      });
  };
};

const getListArticleByGmailSuccess = (listArticle) => {
  return {
    type: GET_LIST_ARTICLE_SUCCESS,
    payload: listArticle,
  };
};

const getListArticleByGmailFailed = (err) => {
  return {
    type: GET_LIST_ARTICLE_FAILED,
    payload: err,
  };
};

export const getListViewArticle = (gmail, isSelect) => {
  return (dispatch) => {
    if (isSelect === false) {
      dispatch(startLoading());
    }
    axios({
      method: "GET",
      url: defaultUrlAPIStringTemplate() + `articles-by-follow?gmail=${gmail}`,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        dispatch(stopLoading());
        if (res.status === 200) {
          dispatch(getListViewArticleSuccess(res.data));
        }
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getListViewArticleFailed(err));
      });
  };
};

const getListViewArticleSuccess = (list) => {
  return {
    type: GET_LIST_VIEW_ARTICLE_SUCCESS,
    payload: list,
  };
};

const getListViewArticleFailed = (err) => {
  return {
    type: GET_LIST_VIEW_ARTICLE_FAILED,
    payload: err,
  };
};

export const getDetailArticlesByID = (id) => {
  return (dispatch) => {
    dispatch(startLoading());
    axios({
      method: "GET",
      url: defaultUrlAPIStringTemplate() + `article/${id}`,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        dispatch(stopLoading());
        if (res.status === 200) {
          dispatch(getDetailArticlesByIDSuccess(res.data));
        }
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getDetailArticlesByIDFailed(err));
      });
  };
};

const getDetailArticlesByIDSuccess = (detail) => {
  return {
    type: GET_DETAIL_ARTICLE_BY_ID_SUCCESS,
    payload: detail,
  };
};

const getDetailArticlesByIDFailed = (err) => {
  return {
    type: GET_DETAIL_ARTICLE_BY_ID_FAILED,
    payload: err,
  };
};
