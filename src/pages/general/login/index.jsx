import React, { useState } from "react";
import "./styles.scss";
import logo from "../../../assets/images/logo-navy.png";
import {
  Button,
  createMuiTheme,
  MuiThemeProvider,
  TextField,
} from "@material-ui/core";
import HeaderGeneral from "../../../components/header-general";
import { useDispatch } from "react-redux";
import { postCheckLogin } from "../../../store/action/user.action";
import { useHistory } from "react-router";
import { validGmail } from "../../../configs/regex";
import Messages from "../../../assets/message/text";
import Images from "../../../assets/images/images";
function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const themeMenu = createMuiTheme({
    overrides: {
      MuiOutlinedInput: {
        notchedOutline: {
          top: 0,
          borderColor: "#FF8412 !important",
        },
      },
      MuiInputLabel: {
        outlined: {
          backgroundColor: "#ffffff",
        },
      },
      MuiButton: {
        root: {
          padding: "6px 28px",
        },
        containedPrimary: {
          backgroundColor: "#FF7D04",
          "&:hover": {
            backgroundColor: "#ff7b00",
          },
        },
      },
    },
  });
  const [gmailErr, setGmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [user, setUser] = useState({
    gmail: "",
    password: "",
  });
  const handleChange = (event) => {
    const { value, name } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleGmailFocus = () => {};
  const handleGmailBlur = () => {
    if (user.gmail === "") {
      setGmailErr(Messages.GMAIL_NULL);
    } else if (validGmail.test(user.gmail) === false) {
      setGmailErr(Messages.GMAIL_REG);
    } else {
      setGmailErr("");
    }
  };
  const handlePasswordBlur = () => {
    if (user.password === "") {
      setPasswordErr(Messages.PASSWORD_NULL);
    } else {
      setPasswordErr("");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleGmailBlur();
    handlePasswordBlur();
    if (
      user.gmail !== "" &&
      user.password !== "" &&
      gmailErr === "" &&
      passwordErr === ""
    ) {
      dispatch(postCheckLogin(user.gmail, user.password, history));
    }
  };
  return (
    <div className="login__wrapper">
      <div className="login__container">
        <HeaderGeneral />
        <div className="login__form">
          <div className="login__title">Đăng nhập</div>
          <MuiThemeProvider theme={themeMenu}>
            <form onSubmit={handleSubmit}>
              <div className="wrapper__gmail">
                <TextField
                  id="outlined-basic"
                  label="Gmail"
                  variant="outlined"
                  type="gmail"
                  className="login__gmail"
                  onChange={handleChange}
                  onFocus={handleGmailFocus}
                  onBlur={handleGmailBlur}
                  name="gmail"
                />
                {gmailErr !== "" ? <small>{gmailErr}</small> : ""}
              </div>
              <div className="wrapper__password">
                <TextField
                  id="outlined-basic"
                  label="Mật khẩu"
                  variant="outlined"
                  type="password"
                  className="login__matKhau"
                  onChange={handleChange}
                  onBlur={handlePasswordBlur}
                  name="password"
                />
                {passwordErr !== "" ? <small>{passwordErr}</small> : ""}
              </div>

              <div className="login__remember">
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  defaultValue="Bike"
                />
                <label htmlFor="vehicle1"> Ghi nhớ mật khẩu</label>
              </div>
              <div className="login__button">
                <Button variant="contained" color="primary" type="submit">
                  Đăng nhập
                </Button>
              </div>
            </form>
          </MuiThemeProvider>
        </div>
      </div>
    </div>
  );
}
export default Login;
