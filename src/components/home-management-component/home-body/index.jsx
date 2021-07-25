import React from "react";
import ListFollow from "./list-follow";
import ListNews from "./list-news";
import "antd/dist/antd.css";
import "./styles.scss";
import { Input } from "antd";
import ListSearch from "./list-search";
import { useDispatch } from "react-redux";
import { searchArticle } from "../../../store/action/artical.action";
import { checkEmailUser } from "../../../assets/helper/helper";
import RoundSuggest from "./list-suggest";

function HomeBody(props) {
  const dispatch = useDispatch();
  const { Search } = Input;
  const onSearch = (value, event) => {
    if (event.key === "Enter") {
      if (value === "") {
        props.setSearch(false);
      } else {
        dispatch(searchArticle(checkEmailUser(), value, props.history));
        props.setSearch(true);
      }
    } else {
      if (value === "") {
        props.setSearch(false);
      } else {
        dispatch(searchArticle(checkEmailUser(), value, props.history));
        props.setSearch(true);
      }
    }
  };

  return (
    <div className="hb__wrapper">
      <div className="hb__suggest">
        <RoundSuggest list={props.listRound} />
      </div>
      <hr style={{ width: 200, margin: "auto" }} />
      <div className="hb__search">
        <Search
          id="hb__search"
          className="hb__searchInput"
          placeholder="Tìm kiếm tiêu đề ... "
          enterButton="Tìm kiếm"
          size="large"
          onSearch={onSearch}
        />
      </div>
      <div className="hb__container">
        {props.search === false ? (
          <ListNews
            list={props.list}
            listHash={props.list.articleIndustries}
            loading={props.loading}
          />
        ) : (
          <ListSearch
            listS={props.listS}
            listHash={props.listS.articleIndustries}
            loading={props.loading}
          />
        )}

        <ListFollow loading={props.loading} />
      </div>
    </div>
  );
}
export default HomeBody;
