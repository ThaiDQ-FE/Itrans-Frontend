import axios from "axios";
import {
  GET_DETAIL_COMPANY_FAILED,
  GET_DETAIL_COMPANY_SUCCESS,
} from "../constants/company.const";
import { startLoading, stopLoading } from "./loading.action";

export const getDeatilCompany = (gmail, isLoading) => {
  return (dispatch) => {
    if (isLoading === true) {
      dispatch(startLoading());
    }
    axios({
      method: "GET",
      url: `http://localhost:8080/api/v1/auth/company/${gmail}`,
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(getDetailCompaySuccess(res.data));
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getDetaileCompanyFailed(err));
      });
  };
};

const getDetailCompaySuccess = (detailCompany) => {
  return {
    type: GET_DETAIL_COMPANY_SUCCESS,
    payload: detailCompany,
  };
};

const getDetaileCompanyFailed = (err) => {
  return {
    type: GET_DETAIL_COMPANY_FAILED,
    payload: err,
  };
};
