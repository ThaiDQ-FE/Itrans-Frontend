import { Button, TextField } from "@material-ui/core";
import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./styles.scss";
import Messages from "../../assets/message/text";
import Images from "../../assets/images/images";
function FormMember(props) {
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
      MuiTextField: {
        root: {
          width: `${100}% !important`,
          backgroundColor: "#ffffff",
        },
      },
      MuiFormLabel: {
        filled: {
          backgroundColor: "#e8f7ff !important",
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
  const themeButton = createMuiTheme({
    overrides: {
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
  return (
    <div className="fm__wrapper">
      <div className="fm__container">
        <h3>{Messages.ORGANIZATION_STEP_3}</h3>
        <div className="fm__box">
          <MuiThemeProvider theme={themeMenu}>
            <div className="fm__formLeft">
              <form className="fm__form">
                <div className="fm__avata">
                  <img
                    src={Images.USER_AVATA}
                    alt=""
                    className="fm__userAvata"
                  />
                  <input className="fm__file" type="file" id="file" />
                  <label htmlFor="file" className="fm__span">
                    <img
                      src="https://i.ibb.co/jZmmMRz/camera.png"
                      alt=""
                      className="fm__camera"
                    />
                  </label>
                </div>
                <div className="fm__displayGrid">
                  <div className="fm__item hoVaTen">
                    <TextField
                      id="outlined-basic"
                      label="Họ và Tên"
                      variant="outlined"
                      type="text"
                      className="fm__hoVaTen"
                    />
                  </div>
                  <div className="fm__item chucVu">
                    <TextField
                      id="outlined-basic"
                      label="Chức vụ"
                      variant="outlined"
                      type="text"
                      className="fm__chucVu"
                    />
                  </div>
                  <div className="fm__item gmail">
                    <TextField
                      id="outlined-basic"
                      label="Gmail"
                      variant="outlined"
                      type="text"
                      className="fm__gmail"
                    />
                  </div>
                  <div className="fm__item linkCV">
                    <TextField
                      id="outlined-basic"
                      label="Link CV"
                      variant="outlined"
                      type="text"
                      className="fm__linkCV"
                    />
                  </div>

                  <div className="fm__item buttonAdd">
                    <Button variant="contained" color="primary">
                      Thêm
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </MuiThemeProvider>
          <div className="fm__formMiddle"></div>
          <div className="fm__formRight">
            <div className="fm__member">Hãy thêm thành viên(nếu có).</div>
            <div className="fm__buttonDone">
              <MuiThemeProvider theme={themeButton}>
                <Button variant="contained" color="primary">
                  Hoàn Tất
                </Button>
              </MuiThemeProvider>
            </div>
          </div>
        </div>

        <div className="fm__button" onClick={props.handleBack}>
          <img src={Images.RIGHT_ARROWS} alt="" />
          <span>Quay lại</span>
        </div>
      </div>
    </div>
  );
}
export default FormMember;
