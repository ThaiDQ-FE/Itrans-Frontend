import axios from "axios";
import Swal from "sweetalert2";
import {
  GET_FREE_TIME_LIST_FAILED,
  GET_FREE_TIME_LIST_SUCCESS,
} from "../constants/freeTime.const";
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const token = userInfo.jwt;
export const postFreeTime = (freeTime, investor) => {
  return (dispatch) => {
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
    axios({
      method: "GET",
      url: `http://localhost:8080/api/v1/free-time?idInvestor=${investor}&month=${month}`,
      data: null,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        dispatch(getFreeTimeListSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
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
