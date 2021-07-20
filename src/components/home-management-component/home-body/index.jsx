import React from "react";
import ListFollow from "./list-follow";
import ListNews from "./list-news";
import "antd/dist/antd.css";
import "./styles.scss";
import { Input } from "antd";

function HomeBody(props) {
  const { Search } = Input;
  const handleChangeValue = (event) => {
    let a = event.target.value;
    if (a.length === 0) {
      console.log("ok");
    }
  };
  const onSearch = (value) => {
    setTimeout(() => {
      console.log(value);
    }, 2000);
  };
  return (
    <div className="hb__wrapper">
      <div className="hb__search">
        <Search
          className="hb__searchInput"
          placeholder="Tìm kiếm tiêu đề ... "
          enterButton="Tìm kiếm"
          size="large"
          onChange={handleChangeValue}
          onSearch={onSearch}
        />
      </div>
      <div className="hb__container">
        <ListNews
          list={props.list}
          listHash={props.list.articleIndustries}
          loading={props.loading}
        />
        <ListFollow loading={props.loading} />
      </div>
    </div>
  );
}
export default HomeBody;
