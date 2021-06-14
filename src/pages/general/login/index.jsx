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
function Login() {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("x");
    console.log(user);
  };
  return (
    <div className="login__wrapper">
      <div className="login__container">
        <HeaderGeneral />
        <div className="login__form">
          <div className="login__title">Đăng nhập</div>
          <MuiThemeProvider theme={themeMenu}>
            <form onSubmit={handleSubmit}>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Gmail"
                  variant="outlined"
                  type="text"
                  className="login__gmail"
                  onChange={handleChange}
                  name="gmail"
                />
              </div>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Mật khẩu"
                  variant="outlined"
                  type="password"
                  className="login__matKhau"
                  onChange={handleChange}
                  name="password"
                />
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
