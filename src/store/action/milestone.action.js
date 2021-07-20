import axios from "axios";
import {
  authorizationAccount,
  checkIdUser,
  sessionTimeOut,
  showMessage,
} from "../../assets/helper/helper";
import message from "../../assets/message/text";
import {
  GET_LIST_MILESTONE_FAILED,
  GET_LIST_MILESTONE_SUCCESS,
} from "../constants/milestone.const";
import { startLoading, stopLoading } from "./loading.action";

export const getListMilestone = (idOrg) => {
  return (dispatch) => {
    dispatch(startLoading());
    axios({
      method: "GET",
      url: `http://localhost:8080/api/v1/auth/get-milestoneByOrganizationId/${idOrg}`,
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(getListMilestoneSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getListMilestoneFailed(err));
        dispatch(stopLoading());
      });
  };
};

export const deleteMilestoneById = (id, history) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: "PUT",
      url: `http://localhost:8080/api/v1/delete-milestone?id=${id}`,
      data: null,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          showMessage("success", "Xóa thành tựu thành công");
          dispatch(getListMilestone(checkIdUser()));
        }
      })
      .catch((err) => {
        sessionTimeOut(err, history);
      });
  };
};

const getListMilestoneSuccess = (listMilestone) => {
  return {
    type: GET_LIST_MILESTONE_SUCCESS,
    payload: listMilestone,
  };
};

const getListMilestoneFailed = (err) => {
  return {
    type: GET_LIST_MILESTONE_FAILED,
    payload: err,
  };
};
