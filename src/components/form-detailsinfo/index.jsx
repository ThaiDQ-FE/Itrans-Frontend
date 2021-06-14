import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React from "react";
import Images from "../../assets/images/images";
import Messages from "../../assets/message/text";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./styles.scss";
function FormDetailsInformation(props) {
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
      MuiInputBase: {
        formControl: {
          backgroundColor: "#ffffff",
        },
      },
      MuiFormControl: {
        root: {
          width: `${100}% !important`,
        },
      },
    },
  });
  return (
    <div className="fdi__wrapper">
      <div className="fdi__container">
        <h3>{Messages.INVESTOR_STEP_2}</h3>
        <MuiThemeProvider theme={themeMenu}>
          <form className="fdi__form">
            <div className="fdi__formLeft">
              <div className="fdi__avata">
                <div className="fdi__avataWrapper">
                  <input className="fdi__file" type="file" id="file" />
                  <label className="fdi__label" htmlFor="file">
                    <img
                      src="https://i.ibb.co/jZmmMRz/camera.png"
                      alt=""
                      className="fdi__camera"
                    />
                  </label>
                  <img src={Images.USER_AVATA} alt="" />
                </div>
              </div>
              <div className="fdi__formLeftGird">
                <div className="fdi__box one">
                  <TextField
                    id="outlined-basic"
                    label={Messages.HoVaTen}
                    variant="outlined"
                    type="text"
                    className="fiato__hoVaTen"
                  />
                </div>
                <div className="fdi__box two">
                  <TextField
                    id="outlined-basic"
                    label={Messages.ChucVu}
                    variant="outlined"
                    type="text"
                    className="fiato__chucVu"
                  />
                </div>
                <div className="fdi__box three">
                  <TextField
                    id="outlined-basic"
                    label={Messages.NamSinh}
                    variant="outlined"
                    type="date"
                    className="fiato__namSinh"
                  />
                </div>
                <div className="fdi__box four">
                  <TextField
                    id="outlined-basic"
                    label={Messages.SoDienThoai}
                    variant="outlined"
                    type="text"
                    className="fiato__soDienThoai"
                  />
                </div>
                <div className="fdi__box five">
                  <TextField
                    id="outlined-basic"
                    label={Messages.LinkCV}
                    variant="outlined"
                    type="text"
                    className="fiato__linkCV"
                  />
                </div>
              </div>
            </div>
            <div className="fdi__formMiddle"></div>
            <div className="fdi__formRight">
              <div className="fdi__avata">
                <div className="fdi__avataWrapper">
                  <input className="fdi__file" type="file" id="file" />
                  <label className="fdi__label" htmlFor="file">
                    <img
                      src="https://i.ibb.co/jZmmMRz/camera.png"
                      alt=""
                      className="fdi__camera"
                    />
                  </label>
                  <img src={Images.BUILDINGS} alt="" />
                </div>
              </div>
              <div className="fdi__formRightGird">
                <div className="fdi__box one">
                  <TextField
                    id="outlined-basic"
                    label={Messages.TenDoanhNghiep}
                    variant="outlined"
                    type="text"
                    className="fiato__tenDoanhNghiep"
                  />
                </div>
                <div className="fdi__box two">
                  <FormControl
                    variant="outlined"
                    className="fiato__formControlTwo"
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      {Messages.LinhVucHoatDong}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      label={Messages.LinhVucHoatDong}
                    >
                      <MenuItem value="">OTP</MenuItem>
                      <MenuItem value="">Gmail</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="fdi__box three">
                  <TextField
                    id="outlined-basic"
                    label={Messages.NamThanhLap}
                    variant="outlined"
                    type="date"
                    className="fiato__namThanhLap"
                  />
                </div>
                <div className="fdi__box four">
                  <FormControl
                    variant="outlined"
                    className="fiato__formControlTwo"
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      {Messages.KhuVucHoatDong}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      label={Messages.KhuVucHoatDong}
                    >
                      <MenuItem value="">OTP</MenuItem>
                      <MenuItem value="">Gmail</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="fdi__box five">
                  <TextField
                    id="outlined-basic"
                    label={Messages.MoTaVeNhaDauTu}
                    variant="outlined"
                    type="text"
                    multiline
                    rows={3}
                    rowsMax={3}
                    className="fiato__moTaVeNhaDauTu"
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="fdi__button">
            <div className="fdi__buttonBack" onClick={props.handleBack}>
              <img src={Images.RIGHT_ARROWS} alt="" />
              <span>Quay lại</span>
            </div>
            <div className="fdi__buttonDone">
              <Button variant="contained" color="primary">
                Hoàn Tất
              </Button>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    </div>
  );
}
export default FormDetailsInformation;
