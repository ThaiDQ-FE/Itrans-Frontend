import React from "react";
import ListFollow from "./list-follow";
import ListNews from "./list-news";
import "./styles.scss";
function HomeBody(props) {
  return (
    <div className="hb__wrapper">
      <ListNews
        list={props.list}
        listHash={props.list.articleIndustries}
        loading={props.loading}
      />
      <ListFollow loading={props.loading} />
    </div>
  );
}
export default HomeBody;
