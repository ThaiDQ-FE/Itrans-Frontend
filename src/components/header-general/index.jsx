import React from "react";
import "./styles.scss";
import Images from "../../assets/images/images";
import { NavLink } from "react-router-dom";
function HeaderGeneral() {
  return (
    <div className="headerGeneral__wrapper">
      <div className="headerGeneral__logo">
        <NavLink to="/" className="headerGeneral__link">
          <img src={Images.LOGO_GREY} alt="" />
        </NavLink>
      </div>
      <div className="headerGeneral__login">
        <NavLink to="/dang-nhap">Đăng nhập</NavLink>
      </div>
    </div>
  );
}
export default HeaderGeneral;
