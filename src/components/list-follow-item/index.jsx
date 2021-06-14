import React from "react";
import "./styles.scss";
import data from "./data.json";
import { Button } from "@material-ui/core";
function ListFollowItem() {
  const renderListFollow = () => {
    return data.map((follow, index) => {
      return (
        <div className="lfi__container">
          <div className="lfi__top">
            <div className="lfi__img">
              <img src={follow.logo} alt="" />
            </div>
            <div className="lfi__name">
              <p className="lfi__p">{follow.name}</p>
            </div>
          </div>
          <div className="lfi__content">
            <p className="lfi__contentP">{follow.content}</p>
          </div>
          <div className="lfi__button">
            <Button variant="outlined" color="primary">
              Theo dõi
            </Button>
          </div>
        </div>
      );
    });
  };
  return <div className="lfi__wrapper">{renderListFollow()}</div>;
}
export default ListFollowItem;
