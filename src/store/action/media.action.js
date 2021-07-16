import axios from "axios";
import {
  authorizationAccount,
  checkEmailUser,
  showMessage,
} from "../../assets/helper/helper";
import message from "../../assets/message/text";
import {
  GET_LIST_MEDIA_BY_ID_FAILED,
  GET_LIST_MEDIA_BY_ID_SUCCESS,
} from "../constants/media.const";
import { startLoading, stopLoading } from "./loading.action";

export const getListMediaById = (gmail) => {
  return (dispatch) => {
    dispatch(startLoading());
    axios({
      method: "GET",
      url: `http://localhost:8080/api/v1/auth/media/${gmail}`,
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(getListMediaByIdSuccess(res.data));
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getListMediaByIdFailed(err));
      });
  };
};

export const deleteMedia = (id) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: "PUT",
      url: `http://localhost:8080/api/v1/media?idMedia=${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          showMessage("success", "Xóa hình ảnh - video thành công");
          dispatch(getListMediaById(checkEmailUser()));
        } else {
          showMessage("error", "Xóa hình ảnh - video thất bại");
        }
      })
      .catch((err) => {
        showMessage("error", message.CACTH_ERROR);
      });
  };
};

const getListMediaByIdSuccess = (listMedia) => {
  return {
    type: GET_LIST_MEDIA_BY_ID_SUCCESS,
    payload: listMedia,
  };
};

const getListMediaByIdFailed = (err) => {
  return {
    type: GET_LIST_MEDIA_BY_ID_FAILED,
    payload: err,
  };
};
