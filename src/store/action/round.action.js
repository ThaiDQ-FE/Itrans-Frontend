import axios from "axios";
import Swal from "sweetalert2";
import {
  authorizationAccount,
  checkIdUser,
  showMessage,
} from "../../assets/helper/helper";
import {
  GET_LIST_ROUND_ACTIVE_BY_ID_ORGANIZATION_FAILED,
  GET_LIST_ROUND_ACTIVE_BY_ID_ORGANIZATION_SUCCESS,
  GET_LIST_ROUND_PASS_BY_ID_ORGANIZATION_FAILED,
  GET_LIST_ROUND_PASS_BY_ID_ORGANIZATION_SUCCESS,
} from "../constants/round.const";
const id = checkIdUser();
export const getListRoundActiveByIdOrganization = (id) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: "GET",
      url: `http://localhost:8080/api/v1/round/round-active/${id}`,
      data: { id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(getListRoundActiveByIdOrganizationSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getListRoundActiveByIdOrganizationFailed(err));
      });
  };
};

export const getListRoundPassByIdOrganization = (id) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: "GET",
      url: `http://localhost:8080/api/v1/round/round-passed/${id}`,
      data: { id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(getListRoundPassByIdOrganizationSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getListRoundPassByIdOrganizationFailed(err));
      });
  };
};

export const postRound = (
  mail,
  fundingAmount,
  shareRequirement,
  description,
  startDate,
  endDate
) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: "POST",
      url: "http://localhost:8080/api/v1/round",
      data: {
        mail,
        fundingAmount,
        shareRequirement,
        description,
        startDate,
        endDate,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 202) {
          showMessage("error", res.data);
        } else {
          Swal.fire({
            icon: "success",
            title: res.data,
            heightAuto: true,
            timerProgressBar: false,
            showConfirmButton: true,
            confirmButtonText: "Đồng ý",
            confirmButtonColor: "#ff8412",
          }).then(async (result) => {
            if (result.isConfirmed) {
              dispatch(getListRoundActiveByIdOrganization(id));
            }
          });
        }
      })
      .catch((err) => {});
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
