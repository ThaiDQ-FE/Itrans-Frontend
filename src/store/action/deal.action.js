import axios from "axios";
import {
  authorizationAccount,
  getLocalStorage,
  showMessage,
} from "../../assets/helper/helper";
import {
  CREATE_DEAL_FAIL,
  CREATE_DEAL_SUCCESS,
  DELETE_DEAL_FAIL,
  DELETE_DEAL_SUCCESS,
  GET_CURRENT_DEAL_CANCEL_FAIL,
  GET_CURRENT_DEAL_CANCEL_SUCCESS,
  GET_CURRENT_DEAL_DONE_FAIL,
  GET_CURRENT_DEAL_DONE_SUCCESS,
  GET_CURRENT_DEAL_SUCCESS,
  GET_DEAL_BY_ID_FAILD,
  GET_DEAL_BY_ID_SUCCESS,
  GET_DETAIL_DEAL_FAIL,
  GET_DETAIL_DEAL_SUCCESS,
  UPDATE_DEAL_ACCEPT_FAIL,
  UPDATE_DEAL_ACCEPT_SUCCESS,
  UPDATE_DEAL_FAIL,
  UPDATE_DEAL_REJECT_FAIL,
  UPDATE_DEAL_REJECT_SUCCESS,
  UPDATE_DEAL_SUCCESS,
} from "../constants/deal.const";
import { checkIdUser } from "../../assets/helper/helper";
import { startLoading,stopLoading } from "./loading.action";
import { defaultUrlAPIStringTemplate } from "../../configs/url";
import { getDealByRound } from "./round.action";
export const getListDealByIdOrganization = (idOrganization) => {
  return (dispatch) => {
    dispatch(startLoading());
    const token = authorizationAccount();
    axios({
      method: "GET",
      url: `http://localhost:8080/api/v1/deal-by-organization?id-organization=${idOrganization}`,
      data: null,
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
      method: 'GET',
      url: `http://localhost:8080/api/v1/deals-current?id-investor=${idInvestor}&page=${page}`,
      data: null,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
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

export const getDetailDeal = (idDeal) => {
  return  (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: 'GET',
      url: defaultUrlAPIStringTemplate()+`detail-deal?idDeal=${idDeal}`,
      data: null,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      dispatch(getDetaillDealSuccess(res.data))
    }).catch((err) => {
      dispatch(getDetailDealFail(err))
    })
  }
}
const getDetaillDealSuccess = (detailDeal) => {
  return {
    type: GET_DETAIL_DEAL_SUCCESS,
    payload: detailDeal
  };
};
const getDetailDealFail = (error) => {
  return {
    type: GET_DETAIL_DEAL_FAIL,
    payload: error
  };
};

export const updateAcceptDeal = (idDeal) => {
  return  (dispatch) => {
    const userLogin = getLocalStorage("userInfo");
    const token = authorizationAccount();
    axios({
      method: 'PUT',
      url: defaultUrlAPIStringTemplate()+`accept-deal?id-deal=${idDeal}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      dispatch(updateAcceptDealSuccess(res.data))
      dispatch(getDealByRound(userLogin.gmail,1));
    }).catch((err) => {
      dispatch(updateAcceptDealFail(err))
    })
  }
}
const updateAcceptDealSuccess = (detailDeal) => {
  return {
    type: UPDATE_DEAL_ACCEPT_SUCCESS,
    payload: detailDeal
  };
};
const updateAcceptDealFail = (error) => {
  return {
    type: UPDATE_DEAL_ACCEPT_FAIL,
    payload: error
  };
};

export const updateRejectDeal = (idDeal) => {
  return  (dispatch) => {
    const userLogin = getLocalStorage("userInfo");
    const token = authorizationAccount();
    axios({
      method: 'PUT',
      url: defaultUrlAPIStringTemplate()+`reject-deal?id-deal=${idDeal}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      dispatch(updateRejectDealSuccess(res.data))
      dispatch(getDealByRound(userLogin.gmail,1));
    }).catch((err) => {
      dispatch(updateRejectDealFail(err))
    })
  }
}
const updateRejectDealSuccess = (detailDeal) => {
  return {
    type: UPDATE_DEAL_REJECT_SUCCESS,
    payload: detailDeal
  };
};
const updateRejectDealFail = (error) => {
  return {
    type: UPDATE_DEAL_REJECT_FAIL,
    payload: error
  };
};

export const createDeal = (object) => {
  return  (dispatch) => {
    const userLogin = getLocalStorage("userInfo");
    const token = authorizationAccount();
    axios({
      method: 'POST',
      url: defaultUrlAPIStringTemplate()+`deal`,
      data:object,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      dispatch(createDealSuccess(res.data))
      dispatch(getDealByRound(userLogin.gmail,1));
    }).catch((err) => {
      dispatch(createDealFail(err))
    })
  }
}
const createDealSuccess = (detailDeal) => {
  return {
    type: CREATE_DEAL_SUCCESS,
    payload: detailDeal
  };
};
const createDealFail = (error) => {
  return {
    type: CREATE_DEAL_FAIL,
    payload: error
  };
};

export const updateDealInRound = (object) => {
  return  (dispatch) => {
    const userLogin = getLocalStorage("userInfo");
    const token = authorizationAccount();
    axios({
      method: 'PUT',
      url: defaultUrlAPIStringTemplate()+`deal`,
      data:object,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      dispatch(updateDealSuccess(res.data))
      dispatch(getDealByRound(userLogin.gmail,1));
    }).catch((err) => {
      dispatch(updateDealFail(err))
    })
  }
}
const updateDealSuccess = (detailDeal) => {
  return {
    type: UPDATE_DEAL_SUCCESS,
    payload: detailDeal
  };
};
const updateDealFail = (error) => {
  return {
    type: UPDATE_DEAL_FAIL,
    payload: error
  };
};

export const deleteDealInRound = (idDeal) => {
  return  (dispatch) => {
    const userLogin = getLocalStorage("userInfo");
    const token = authorizationAccount();
    axios({
      method: 'PUT',
      url: `http://localhost:8080/api/v1/deal-status-delete-cancel?id-deal=${idDeal}&status=DELETE`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      dispatch(deleteDealSuccess(res.data))
      dispatch(getDealByRound(userLogin.gmail,1));
    }).catch((err) => {
      dispatch(deleteDealFail(err))
    })
  }
}
const deleteDealSuccess = (detailDeal) => {
  return {
    type: DELETE_DEAL_SUCCESS,
    payload: detailDeal
  };
};
const deleteDealFail = (error) => {
  return {
    type: DELETE_DEAL_FAIL,
    payload: error
  };
};