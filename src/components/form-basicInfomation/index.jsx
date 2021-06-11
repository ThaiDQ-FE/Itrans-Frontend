import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./styles.scss";
function FormBasicInformation(props) {
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
    <div className="fbi__wrapper">
      <div className="fbi__container">
        <MuiThemeProvider theme={themeMenu}>
          <form className="fbi__form">
            <div className="fbi__gmailPhone">
              <TextField
                id="outlined-basic"
                label="Gmail"
                variant="outlined"
                type="email"
                className="fbi__gmail"
              />
              <TextField
                id="outlined-basic"
                label="Số điện thoại"
                variant="outlined"
                type="number"
                className="fbi__phone"
              />
            </div>
            <TextField
              id="outlined-basic"
              label="Mật khẩu"
              variant="outlined"
              type="passưord"
              className="fbi__password"
            />
            <TextField
              id="outlined-basic"
              label="Nhập lại mật khẩu"
              variant="outlined"
              type="passưord"
              className="fbi__confirmPassword"
            />
            <div className="fbi__xacThucMa">
              <FormControl variant="outlined" className="fbi__formControl">
                <InputLabel id="demo-simple-select-outlined-label">
                  Chọn loại xác thực
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Age"
                >
                  <MenuItem value="otp">OTP</MenuItem>
                  <MenuItem value="gmail">Gmail</MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="outlined-basic"
                label="Mã xác thực"
                variant="outlined"
                type="text"
                className="fbi__maXacThuc"
              />
            </div>
            <div className="fbi__button">
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
export default FormBasicInformation;
