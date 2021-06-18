import React, { useState } from "react";
import { NavLink , withRouter } from "react-router-dom";
import "./styles.scss";
import logo from "../../assets/images/logo-grey.png";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Images from "../../assets/images/images";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
function Header({history}) {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [openMenu, setOpenMenu] = useState(null);
  const themeMenu = createMuiTheme({
    overrides: {
      MuiPopover: {
        paper: {
          top: `${8}% !important`,
          left: "unset !important",
          right: `${3}%`,
        },
      },
    },
  });
  const handleOpenMenu = (event) => {
    setOpenMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpenMenu(null);
  };
  const handleLogoutAccount = () => {
    setOpenMenu(null);
    localStorage.removeItem("userInfo");
    history.push("/dang-nhap")
  };

  return (
    <div className="header__container">
      <div className="header__logo">
        <NavLink
          activeClassName="active-nav-link"
          className="header__navlink__dangky"
          to="/"
          exact={true}
        >
          <img src={logo} />
        </NavLink>
      </div>
      <div className="header__features">
        <ul className="header__features__ul">
          <li className="header__features__li">Trang chủ</li>
          <li className="header__features__li">Nhà đầu tư</li>
          <li className="header__features__li">Doanh nghiệp</li>
          <li className="header__features__li">Vòng gọi vốn</li>
        </ul>
      </div>
      <div className="header__login">
        {user !== null ? (
          <div className="header__logined">
            <img src={Images.USER_AVATA} alt="" onClick={handleOpenMenu} />
          </div>
        ) : (
          <ul className="header__login__ul">
            <li className="header__login__li">
              <NavLink
                activeClassName="active-nav-link"
                className="header__navlink__dangky"
                to="/dang-ky"
                exact={true}
              >
                Đăng ký
              </NavLink>
            </li>
            <li className="header__login__li">
              <NavLink
                activeClassName="active-nav-link"
                className="header__navlink__dangnhap"
                to="/dang-nhap"
                exact={true}
              >
                Đăng nhập
              </NavLink>
            </li>
          </ul>
        )}
      </div>
      <MuiThemeProvider theme={themeMenu}>
        <Menu
          id="simple-menu"
          anchorEl={openMenu}
          keepMounted
          open={Boolean(openMenu)}
          onClose={handleCloseMenu}
        >
          <MenuItem>
            <div className="header__menuAvata">
              <img src={Images.USER_AVATA} alt="" />
              <span>{user !== null ? user.gmail : ""}</span>
            </div>
          </MenuItem>
          <hr className="header__hr" />
          <MenuItem>
            <NavLink
              activeClassName="active-nav-link"
              className="header__navlink__quanLyTaiKhoan"
              to="/quan-ly-tai-khoan"
              exact={false}
            >
              <div className="header__menuAccount">
                <img src={Images.SETTING} alt="" />
                <span>Quản lý tài khoản</span>
              </div>
            </NavLink>
          </MenuItem>
          <hr className="header__hr" />
          <MenuItem>
            <NavLink
              activeClassName="active-nav-link"
              className="header__navlink__quanLyThoiGian"
              to="/quan-ly-thoi-gian"
              exact={false}
            >
              <div className="header__menuTime">
                <img src={Images.TIMETABLE} alt="" />
                <span>Quản lý thời gian</span>
              </div>
            </NavLink>
          </MenuItem>
          <hr className="header__hr" />
          <MenuItem>
            <div className="header__menuCapital">
              <img src={Images.CALL_CAPITAL} alt="" />
              <span>Quản lý vòng gọi vốn</span>
            </div>
          </MenuItem>
          <hr className="header__hr" />
          <MenuItem onClick={handleLogoutAccount}>
            <div className="header__menuLogout">
              <img src={Images.LOGOUT} alt="" />
              <span>Thoát</span>
            </div>
          </MenuItem>
        </Menu>
      </MuiThemeProvider>
    </div>
  );
}
export default withRouter(Header);
