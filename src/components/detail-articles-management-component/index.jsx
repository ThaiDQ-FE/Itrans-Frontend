import React from "react";
import DetailArticle from "./detail-article";
import ListAnotherArticle from "./list-another";
import "./styles.scss";
function DetailArticleComponent(props) {
  return (
    <div className="dac__wrapper">
      <DetailArticle article={props.article} loading={props.loading} />
      <ListAnotherArticle another={props.another} />
    </div>
  );
}

export default DetailArticleComponent;
