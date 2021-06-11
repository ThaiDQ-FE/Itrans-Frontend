import { TextField } from "@material-ui/core";
import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./styles.scss";
function FormMember() {
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
    },
  });
  return (
    <div className="fm__wrapper">
      <div className="fm__container">
        <MuiThemeProvider theme={themeMenu}>
          <div className="fm__formLeft">
            <form className="fm__form">
              <div className="fm__avata"></div>
              <TextField
                id="outlined-basic"
                label="Họ và Tên"
                variant="outlined"
                type="text"
                className="fm__hoVaTen"
              />
              <TextField
                id="outlined-basic"
                label="Chức vụ"
                variant="outlined"
                type="text"
                className="fm__chucVu"
              />
              <div className="fm__group">
                <TextField
                  id="outlined-basic"
                  label="Năm sinh"
                  variant="outlined"
                  type="text"
                  className="fm__namSinh"
                />
                <TextField
                  id="outlined-basic"
                  label="Số điện thoại"
                  variant="outlined"
                  type="text"
                  className="fm__soDienThoai"
                />
              </div>
              <TextField
                id="outlined-basic"
                label="Link CV"
                variant="outlined"
                type="text"
                className="fm__linkCV"
              />
              <TextField
                id="outlined-basic"
                label="Gmail"
                variant="outlined"
                type="text"
                className="fm__gmail"
              />
            </form>
          </div>
        </MuiThemeProvider>
        <div className="fm__formRight">dsd</div>
      </div>
    </div>
  );
}
export default FormMember;
