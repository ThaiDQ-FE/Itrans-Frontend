import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./styles.scss";
import logo from "../../assets/images/logo-grey.png";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Images from "../../assets/images/images";
import { checkRoleUser, getLocalStorage } from "../../assets/helper/helper";
import { useSelector } from "react-redux";
import ModalAccountHome from "./modal-account";
function Header({ history }) {
  const { detailCompany } = useSelector((state) => state.detailCompany);
  const [check, setCheck] = useState(false);
  const [avataError, setAvataError] = useState("");
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [openMenu, setOpenMenu] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenMenu = (event) => {
    setOpenMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpenMenu(null);
  };
  const handleCloseModal = () => {
    setOpenEdit(false);
    setCheck(false);
    setAvataError("");
  };
  const handleOpenModal = () => {
    setOpenMenu(null);
    setOpenEdit(true);
  };
  const handleLogoutAccount = () => {
    setOpenMenu(null);
    localStorage.removeItem("userInfo");
    history.push("/dang-nhap");
  };
  const renderTabs = () => {
    const userLogin = getLocalStorage("userInfo");
    if (userLogin !== null) {
      if (userLogin.role === "INVESTOR") {
        return (
          <>
            <li className="header__features__li">
              <NavLink
                activeClassName="active-nav-link-header-features"
                className="header__trangchu"
                to="/"
                exact={true}
              >
                Trang chủ
              </NavLink>
            </li>
            <li className="header__features__li">
              <NavLink
                activeClassName="active-nav-link-header-features"
                className="header__vgv"
                to="/to-chuc"
                exact={true}
              >
                Tổ chức
              </NavLink>
            </li>
            <li className="header__features__li">
              <NavLink
                activeClassName="active-nav-link-header-features"
                className="header__vgv"
                to="/vong-goi-von"
                exact={true}
              >
                Vòng gọi vốn
              </NavLink>
            </li>
          </>
        );
      } else if (userLogin.role === "ORGANIZATION") {
        return (
          <>
            <li className="header__features__li">
              <NavLink
                activeClassName="active-nav-link-header-features"
                className="header__trangchu"
                to="/"
                exact={true}
              >
                Trang chủ
              </NavLink>
            </li>
            <li className="header__features__li">
              <NavLink
                activeClassName="active-nav-link-header-features"
                className="header__vgv"
                to="/nha-dau-tu"
                exact={true}
              >
                Nhà đầu tư
              </NavLink>
            </li>
          </>
        );
      }
    }
  };

  return (
    <div
      className={`header__container${
        getLocalStorage("userInfo") === null || checkRoleUser() === "ADMIN"
          ? " class_disable"
          : ""
      }`}
    >
      <div className="header__logo">
        <NavLink
          activeClassName="active-nav-link"
          className="header__navlink__dangky"
          to="/"
          exact={true}
        >
          <img src={logo} alt="logo" />
        </NavLink>
      </div>
      <div
        className={`header__features${
          checkRoleUser() === "ORGANIZATION" ? " header__featuresRole" : ""
        }`}
      >
        <ul className="header__features__ul">{renderTabs()}</ul>
      </div>
      <div className="header__login">
        {user !== null ? (
          <div className="header__logined" onClick={handleOpenMenu}>
            <img
              src={
                detailCompany.logo === ""
                  ? Images.USER_AVATA
                  : detailCompany.logo
              }
              alt=""
            />
            <span>{user !== null ? user.gmail : ""}</span>
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
      <Menu
        id="simple-menu"
        anchorEl={openMenu}
        keepMounted
        open={Boolean(openMenu)}
        onClose={handleCloseMenu}
        className="menu__navbar"
      >
        <MenuItem>
          <div className="header__menuAccount" onClick={handleOpenModal}>
            <img src={Images.SETTING_COLOR} alt="" />
            <span>Cài đặt tài khoản</span>
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
              <img src={Images.BUILDINGS} alt="" />
              <span>Tổ chức của tôi</span>
            </div>
          </NavLink>
        </MenuItem>
        <hr className="header__hr" />
        <MenuItem onClick={handleLogoutAccount}>
          <div className="header__menuLogout">
            <img src={Images.LOGOUT} alt="" />
            <span>Thoát</span>
          </div>
        </MenuItem>
      </Menu>
      <ModalAccountHome
        openEdit={openEdit}
        close={handleCloseModal}
        data={detailCompany}
        check={check}
        setCheck={setCheck}
        avataError={avataError}
        setAvataError={setAvataError}
      />
    </div>
  );
}
export default withRouter(Header);
