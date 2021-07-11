import React from "react";
import { Button } from "antd";
import ArticlesItem from "./article-item";
import "./styles.scss";
import "antd/dist/antd.css";
function NewsTab(props) {
  const renderListArticle = () => {
    return props.article.map((item, index) => {
      return (
        <div className="nt__articleWrapper" key={index}>
          <ArticlesItem
            id={item.idArticle}
            owner={item.accountCreate}
            listIndustries={item.articleIndustries}
            createAt={item.createAt}
            description={item.description}
            logo={item.logo}
            thumbnail={item.thumbnail}
            title={item.title}
          />
        </div>
      );
    });
  };
  return (
    <div
      className={`nt__wrapper${
        props.article.length === 0 ? " nt__noArticleWrapper" : ""
      }`}
    >
      {props.article.length !== 0 ? (
        renderListArticle()
      ) : (
        <div className="nt__noArticle">
          <p>Hiện tại bạn không có tin tức nào được đăng tải</p>
          <Button type="primary" size="large">
            Tạo bài đăng
          </Button>
        </div>
      )}
    </div>
  );
}

export default NewsTab;
