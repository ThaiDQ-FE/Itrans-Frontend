import axios from "axios";
import {
  authorizationAccount,
  checkEmailUser,
  showMessage,
} from "../../assets/helper/helper";
import message from "../../assets/message/text";
import {
  GET_LIST_DOCUMENT_BY_ROUND_FAILED,
  GET_LIST_DOCUMENT_BY_ROUND_SUCCESS,
  GET_LIST_INTRODUCE_BY_ROUND_FAILED,
  GET_LIST_INTRODUCE_BY_ROUND_SUCCESS,
  GET_LIST_INTRODUCE_FAILED,
  GET_LIST_INTRODUCE_SUCCESS,
} from "../constants/introduce.const";
import { startLoading, stopLoading } from "./loading.action";

export const getListIntroduceByGmail = (gmail) => {
  return (dispatch) => {
    dispatch(startLoading());
    axios({
      method: "GET",
      url: `http://localhost:8080/api/v1/auth/introduces/${gmail}`,
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(getListIntroduceByGmailSuccess(res.data));
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getListIntroduceByGmailFailed(err));
      });
  };
};

export const deleteIntroduceById = (id) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: "PUT",
      url: `http://localhost:8080/api/v1/delete-introduce?idIntroduce=${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          showMessage("success", "Xóa tiêu đề - nội dung thành công");
          dispatch(getListIntroduceByGmail(checkEmailUser()));
        } else {
          showMessage("error", "Xóa tiêu đề nội dung thất bại");
        }
      })
      .catch((err) => {
        showMessage("error", message.CACTH_ERROR);
      });
  };
};

const getListIntroduceByGmailSuccess = (listIntroduce) => {
  return {
    type: GET_LIST_INTRODUCE_SUCCESS,
    payload: listIntroduce,
  };
};

const getListIntroduceByGmailFailed = (err) => {
  return {
    type: GET_LIST_INTRODUCE_FAILED,
    payload: err,
  };
};

export const getListIntroduceByRoundId = (idRound) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: "GET",
      url: `http://localhost:8080/api/v1/introduces-by-round?idRound=${idRound}`,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => {
        dispatch(getListIntroduceByRoundIdSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getListIntroduceByRoundIdFailed(err));
      });
  };
};

const getListIntroduceByRoundIdSuccess = (listIntroduceByrRound) => {
  return {
    type: GET_LIST_INTRODUCE_BY_ROUND_SUCCESS,
    payload: listIntroduceByrRound,
  };
};

const getListIntroduceByRoundIdFailed = (err) => {
  return {
    type: GET_LIST_INTRODUCE_BY_ROUND_FAILED,
    payload: err,
  };
};

export const getListDocumentByRoundId = (idRound) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: "GET",
      url: `http://localhost:8080/api/v1/document?idRound=${idRound}`,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => {
        dispatch(getListDocumentByRoundIdSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getListDocumentByRoundIdFailed(err));
      });
  };
};

const getListDocumentByRoundIdSuccess = (listDocumentByRound) => {
  return {
    type: GET_LIST_DOCUMENT_BY_ROUND_SUCCESS,
    payload: listDocumentByRound,
  };
};

const getListDocumentByRoundIdFailed = (err) => {
  return {
    type: GET_LIST_DOCUMENT_BY_ROUND_FAILED,
    payload: err,
  };
};
