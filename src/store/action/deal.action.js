import axios from "axios";
import {
  authorizationAccount,
  showMessage,
} from "../../assets/helper/helper";
import {
  GET_CURRENT_DEAL_CANCEL_FAIL,
  GET_CURRENT_DEAL_CANCEL_SUCCESS,
  GET_CURRENT_DEAL_DONE_FAIL,
  GET_CURRENT_DEAL_DONE_SUCCESS,
  GET_CURRENT_DEAL_SUCCESS,
  GET_DEAL_BY_ID_FAILD,
  GET_DEAL_BY_ID_SUCCESS,
} from "../constants/deal.const";
import { checkIdUser } from "../../assets/helper/helper";
export const getListDealByIdOrganization = (idOrganization) => {
  return (dispatch) => {
    const token = authorizationAccount();
    console.log('eee');
    axios({
      method: "GET",
      url: `http://localhost:8080/api/v1/deal-by-organization?id-organization=${idOrganization}`,
      data: null,
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

export const getCurrentDeal = (idInvestor, page) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: 'GET',
      url: `http://localhost:8080/api/v1/deals-current?id-investor=${idInvestor}&page=${page}`,
      data: null,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      console.log(res.data)
      console.log(idInvestor)
      dispatch(getCurrentDealSuccess(res.data))
    }).catch((err) => {
      dispatch(getCurrentDealFail(err))
    })
  }
}
const getCurrentDealSuccess = (listDealCurrent) => {
  return {
    type: GET_CURRENT_DEAL_SUCCESS,
    payload: listDealCurrent
  };
};
const getCurrentDealFail = (error) => {
  return {
    type: GET_CURRENT_DEAL_SUCCESS,
    payload: error
  };
};

export const updateDealStatusCancel = (object) => {
  return (dispatch) => {
    const token = authorizationAccount();
    const id = checkIdUser();
    axios({
      method: 'PUT',
      url: `http://localhost:8080/api/v1/deal-status-delete-cancel?id-deal=${object.id}&status=${object.status}`,
      data: null,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      showMessage("success", "Hủy deal thành công");
      dispatch(getCancelDeal(id, 0))
      dispatch(getCurrentDeal(id, 0))
    }).catch((err) => {
    })
  }
}
export const updateDeal = (object) => {
  return (dispatch) => {
    const token = authorizationAccount();
    const id = checkIdUser();
    axios({
      method: 'PUT',
      url: `http://localhost:8080/api/v1/deal`,
      data: object,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      dispatch(getCurrentDeal(id, 0))
    }).catch((err) => {
    })
  }
}

export const updateDealAccept = (object) => {
  return (dispatch) => {
    const token = authorizationAccount();
    const id = checkIdUser();
    axios({
      method: 'PUT',
      url: `http://localhost:8080/api/v1/deal-status-done`,
      data: object,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      showMessage("success", "Chấp nhân deal thành công");
      dispatch(getDoneDeal(id, 0))
      dispatch(getCurrentDeal(id, 0))
    }).catch((err) => {
    })
  }
}

export const getDoneDeal = (idInvestor, page) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: 'GET',
      url: `http://localhost:8080/api/v1/deals-success?id-investor=${idInvestor}&page=${page}`,
      data: null,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      dispatch(getDoneDealSuccess(res.data))
    }).catch((err) => {
      dispatch(getDoneDealFail(err))
    })
  }
}
const getDoneDealSuccess = (listDealDone) => {
  return {
    type: GET_CURRENT_DEAL_DONE_SUCCESS,
    payload: listDealDone
  };
};
const getDoneDealFail = (error) => {
  return {
    type: GET_CURRENT_DEAL_DONE_FAIL,
    payload: error
  };
};


export const getCancelDeal = (idInvestor, page) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: 'GET',
      url: `http://localhost:8080/api/v1/deals-failed?id-investor=${idInvestor}&page=${page}`,
      data: null,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      dispatch(getCancelDealSuccess(res.data))
    }).catch((err) => {
      dispatch(getCancelDealFail(err))
    })
  }
}
const getCancelDealSuccess = (listDealCancel) => {
  return {
    type: GET_CURRENT_DEAL_CANCEL_SUCCESS,
    payload: listDealCancel
  };
};
const getCancelDealFail = (error) => {
  return {
    type: GET_CURRENT_DEAL_CANCEL_FAIL,
    payload: error
  };
};
