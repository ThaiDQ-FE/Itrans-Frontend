import axios from "axios";
import {
  CHECK_LOGIN_FAILED,
  CHECK_LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
} from "../constants/user.const";
import Swal from "sweetalert2";
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
