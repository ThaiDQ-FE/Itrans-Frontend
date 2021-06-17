import React from "react";
import "./styles.scss";
import Images from "../../assets/images/images";
import Messages from "../../assets/message/text";
import data from "./data.json";
function UserFooter() {
  const renderData = () => {
    return data.map((data, index) => {
      return (
        <div className={"uf__" + index} key={index}>
          <p className="uf__title">{data.title}</p>
          <hr />
          <p>{data.text1}</p>
          <p>{data.text2}</p>
          <p>{data.text3}</p>
          <p>{data.text4}</p>
          <p>{data.text5}</p>
        </div>
      );
    });
  };
  return (
    <div className="uf__wrapper">
      <div className="uf__container">
        <div className="uf__one">
          <div className="uf__logo">
            <img src={Images.LOGO_GREY} alt="" />
          </div>
          <div className="uf__contact">
            <div className="uf__HCM">
              <span className="uf__truSo">Hồ Chí Minh:</span>
              <span className="uf__diaChi">{Messages.TRUSOHCM}</span>
            </div>
            <div className="uf__HN">
              <span className="uf__truSo">Hà Nội:</span>
              <span className="uf__diaChi">{Messages.TRUSOHN}</span>
            </div>
            <div className="uf__DN">
              <span className="uf__truSo">Đà Nẵng:</span>
              <span className="uf__diaChi">{Messages.TRUSODN}</span>
            </div>
          </div>
        </div>
        {renderData()}
      </div>
    </div>
  );
}
export default UserFooter;
