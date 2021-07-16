import React from "react";
import Images from "../../../assets/images/images";
import { NavLink, withRouter } from "react-router-dom";
import "./styles.scss";
import { getLocalStorage } from "../../../assets/helper/helper";
function NotAuth() {
  const content = () => {
    const local = getLocalStorage("userInfo");
    if (local === null) {
      return;
    } else {
      <div className="notAuth__container">
        <h2>Rất tiếc, bạn không bạn không đủ quyển để vào trang này</h2>
        <h5>Hãy chắc chắn rằng bạn đã đăng nhập đùng tài khoản</h5>
        <img src={Images.OOPSS} alt="error" />
        <h5>
          Nhấn{" "}
          <NavLink
            activeClassName="active-nav-link-header"
            className="notAuth__nav"
            to="/to-chuc"
            exact={true}
          >
            trở lại
          </NavLink>
          {" để quay lại trang chủ."}
        </h5>
      </div>;
    }
  };
  return <div className="notAuth__wrapper">{content()}</div>;
}

export default withRouter(NotAuth);
