import axios from "axios";
import {
  GET_LIST_ARTICLE_FAILED,
  GET_LIST_ARTICLE_SUCCESS,
} from "../constants/article.const";
import { startLoading, stopLoading } from "./loading.action";

export const getListArticleByGmail = (gmail) => {
  return (dispatch) => {
    dispatch(startLoading());
    axios({
      method: "GET",
      url: `http://localhost:8080/api/v1/auth/articles-by-account?gmail=${gmail}`,
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
