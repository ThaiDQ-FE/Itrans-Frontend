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
          backgroundColor: "#e8f7ff",
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
  return (
    <div className="fiato__wrapper">
      <div className="fiato__container">
        <MuiThemeProvider theme={themeMenu}>
          <form className="fiato__form">
            <div className="fiato__box one">
              <TextField
                id="outlined-basic"
                label="Tên doanh nghiệp"
                variant="outlined"
                type="text"
                className="fiato__tenDoanhNghiep"
              />
            </div>
            <div className="fiato__box two">
              <FormControl variant="outlined" className="fiato__formControlTwo">
                <InputLabel id="demo-simple-select-outlined-label">
                  Lĩnh vực hoạt động
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Lĩnh vực hoạt động"
                >
                  <MenuItem value="">OTP</MenuItem>
                  <MenuItem value="">Gmail</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="fiato__box three">
              <FormControl
                variant="outlined"
                className="fiato__formControlThree"
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Giai đoạn phát triển
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Giai đoạn phát triển"
                >
                  <MenuItem value="otp">OTP</MenuItem>
                  <MenuItem value="gmail">Gmail</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="fiato__box four">
              <TextField
                id="outlined-basic"
                label="Năm thành lặp"
                variant="outlined"
                type="text"
                className="fiato__namThanhLap"
              />
            </div>
            <div className="fiato__box five">
              <FormControl
                variant="outlined"
                className="fiato__formControlFive"
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Khu vực hoạt động
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Khu vực hoạt động"
                >
                  <MenuItem value="otp">OTP</MenuItem>
                  <MenuItem value="gmail">Gmail</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="fiato__box six">
              <TextField
                id="outlined-basic"
                label="Link website"
                variant="outlined"
                type="text"
                className="fiato__linkWebsite"
              />
            </div>
            <div className="fiato__box seven">
              <FormControl
                variant="outlined"
                className="fiato__formControlSeven"
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Mô hình kinh doanh
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Mô hình kinh doanh"
                >
                  <MenuItem value="otp">OTP</MenuItem>
                  <MenuItem value="gmail">Gmail</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="fiato__box eight">
              <FormControl
                variant="outlined"
                className="fiato__formControlSeven"
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Loại hình kinh doanh
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Loại hình kinh doanh"
                >
                  <MenuItem value="otp">OTP</MenuItem>
                  <MenuItem value="gmail">Gmail</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="fiato__box nine">
              <div className="fiato__logo">
                <input className="fiato__file" type="file" id="file" />
                <label htmlFor="file" style={{ cursor: "pointer" }}>
                  <img
                    src="https://i.ibb.co/jZmmMRz/camera.png"
                    alt=""
                    className="fiato__camera"
                  />
                </label>
              </div>
            </div>
            <div className="fiato__box ten">
              <TextField
                id="outlined-basic"
                label="Trang giới thiệu"
                variant="outlined"
                type="text"
                className="fiato__trangGioiThieu"
              />
            </div>
            <div className="fiato__button">
              <Button
                onClick={props.handleNext}
                variant="contained"
                color="primary"
              >
                Tiếp
              </Button>
            </div>
          </form>
        </MuiThemeProvider>
      </div>
    </div>
  );
}
export default FormInformationAboutTheOrganization;
