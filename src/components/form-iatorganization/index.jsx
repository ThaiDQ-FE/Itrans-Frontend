import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import React from "react";
import "./styles.scss";
import Messages from "../../assets/message/text";
import Images from "../../assets/images/images";
function FormInformationAboutTheOrganization(props) {
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
    },
  });
  return (
    <div className="fiato__wrapper">
      <div className="fiato__container">
        <h3>{Messages.ORGANIZATION_STEP_2}</h3>
        <MuiThemeProvider theme={themeMenu}>
          <form className="fiato__form">
            <div className="fiato__box one">
              <TextField
                id="outlined-basic"
                label={Messages.TenDoanhNghiep}
                variant="outlined"
                type="text"
                className="fiato__tenDoanhNghiep"
              />
            </div>
            <div className="fiato__box two">
              <FormControl variant="outlined" className="fiato__formControlTwo">
                <InputLabel id="demo-simple-select-outlined-label">
                  {Messages.LinhVucKinhDoanh}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label={Messages.LinhVucKinhDoanh}
                >
                  <MenuItem value="">OTP</MenuItem>
                  <MenuItem value="">Gmail</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="fiato__box three">
              <FormControl variant="outlined" className="fiato__formControlTwo">
                <InputLabel id="demo-simple-select-outlined-label">
                  {Messages.GiaiDoanPhatTrien}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label={Messages.GiaiDoanPhatTrien}
                >
                  <MenuItem value="">OTP</MenuItem>
                  <MenuItem value="">Gmail</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="fiato__box four">
              <TextField
                id="outlined-basic"
                label={Messages.NamThanhLap}
                variant="outlined"
                type="date"
                className="fiato__namThanhLap"
              />
            </div>
            <div className="fiato__box five">
              <TextField
                id="outlined-basic"
                label={Messages.EmailLienLac}
                variant="outlined"
                type="text"
                className="fiato__emailLienLac"
              />
            </div>
            <div className="fiato__box six">
              <FormControl variant="outlined" className="fiato__formControlTwo">
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
            <div className="fiato__box seven">
              <ul>
                <li>dsd</li>
                <li>ffff</li>
                <li>aaaa</li>
              </ul>
            </div>
            <div className="fiato__box eight">
              <TextField
                id="outlined-basic"
                label={Messages.LinkWebsite}
                variant="outlined"
                type="text"
                className="fiato__linkWebsite"
              />
            </div>
            <div className="fiato__box nine">
              <TextField
                id="outlined-basic"
                label={Messages.SoThanhVien}
                variant="outlined"
                type="text"
                className="fiato__soThanhVien"
              />
            </div>
            <div className="fiato__box ten">
              <div className="fiato__logo">
                <input className="fiato__file" type="file" id="file" />
                <label className="fiato__label" htmlFor="file">
                  <img
                    src="https://i.ibb.co/jZmmMRz/camera.png"
                    alt=""
                    className="fiato__camera"
                  />
                </label>
              </div>
            </div>
            <div className="fiato__box eleven">
              <TextField
                id="outlined-basic"
                label={Messages.MoTaVeDoanhNghiep}
                variant="outlined"
                type="text"
                multiline
                rows={2}
                rowsMax={2}
                className="fiato__moTaVeDoanhNghiep"
              />
            </div>
          </form>
        </MuiThemeProvider>
        <div className="fiato__button">
          <div className="fiato__buttonLeft" onClick={props.handleBack}>
            <img src={Images.RIGHT_ARROWS} alt="" />
            <span>Quay lại</span>
          </div>
          <div className="fiato__buttonRight" onClick={props.handleNext}>
            <img src={Images.RIGHT_ARROWS} alt="" />
            <span>Tiếp theo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FormInformationAboutTheOrganization;
