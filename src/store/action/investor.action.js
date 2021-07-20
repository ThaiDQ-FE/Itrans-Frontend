import axios from "axios";
import {
  GET_LIST_INVESTOR_FILTER_FAILED,
  GET_LIST_INVESTOR_FILTER_SUCCESS,
} from "../constants/investor.const";
import { startLoading, stopLoading } from "./loading.action";

export const getInvestorFilter = (
  arrayProvince,
  arrayType,
  gmail,
  isLoading
) => {
  let baseUrl = "http://localhost:8080/api/v1/auth/investor?";
  let tailUrl = "";
  if (arrayProvince.length === 0) {
    let params = `idProvince=0`;
    tailUrl = tailUrl + params + `&`;
  } else {
    arrayProvince.map((item) => {
      let params = `idProvince=${item}`;
      tailUrl = tailUrl + params + `&`;
    });
  }
  if (arrayType.length === 0) {
    let params = `idType=0`;
    tailUrl = tailUrl + params + `&`;
  } else {
    arrayType.map((item) => {
      let params = `idType=${item}`;
      tailUrl = tailUrl + params + `&`;
    });
  }
  let gmailTail = `mail=${gmail}`;
  return (dispatch) => {
    if (isLoading === true) {
      dispatch(startLoading());
    }
    axios({
      method: "GET",
      url: baseUrl + tailUrl + gmailTail,
      data: null,
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(getInvestorFilterSuccess(res.data));
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getInvestorFilterFailed(err));
      });
  };
};

export const getInvestorFilterSuccess = (listInvestor) => {
  return {
    type: GET_LIST_INVESTOR_FILTER_SUCCESS,
    payload: listInvestor,
  };
};

export const getInvestorFilterFailed = (err) => {
  return {
    type: GET_LIST_INVESTOR_FILTER_FAILED,
    payload: err,
  };
};
