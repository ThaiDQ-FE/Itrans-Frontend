import axios from "axios";
import {
  authorizationAccount,
  getLocalStorage,
  sessionTimeOut,
} from "../../assets/helper/helper";
import {
  defaultUrlAPI,
  defaultUrlAPIAuthStringTemplate,
  defaultUrlAPIStringTemplate,
} from "../../configs/url";
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

export const getListViewArticle = (gmail, isSelect, history) => {
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
        if (getLocalStorage("userInfo") !== null) {
          sessionTimeOut(err, history);
        }
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

export const getDetailArticlesByID = (id, history) => {
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
        if (getLocalStorage("userInfo") !== null) {
          sessionTimeOut(err, history);
        }
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

export const getAnotherArticle = (id) => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: defaultUrlAPIStringTemplate() + `other-article?idArticle=${id}`,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        dispatch(getAnotherArticleSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getAnotherArticleFailed(err));
      });
  };
};

export const getAnotherArticleSuccess = (list) => {
  return {
    type: GET_ANOTHER_ARTICLE_SUCCESS,
    payload: list,
  };
};

export const getAnotherArticleFailed = (err) => {
  return {
    type: GET_ANOTHER_ARTICLE_FAILED,
    payload: err,
  };
};
