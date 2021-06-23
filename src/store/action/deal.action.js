import axios from "axios";
import { authorizationAccount } from "../../assets/helper/helper";
import {
  GET_DEAL_BY_ID_FAILD,
  GET_DEAL_BY_ID_SUCCESS,
} from "../constants/deal.const";

export const getListDeal = (id) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: "GET",
      url: `http://localhost:8080/api/v1/deal/roundId/${id}`,
      data: { id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(getListDealSuccess(res.data));
      })
      .catch((err) => {
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
