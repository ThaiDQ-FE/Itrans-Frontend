import axios from "axios";
import Swal from "sweetalert2";
import {
  GET_FREE_TIME_DETAIL_OF_ORGANIZATION_FAIL,
  GET_FREE_TIME_DETAIL_OF_ORGANIZATION_SUCCESS,
  GET_FREE_TIME_LIST_FAILED,
  GET_FREE_TIME_LIST_OF_ORGANIZATION_FAIL,
  GET_FREE_TIME_LIST_OF_ORGANIZATION_SUCCESS,
  GET_FREE_TIME_LIST_SUCCESS,
} from "../constants/freeTime.const";

export const postFreeTime = (freeTime, investor) => {
  return (dispatch) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo.jwt;
    axios({
      method: "POST",
      url: "http://localhost:8080/api/v1/free-time",
      data: [
        {
          freeTime,
          investor,
        },
      ],
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Đăng ký thời gian rãnh thành công",
          heightAuto: true,
          timerProgressBar: false,
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          window.location.reload(true);
        }, 2000);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Đăng ký thời gian rãnh thất bại",
          heightAuto: true,
          timerProgressBar: false,
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };
};

export const getFreeTimeList = (investor, month) => {
  return (dispatch) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo.jwt;
    axios({
      method: "GET",
      url: `http://localhost:8080/api/v1/free-time?idInvestor=${investor}&month=${month}`,
      data: null,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(getFreeTimeListSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getFreeTimeListFailed(err));
      });
  };
};

const getFreeTimeListSuccess = (freeTimeList) => {
  return {
    type: GET_FREE_TIME_LIST_SUCCESS,
    payload: freeTimeList,
  };
};

const getFreeTimeListFailed = (err) => {
  return {
    type: GET_FREE_TIME_LIST_FAILED,
    payload: err,
  };
};



export const getFreeTimeListOfOrganization = (organization) => {
  return (dispatch) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo.jwt;
    axios({
      method: "GET",
      url: `http://localhost:8080/api/v1/view-schedule-organization-by-week?idOrganization=${organization}`,
      data: null,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(getFreeTimeListOfOrganizationSucess(res.data));
      })
      .catch((err) => {
        dispatch(getFreeTimeListOfOrganizationFail(err));
      });
  };
};

const getFreeTimeListOfOrganizationSucess = (listFreeTimeOfOrganization) => {
  return {
    type: GET_FREE_TIME_LIST_OF_ORGANIZATION_SUCCESS,
    payload: listFreeTimeOfOrganization,
  };
};

const getFreeTimeListOfOrganizationFail = (err) => {
  return {
    type: GET_FREE_TIME_LIST_OF_ORGANIZATION_FAIL,
    payload: err,
  };
};


export const getFreeTimeDetailOfOrganization = () => {
  return (dispatch) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo.jwt;
    axios({
      method: "GET",
      url: `http://localhost:8080/api/v1/schedule/get-all`,
      data: null,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(getFreeTimeDetailOfOrganizationSucess(res.data));
      })
      .catch((err) => {
        dispatch(getFreeTimeDetailOfOrganizationFail(err));
      });
  };
};

const getFreeTimeDetailOfOrganizationSucess = (detailFreeTimeOfOrganization) => {
  return {
    type: GET_FREE_TIME_DETAIL_OF_ORGANIZATION_SUCCESS,
    payload: detailFreeTimeOfOrganization,
  };
};

const getFreeTimeDetailOfOrganizationFail = (err) => {
  return {
    type: GET_FREE_TIME_DETAIL_OF_ORGANIZATION_FAIL,
    payload: err,
  };
};