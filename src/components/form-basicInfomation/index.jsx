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
import Messages from "../../assets/message/text";
function FormBasicInformation(props) {
  console.log(props.step);
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
      MuiTextField: {
        root: {
          width: `${100}% !important`,
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
    <div className="fbi__wrapper">
      <div className="fbi__container">
        <h3>{Messages.GENERAL_STEP_1}</h3>
        <MuiThemeProvider theme={themeMenu}>
          <form className="fbi__form">
            <div className="fib__box item__a">
              <TextField
                id="outlined-basic"
                label="Gmail"
                variant="outlined"
                type="email"
                className="fbi__gmail"
              />
            </div>
            <div className="fib__box item__b">
              <TextField
                id="outlined-basic"
                label="Số điện thoại"
                variant="outlined"
                type="number"
                className="fbi__phone"
              />
            </div>
            <div className="fib__box item__c">
              <TextField
                id="outlined-basic"
                label="Mật khẩu"
                variant="outlined"
                type="passưord"
                className="fbi__password"
              />
            </div>
            <div className="fib__box item__d">
              <TextField
                id="outlined-basic"
                label="Nhập lại mật khẩu"
                variant="outlined"
                type="passưord"
                className="fbi__confirmPassword"
              />
            </div>
            <div className="fib__box item__e">
              <FormControl variant="outlined" className="fbi__formControl">
                <InputLabel id="demo-simple-select-outlined-label">
                  Chọn loại xác thực
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Age"
                >
                  <MenuItem value="">OTP</MenuItem>
                  <MenuItem value="">Gmail</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="fib__box item__f">
              <TextField
                id="outlined-basic"
                label="Mã xác thực"
                variant="outlined"
                type="text"
                className="fbi__maXacThuc"
              />
            </div>
            <div className="fbi__button item__g">
              <Button
                onClick={props.handleNext}
                variant="contained"
                color="primary"
              >
                Tiếp Tục
              </Button>
            </div>
          </form>
        </MuiThemeProvider>
      </div>
    </div>
  );
}
export default FormBasicInformation;
