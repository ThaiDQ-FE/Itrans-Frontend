import axios from "axios";
import {
  authorizationAccount,
  checkIdUser,
  showMessage,
} from "../../assets/helper/helper";
import {
  GET_ALL_LIST_ROUND_ACCTIVE_FAILED,
  GET_ALL_LIST_ROUND_ACTIVE_SUCCESS,
  GET_LIST_ROUND_ACTIVE_BY_ID_ORGANIZATION_FAILED,
  GET_LIST_ROUND_ACTIVE_BY_ID_ORGANIZATION_SUCCESS,
  GET_LIST_ROUND_PASS_BY_ID_ORGANIZATION_FAILED,
  GET_LIST_ROUND_PASS_BY_ID_ORGANIZATION_SUCCESS,
  GET_LIST_ROUND_PENDING_BY_ID_ORGANIZATION_FAILED,
  GET_LIST_ROUND_PENDING_BY_ID_ORGANIZATION_SUCCESS,
} from "../constants/round.const";
import { startLoading, stopLoading } from "./loading.action";
const id = checkIdUser();
export const getListRoundActiveByIdOrganization = (id) => {
  return (dispatch) => {
    const token = authorizationAccount();
    dispatch(startLoading());
    axios({
      method: "GET",
      url: `http://localhost:8080/api/v1/round/round-active/${id}`,
      data: { id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(getListRoundActiveByIdOrganizationSuccess(res.data));
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getListRoundActiveByIdOrganizationFailed(err));
      });
  };
};

export const getListRoundPendingByIdOrganization = (id) => {
  return (dispatch) => {
    const token = authorizationAccount();
    dispatch(startLoading());
    axios({
      method: "GET",
      url: `http://localhost:8080/api/v1/round/round-pending/${id}`,
      data: { id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(getListRoundPendingByIdOrganizationSuccess(res.data));
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getListRoundPendingByIdOrganizationFailed(err));
      });
  };
};

export const getListRoundPassByIdOrganization = (id) => {
  return (dispatch) => {
    const token = authorizationAccount();
    dispatch(startLoading());
    axios({
      method: "GET",
      url: `http://localhost:8080/api/v1/round/round-passed/${id}`,
      data: { id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(getListRoundPassByIdOrganizationSuccess(res.data));
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getListRoundPassByIdOrganizationFailed(err));
      });
  };
};

export const updateStatusRound = (object) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: "PUT",
      url: "http://localhost:8080/api/v1/round/updateStatusRound",
      data: object,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          if (object.status === "Kết thúc") {
            showMessage("success", "Kết thúc vòng gọi vốn thành công");
          } else {
            showMessage("success", "Hủy vòng gọi vốn thành công");
          }
          dispatch(getListRoundActiveByIdOrganization(id));
          dispatch(getListRoundPendingByIdOrganization(id));
          dispatch(getListRoundPassByIdOrganization(id));
        }
      })
      .catch((err) => {});
  };
};

export const getAllRoundByEmail = (gmail, page) => {
  return (dispatch) => {
    dispatch(startLoading());
    axios({
      method: "GET",
      url: `http://localhost:8080/api/v1/auth/round/all-round/${gmail}?page=${page}`,
      data: null,
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(getAllRoundByEmailSuccess(res.data));
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getAllRoundByEmailFailed(err));
      });
  };
};

export const getAllRoundByEmailSuccess = (listRound) => {
  return {
    type: GET_ALL_LIST_ROUND_ACTIVE_SUCCESS,
    payload: listRound,
  };
};

export const getAllRoundByEmailFailed = (err) => {
  return {
    type: GET_ALL_LIST_ROUND_ACCTIVE_FAILED,
    payload: err,
  };
};

export const getListRoundPendingByIdOrganizationSuccess = (listRound) => {
  return {
    type: GET_LIST_ROUND_PENDING_BY_ID_ORGANIZATION_SUCCESS,
    payload: listRound,
  };
};

export const getListRoundPendingByIdOrganizationFailed = (err) => {
  return {
    type: GET_LIST_ROUND_PENDING_BY_ID_ORGANIZATION_FAILED,
    payload: err,
  };
};

export const getListRoundPassByIdOrganizationSuccess = (listRound) => {
  return {
    type: GET_LIST_ROUND_PASS_BY_ID_ORGANIZATION_SUCCESS,
    payload: listRound,
  };
};

export const getListRoundPassByIdOrganizationFailed = (err) => {
  return {
    type: GET_LIST_ROUND_PASS_BY_ID_ORGANIZATION_FAILED,
    payload: err,
  };
};

export const getListRoundActiveByIdOrganizationSuccess = (listRound) => {
  return {
    type: GET_LIST_ROUND_ACTIVE_BY_ID_ORGANIZATION_SUCCESS,
    payload: listRound,
  };
};

export const getListRoundActiveByIdOrganizationFailed = (err) => {
  return {
    type: GET_LIST_ROUND_ACTIVE_BY_ID_ORGANIZATION_FAILED,
    payload: err,
  };
};

export const getAllRoundsActive = (mail, max, min, arrayStage) => {
  let baseUrl = "http://localhost:8080/api/v1/auth/round/all-round?";
  let tailUrl = "";
  let minUrl = "";
  let maxUrl = "";
  if (isNaN(max) === false) {
    let params = `max=${max}`;
    maxUrl = params + `&`;
  }
  if (isNaN(min) === false) {
    let params = `min=${min}`;
    minUrl = params + `&`;
  }
  if (arrayStage.length === 0) {
    let params = `stages=0`;
    tailUrl = tailUrl + params;
  } else {
    arrayStage.map((item, index) => {
      if (arrayStage.length - 1 === index) {
        let params = `stages=${item}`;
        tailUrl = tailUrl + params;
      } else {
        let params = `stages=${item}`;
        tailUrl = tailUrl + params + `&`;
      }
    });
  }
  let gmailTail = `mail=${mail}&`;
  return (dispatch) => {
    dispatch(startLoading());
    axios({
      method: "GET",
      url: baseUrl + gmailTail + maxUrl + minUrl + tailUrl,
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(getAllRoundsActiveSuccess(res.data));
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getAllRoundsActiveFailed(err));
      });
  };
};

export const getAllRoundsActiveSuccess = (listRoundsActive) => {
  return {
    type: GET_ALL_LIST_ROUND_ACTIVE_SUCCESS,
    payload: listRoundsActive,
  };
};

export const getAllRoundsActiveFailed = (err) => {
  return {
    type: GET_ALL_LIST_ROUND_ACCTIVE_FAILED,
    payload: err,
  };
};
