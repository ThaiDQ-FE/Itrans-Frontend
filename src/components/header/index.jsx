import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";
import logo from "../../assets/images/logo-grey.png";
function Header() {
  return (
    <div className="header__container">
      <div className="header__logo">
        <img src={logo} />
      </div>
      <div className="header__features">
        <ul className="header__features__ul">
          <li className="header__features__li">Home</li>
          <li className="header__features__li">Fund</li>
          <li className="header__features__li">Startup</li>
        </ul>
      </div>
      <div className="header__login">
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
              to="/"
              exact={true}
            >
              Đăng nhập
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Header;
