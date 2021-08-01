import axios from "axios";
import {
  authorizationAccount,
  checkIdUser,
  getLocalStorage,
  sessionTimeOut,
  showMessage,
} from "../../assets/helper/helper";
import message from "../../assets/message/text";
import { defaultUrlAPI, defaultUrlAPIStringTemplate } from "../../configs/url";
import {
  CREATE_ANSWER_FAIL,
  CREATE_ANSWER_SUCCESS,
  CREATE_QUESTION_FAIL,
  CREATE_QUESTION_SUCCESS,
  GET_ALL_LIST_ROUND_ACCTIVE_FAILED,
  GET_ALL_LIST_ROUND_ACTIVE_SUCCESS,
  GET_LIST_QUESTION_AND_ANSWER_FAIL,
  GET_LIST_QUESTION_AND_ANSWER_SUCCESS,
  GET_LIST_ALL_ROUND_FAILED,
  GET_LIST_ALL_ROUND_SUCCESS,
  GET_LIST_ROUND_ACTIVE_BY_ID_ORGANIZATION_FAILED,
  GET_LIST_ROUND_ACTIVE_BY_ID_ORGANIZATION_SUCCESS,
  GET_LIST_ROUND_BY_ID_INVESTOR_FAILED,
  GET_LIST_ROUND_BY_ID_INVESTOR_SUCCESS,
  GET_LIST_ROUND_BY_ID_ORGANIZATION_FAILED,
  GET_LIST_ROUND_BY_ID_ORGANIZATION_SUCCESS,
  GET_LIST_ROUND_PASS_BY_ID_ORGANIZATION_FAILED,
  GET_LIST_ROUND_PASS_BY_ID_ORGANIZATION_SUCCESS,
  GET_LIST_ROUND_PENDING_BY_ID_ORGANIZATION_FAILED,
  GET_LIST_ROUND_PENDING_BY_ID_ORGANIZATION_SUCCESS,
  GET_ROUND_AND_ORGANIZATION_SUCCESS,
  GET_ROUND_AND_ORGANIZATION_FAIL,
  GET_LIST_DEAL_BY_ROUND_FAIL,
  GET_LIST_DEAL_BY_ROUND_SUCCESS,
  UPDATE_ROUND_SUCCESS,
  UPDATE_ROUND_FAILED,
  UPDATE_DOCUMENT_SUCCESS,
  UPDATE_DOCUMENT_FAILED,
  DELETE_DOCUMENT_SUCCESS,
  DELETE_DOCUMENT_FAILED,
  UPDATE_ROUND_STATUS_SUCCESS,
  UPDATE_ROUND_STATUS_FAILED,
  GET_ROUND_SUGGEST_SUCCESS,
  GET_ROUND_SUGGEST_FAILED,
  GET_ROUND_ACTIVE_SUCCESS_V2,
  GET_ROUND_ACTIVE_FAILED_V2,
} from "../constants/round.const";
import { getListDocumentByRoundId } from "./introduce.action";
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
// v2
export const getListRoundByIdInvestor = (id, history) => {
  return (dispatch) => {
    dispatch(startLoading());
    axios({
      method: "GET",
      url: defaultUrlAPIStringTemplate() + `round/get-rounds-by-investor/${id}`,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        dispatch(stopLoading());
        if (res.status === 200) {
          dispatch(getListRoundByIdInvestorSuccess(res.data));
        } else {
          dispatch(getListRoundByIdInvestorFailed(res));
        }
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getListRoundByIdInvestorFailed(err));
        if (getLocalStorage("userInfo") !== null) {
          sessionTimeOut(err, history);
        }
      });
  };
};

export const getListRoundByIdInvestorSuccess = (listRound) => {
  return {
    type: GET_LIST_ROUND_BY_ID_INVESTOR_SUCCESS,
    payload: listRound,
  };
};

export const getListRoundByIdInvestorFailed = (err) => {
  return {
    type: GET_LIST_ROUND_BY_ID_INVESTOR_FAILED,
    payload: err,
  };
};

export const getListRoundByIdOrganization = (id, isSelected, history) => {
  return (dispatch) => {
    if (isSelected === false) {
      dispatch(startLoading());
    }
    axios({
      method: "GET",
      url:
        defaultUrlAPIStringTemplate() +
        `round/get-rounds-by-organization/${id}`,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        dispatch(stopLoading());
        if (res.status === 200) {
          dispatch(getListRoundByIdOrganizationSuccess(res.data));
        } else {
          dispatch(getListRoundByIdOrganizationFailed(res));
        }
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getListRoundByIdOrganizationFailed(err));
        if (getLocalStorage("userInfo") !== null) {
          sessionTimeOut(err, history);
        }
      });
  };
};

export const getListRoundByIdOrganizationSuccess = (listRound) => {
  return {
    type: GET_LIST_ROUND_BY_ID_ORGANIZATION_SUCCESS,
    payload: listRound,
  };
};

export const getListRoundByIdOrganizationFailed = (err) => {
  return {
    type: GET_LIST_ROUND_BY_ID_ORGANIZATION_FAILED,
    payload: err,
  };
};

export const getListQuestionAndAnswer = (gmail, idRound) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: "GET",
      url: `http://localhost:8080/api/v1/question-and-answer?gmail=${gmail}&idRound=${idRound}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(getListQuestionAndAnswerSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getListQuestionAndAnswerFailed(err));
      });
  };
};

export const getListAllRound = () => {
  return (dispatch) => {
    dispatch(startLoading());
    axios({
      method: "GET",
      url: defaultUrlAPI() + "round/get-all-round",
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(getListAllRoundSuccess(res.data));
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getListAllRoundFailed(err));
      });
  };
};

export const getListQuestionAndAnswerSuccess = (roundDetail) => {
  return {
    type: GET_LIST_QUESTION_AND_ANSWER_SUCCESS,
    payload: roundDetail,
  };
};

export const getListQuestionAndAnswerFailed = (err) => {
  return {
    type: GET_LIST_QUESTION_AND_ANSWER_FAIL,
    payload: err,
  };
};
export const createQuestion = (question) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: "POST",
      url: `http://localhost:8080/api/v1/question`,
      data: question,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(createQuesttionSuccess(res.data));
      })
      .catch((err) => {
        dispatch(createQuesttionFailed(err));
      });
  };
};

export const createQuesttionSuccess = (question) => {
  return {
    type: CREATE_QUESTION_SUCCESS,
    payload: question,
  };
};

export const createQuesttionFailed = (err) => {
  return {
    type: CREATE_QUESTION_FAIL,
    payload: err,
  };
};

export const createAnswer = (answer) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: "POST",
      url: `http://localhost:8080/api/v1/answer`,
      data: answer,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(createAnswerSuccess(res.data));
      })
      .catch((err) => {
        dispatch(createAnswerFailed(err));
      });
  };
};

export const createAnswerSuccess = (question) => {
  return {
    type: CREATE_ANSWER_SUCCESS,
    payload: question,
  };
};

export const createAnswerFailed = (err) => {
  return {
    type: CREATE_ANSWER_FAIL,
    payload: err,
  };
};

export const getListAllRoundSuccess = (listRound) => {
  return {
    type: GET_LIST_ALL_ROUND_SUCCESS,
    payload: listRound,
  };
};

export const getListAllRoundFailed = (err) => {
  return {
    type: GET_LIST_ALL_ROUND_FAILED,
    payload: err,
  };
};

export const getRoundAndOrganization = (idRound) => {
  console.log(idRound);
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: "GET",
      url: `http://localhost:8080/api/v1/round-and-organization-by-id-round?idRound=${idRound}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(getRoundAndOrganizationSucess(res.data));
      })
      .catch((err) => {
        dispatch(getRoundAndOrganizationFailed(err));
      });
  };
};

export const getRoundAndOrganizationSucess = (round) => {
  return {
    type: GET_ROUND_AND_ORGANIZATION_SUCCESS,
    payload: round,
  };
};

export const getRoundAndOrganizationFailed = (err) => {
  return {
    type: GET_ROUND_AND_ORGANIZATION_FAIL,
    payload: err,
  };
};

export const getDealByRound = (gmail, roundId) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: "GET",
      url: `http://localhost:8080/api/v1/deal-by-round?gmail=${gmail}&roundId=${roundId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(getDealByRoundSucess(res.data));
      })
      .catch((err) => {
        dispatch(getDealByRoundFailed(err));
      });
  };
};

export const getDealByRoundSucess = (deal) => {
  return {
    type: GET_LIST_DEAL_BY_ROUND_SUCCESS,
    payload: deal,
  };
};

export const getDealByRoundFailed = (err) => {
  return {
    type: GET_LIST_DEAL_BY_ROUND_FAIL,
    payload: err,
  };
};

export const updateRound = (object) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: "PUT",
      url: `http://localhost:8080/api/v1/round/updateRound`,
      data: object,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(updateRoundSucess(res.data));
        dispatch(getRoundAndOrganization(object.id));
      })
      .catch((err) => {
        dispatch(updateRoundFailed(err));
      });
  };
};

export const updateRoundSucess = (deal) => {
  return {
    type: UPDATE_ROUND_SUCCESS,
    payload: deal,
  };
};

export const updateRoundFailed = (err) => {
  return {
    type: UPDATE_ROUND_FAILED,
    payload: err,
  };
};

export const updateDocument = (object, id) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: "PUT",
      url: `http://localhost:8080/api/v1/document`,
      data: object,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(updateDocumentSucess(res.data));
        dispatch(getListDocumentByRoundId(id));
      })
      .catch((err) => {
        dispatch(updateDocumentFailed(err));
      });
  };
};

export const updateDocumentSucess = (deal) => {
  return {
    type: UPDATE_DOCUMENT_SUCCESS,
    payload: deal,
  };
};

export const updateDocumentFailed = (err) => {
  return {
    type: UPDATE_DOCUMENT_FAILED,
    payload: err,
  };
};

export const deleteDocument = (idDocument, idRound) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: "PUT",
      url: `http://localhost:8080/api/v1/delete-document?idDocument=${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(deleteDocumentSucess(res.data));
        dispatch(getListDocumentByRoundId(idRound));
      })
      .catch((err) => {
        dispatch(deleteDocumentFailed(err));
      });
  };
};

export const deleteDocumentSucess = (deal) => {
  return {
    type: DELETE_DOCUMENT_SUCCESS,
    payload: deal,
  };
};

export const deleteDocumentFailed = (err) => {
  return {
    type: DELETE_DOCUMENT_FAILED,
    payload: err,
  };
};

export const updateStatusRoundDetail = (object, idRound) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: "PUT",
      url: `http://localhost:8080/api/v1/round/updateStatusRound`,
      data: object,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(updateRoundStatusSucess(res.data));
        dispatch(getRoundAndOrganization(idRound));
      })
      .catch((err) => {
        dispatch(updateRoundStatusFailed(err));
      });
  };
};

export const updateRoundStatusSucess = (deal) => {
  return {
    type: UPDATE_ROUND_STATUS_SUCCESS,
    payload: deal,
  };
};

export const updateRoundStatusFailed = (err) => {
  return {
    type: UPDATE_ROUND_STATUS_FAILED,
    payload: err,
  };
};

export const getRoundSuggest = (id, history, isLoading) => {
  return (dispatch) => {
    if (isLoading === true) {
      dispatch(startLoading());
    }
    axios({
      mehtod: "GET",
      url: defaultUrlAPIStringTemplate() + `suggest-round?idInvestor=${id}`,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        dispatch(stopLoading());
        if (res.status === 200) {
          dispatch(getRoundSuggestSuccess(res.data));
        } else {
          showMessage("error", message.CACTH_ERROR);
        }
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getRoundSuggestFailed(err));
        sessionTimeOut(err, history);
      });
  };
};

const getRoundSuggestSuccess = (list) => {
  return {
    type: GET_ROUND_SUGGEST_SUCCESS,
    payload: list,
  };
};

const getRoundSuggestFailed = (err) => {
  return {
    type: GET_ROUND_SUGGEST_FAILED,
    payload: err,
  };
};

export const getRoundActiveV2 = (idOrg, history) => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: defaultUrlAPIStringTemplate() + `round/round-active/${idOrg}`,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getRoundActiveSuccessV2(res.data));
        } else {
          showMessage("error", message.CACTH_ERROR);
        }
      })
      .catch((err) => {
        dispatch(getRoundActiveFailedV2(err));
        sessionTimeOut(err, history);
      });
  };
};

const getRoundActiveSuccessV2 = (object) => {
  return {
    type: GET_ROUND_ACTIVE_SUCCESS_V2,
    payload: object,
  };
};

const getRoundActiveFailedV2 = (err) => {
  return {
    type: GET_ROUND_ACTIVE_FAILED_V2,
    payload: err,
  };
};
