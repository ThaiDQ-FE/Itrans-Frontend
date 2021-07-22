import axios from "axios";
import {
  CHECK_LOGIN_FAILED,
  CHECK_LOGIN_SUCCESS,
  GET_LIST_ACCOUNT_NOT_CONFIRM_FAILED,
  GET_LIST_ACCOUNT_NOT_CONFIRM_SUCCESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
} from "../constants/user.const";
import Swal from "sweetalert2";
import {
  authorizationAccount,
  sessionTimeOut,
  showMessage,
} from "../../assets/helper/helper";
import { defaultUrlAPI, defaultUrlAPIStringTemplate } from "../../configs/url";
import { startLoading, stopLoading } from "./loading.action";
import message from "../../assets/message/text";
import { sendMailHTML } from "./mail.action";
import {
  contentAcceptAccount,
  titleAcceptAccount,
} from "../../configs/sendMail";
export const postCheckLogin = (gmail, password, history) => {
  return (dispatch) => {
    axios({
      method: "POST",
      url: "http://localhost:8080/api/v1/auth/check-login",
      data: {
        gmail,
        password,
      },
    })
      .then((res) => {
        dispatch(postCheckLoginSuccess(res.data));
        if (res.data === true) {
          axios({
            method: "POST",
            url: "http://localhost:8080/api/v1/auth/authenticate",
            data: {
              gmail,
              password,
            },
          })
            .then((res) => {
              dispatch(postLoginSuccess(res.data));
              localStorage.setItem("userInfo", JSON.stringify(res.data));
              Swal.fire({
                icon: "success",
                title: "Đăng nhập thành công!",
                heightAuto: true,
                timerProgressBar: false,
                showConfirmButton: false,
                timer: 2000,
              });
              if (res.data.role === "ADMIN") {
                setTimeout(() => {
                  history.push("/admin");
                }, 2000);
              } else {
                setTimeout(() => {
                  history.push("/");
                }, 2000);
              }
            })
            .catch((err) => {
              dispatch(postLoginFailed(err));
            });
        } else {
          Swal.fire({
            icon: "error",
            title: "Đăng nhập thất bại!",
            heightAuto: true,
            timerProgressBar: false,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((err) => {
        dispatch(postCheckLoginFailed(err));
      });
  };
};

const postLoginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

const postLoginFailed = (err) => {
  return {
    type: LOGIN_FAILED,
    payload: err,
  };
};
const postCheckLoginSuccess = (check) => {
  return {
    type: CHECK_LOGIN_SUCCESS,
    payload: check,
  };
};

const postCheckLoginFailed = (err) => {
  return {
    type: CHECK_LOGIN_FAILED,
    payload: err,
  };
};

export const getListAccountNotConfirm = () => {
  return (dispatch) => {
    dispatch(startLoading());
    const token = authorizationAccount();
    axios({
      method: "GET",
      url: defaultUrlAPI() + "account-not-confirm",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        dispatch(stopLoading());
        if (res.status === 200) {
          dispatch(getListAccountNotConfirmSuccess(res.data));
        } else {
          dispatch(getListAccountNotConfirmFailed(res.data));
        }
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getListAccountNotConfirmFailed(err));
      });
  };
};

const getListAccountNotConfirmSuccess = (listAccount) => {
  return {
    type: GET_LIST_ACCOUNT_NOT_CONFIRM_SUCCESS,
    payload: listAccount,
  };
};

const getListAccountNotConfirmFailed = (err) => {
  return {
    type: GET_LIST_ACCOUNT_NOT_CONFIRM_FAILED,
    payload: err,
  };
};

export const putAccountToConfirm = (gmail, history, checkType) => {
  return (dispatch) => {
    const token = authorizationAccount();
    axios({
      method: "PUT",
      url: defaultUrlAPIStringTemplate() + `confirm-account?gmail=${gmail}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          if (checkType.investorType === null) {
            dispatch(
              sendMailHTML(
                contentAcceptAccount(
                  gmail,
                  "Đăng tải vòng gọi vốn",
                  " nhà đầu tư"
                ),
                titleAcceptAccount(),
                gmail,
                history
              )
            );
          } else {
            dispatch(
              sendMailHTML(
                contentAcceptAccount(
                  "Tham gia vào các vòng gọi vốn",
                  " tổ chức"
                ),
                titleAcceptAccount(),
                gmail,
                history
              )
            );
          }

          // showMessage("success", "Duyệt tài khoản thành công");
          // dispatch(getListAccountNotConfirm());
          // setTimeout(() => {
          //   history.push("/admin/quan-ly-tai-khoan");
          // }, 2000);
        } else {
          showMessage("error", "Duyệt tài khoản thất bại");
        }
      })
      .catch((err) => {
        sessionTimeOut(err, history);
      });
  };
};
