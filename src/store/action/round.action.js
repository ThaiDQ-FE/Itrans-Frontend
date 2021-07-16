import axios from "axios";
import {
  authorizationAccount,
  checkIdUser,
  showMessage,
} from "../../assets/helper/helper";
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
      .catch((err) => { });
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
export const getListRoundByIdInvestor = (id) => {
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

export const getListRoundByIdOrganization = (id) => {
  return (dispatch) => {
    dispatch(startLoading());
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
      })
    }
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
