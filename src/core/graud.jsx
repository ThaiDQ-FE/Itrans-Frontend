import React from "react";
import { Redirect } from "react-router-dom";
function Gruad(props) {
  const test = JSON.parse(localStorage.getItem("userInfo"));
  if (test === null || test === undefined) {
    return props.children;
  } else {
    return <Redirect to="/dang-nhap" />;
  }
}
export default Gruad;
