import axios from "axios";
import {
  authorizationAccount,
  checkEmailUser,
  sessionTimeOut,
  showMessage,
} from "../../assets/helper/helper";
import message from "../../assets/message/text";
import {
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

export const deleteIntroduceById = (id, history) => {
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
        sessionTimeOut(err, history);
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
