import axios from "axios";
import { authorizationAccount } from "../../assets/helper/helper";
import {
  GET_CURRENT_DEAL_SUCCESS,
  GET_DEAL_BY_ID_FAILD,
  GET_DEAL_BY_ID_SUCCESS,
} from "../constants/deal.const";
import { startLoading, stopLoading } from "./loading.action";

export const getListDealByIdOrganization = (idOrganization) => {
  return (dispatch) => {
    dispatch(startLoading());
    const token = authorizationAccount();
    axios({
      method: "GET",
      url: `http://localhost:8080/api/v1/deal-by-organization?id-organization=${idOrganization}`,
      data: { idOrganization },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(getListDealSuccess(res.data));
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getListDealFailed(err));
      });
  };
};

export const getListDealSuccess = (listDeal) => {
  return {
    type: GET_DEAL_BY_ID_SUCCESS,
    payload: listDeal,
  };
};

export const getListDealFailed = (err) => {
  return {
    type: GET_DEAL_BY_ID_FAILD,
    payload: err,
  };
};

export const getCurrentDeal = (idInvestor, page) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: "GET",
      url: `http://localhost:8080/api/v1/deals-current?id-investor=${idInvestor}&page=${page}`,
      data: null,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(getCurrentDealSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getCurrentDealFail(err));
      });
  };
};
const getCurrentDealSuccess = (listDealCurrent) => {
  return {
    type: GET_CURRENT_DEAL_SUCCESS,
    payload: listDealCurrent,
  };
};
const getCurrentDealFail = (error) => {
  return {
    type: GET_CURRENT_DEAL_SUCCESS,
    payload: error,
  };
};
