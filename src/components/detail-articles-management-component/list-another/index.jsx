import React from "react";
import Slider from "react-slick";
import Images from "../../../assets/images/images";
import "./styles.scss";
function ListAnotherArticle() {
  return (
    <div className="listAA__wrapper">
      <div className="listAA__left"></div>
      <div className="listAA__center">
        <div className="listAA__title">Bài viết khác</div>
        <div className="listAA__box">
          <div className="listAA__item">
            <img
              className="listAA__itemThumbnail"
              src={Images.BACKGROUND}
              alt="thumbnail"
            />
            <div className="listAA__itemTitle">
              <p className="listAA__pFirst">
                Thật là vãi chưỡng các bạn ơi, tôi không thể tin luôn á thật
                không thể tin tin luôn
              </p>
              <p className="listAA__pSecond">
                Thật không thể tin được đến chúng tôi cũng không thể tin được
              </p>
            </div>
          </div>
          <div className="listAA__item">
            <img
              className="listAA__itemThumbnail"
              src={Images.BACKGROUND}
              alt="thumbnail"
            />
            <div className="listAA__itemTitle">
              <p className="listAA__pFirst">
                Thật là vãi chưỡng các bạn ơi, tôi không thể tin luôn á thật
                không thể tin tin luôn
              </p>
              <p className="listAA__pSecond">
                Thật không thể tin được đến chúng tôi cũng không thể tin được
              </p>
            </div>
          </div>
          <div className="listAA__item">
            <img
              className="listAA__itemThumbnail"
              src={Images.BACKGROUND}
              alt="thumbnail"
            />
            <div className="listAA__itemTitle">
              <p className="listAA__pFirst">
                Thật là vãi chưỡng các bạn ơi, tôi không thể tin luôn á thật
                không thể tin tin luôn
              </p>
              <p className="listAA__pSecond">
                Thật không thể tin được đến chúng tôi cũng không thể tin được
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="listAA__right"></div>
    </div>
  );
}

export default ListAnotherArticle;
