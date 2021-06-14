import React from "react";
import data from "./data.json";
import "./styles.scss";
function ListNewsItems() {
  const renderListNews = () => {
    return data.map((news, index) => {
      return (
        <div className="lni__container" key={index}>
          <div className="lni__logo">
            <img src={news.logo} alt="" />
          </div>
          <div className="lni__dateContent">
            <p className="lni__date">{news.date}</p>
            <p className="lni__content">{news.content}</p>
          </div>
        </div>
      );
    });
  };
  return <div className="lni__wrapper">{renderListNews()}</div>;
}
export default ListNewsItems;
