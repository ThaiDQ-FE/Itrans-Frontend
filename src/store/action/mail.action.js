import axios from "axios";
import {
  authorizationAccount,
  sessionTimeOut,
  showMessage,
} from "../../assets/helper/helper";
import { defaultUrlAPI } from "../../configs/url";
import { getListAccountNotConfirm } from "./user.action";

export const sendMailHTML = (content, title, gmail, history) => {
  return (dispatch) => {
    axios({
      method: "POST",
      url: defaultUrlAPI() + "send-mail/send-mail-html",
      data: {
        content: content,
        gmail: gmail,
        title: title,
      },
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          showMessage("success", "Duyệt tài khoản thành công");
          dispatch(getListAccountNotConfirm());
          setTimeout(() => {
            history.push("/admin/quan-ly-tai-khoan");
          }, 2000);
        } else {
          showMessage("error", "Duyệt tài khoản thất bại");
        }
      })
      .catch((err) => {
        sessionTimeOut(err, history);
      });
  };
};
