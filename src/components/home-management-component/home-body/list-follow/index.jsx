import React from "react";
import ListFollowItem from "./list-follow-item";
import "./styles.scss";
function ListFollow(props) {
  return (
    <div className="lf__wrapper">
      <ListFollowItem loading={props.loading} />
    </div>
  );
}
export default ListFollow;
