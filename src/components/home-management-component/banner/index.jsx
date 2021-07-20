import React from "react";
import "./styles.scss";
import Typed from "react-typed";
function Banner() {
  const list = [
    `“Bạn phải trở nên quyết liệt với một ý tưởng, một vấn đề, hoặc một sai lầm mà bạn muốn biến nó thành đúng. Nếu bạn không đủ đam mê ngay từ đầu, bạn sẽ không bao giờ đi được đến cuối.”-Steve Jobs`,
    `“Doanh nhân chúng tôi là những kẻ cô độc, những kẻ lang thang, những kẻ gây rối. Thành công chỉ đơn giản là vấn đề tìm kiếm và bao quanh bản thân chúng ta bởi những người thông minh và cởi mở, những người có thể đưa sự điên rồ của chúng ta vào để sử dụng tốt.”-Anita Roddick`,
  ];
  return (
    <div className="banner__wrapper">
      <div className="banner__container">
        <h1 className="banner__h1">Kết nối nhà đầu tư</h1>
        <h1 className="banner__h1">và tổ chức</h1>
        <p className="banner__sologan">
          <Typed strings={list} typeSpeed={30} backSpeed={8} loop />
        </p>
        {/* <div className="banner__button">
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
        </div> */}
      </div>
    </div>
  );
}
export default Banner;
