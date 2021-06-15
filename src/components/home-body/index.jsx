import React from "react";
import ListFollow from "../list-follow";
import ListNews from "../list-news";
import "./styles.scss";
function HomeBody() {
  return (
    <div className="hb__wrapper">
      <ListNews />
      <ListFollow />
    </div>
  );
}
export default HomeBody;
