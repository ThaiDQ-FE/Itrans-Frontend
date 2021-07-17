import React from "react";
import { Skeleton } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import ArticlesItem from "./news-item";
import { withRouter } from "react-router-dom";
function ListNews(props) {
  const handleClick = () => {
    setTimeout(() => {
      props.history.push("/tin-tuc/chi-tiet");
    }, 500);
  };
  const renderListNews = () => {
    if (props.loading === true) {
      return (
        <div className="ln__skeleton">
          <div className="ln__skeleOne">
            <Skeleton.Image className="ln__skeleImg" />
            <Skeleton active className="ln__skeleContent" />
          </div>
          <div className="ln__skeleOne">
            <Skeleton.Image className="ln__skeleImg" />
            <Skeleton active className="ln__skeleContent" />
          </div>
        </div>
      );
    } else {
      return props.list.map((item, index) => {
        return (
          <div
            className="ln__articleWrapper"
            key={index}
            onClick={() => {
              handleClick();
            }}
          >
            <ArticlesItem
              id={item.idArticle}
              title={item.title}
              thumbnail={item.thumbnail}
              logo={item.logo}
              description={item.description}
              createAt={item.createAt}
              articleIndustries={item.articleIndustries}
              accountCreate={item.accountCreate}
            />
          </div>
        );
      });
    }
  };
  return <div className="ln__wrapper">{renderListNews()}</div>;
}
export default withRouter(ListNews);
