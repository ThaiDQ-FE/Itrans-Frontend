import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";
import message from "../../assets/message/text";
function Banner() {
  return (
    <div className="banner__wrapper">
      <div className="banner__container">
        <h1 className="banner__h1">Kết nối nhà đầu tư</h1>
        <h1 className="banner__h1">và tổ chức</h1>
        <p className="banner__sologan">{message.BANNER_SOLOGAN}</p>
        <div className="banner__button">
          <ul className="banner__ul">
            <li className="banner__li">
              <NavLink
                activeClassName="active-nav-link"
                className="banner__fund"
                to="/"
                exact={true}
              >
                Nhà đầu tư
              </NavLink>
            </li>
            <li className="banner__li">
              <NavLink
                activeClassName="active-nav-link"
                className="banner__startup"
                to="/"
                exact={true}
              >
                Doanh nghiệp
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Banner;