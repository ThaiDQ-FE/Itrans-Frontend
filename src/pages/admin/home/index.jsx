import React from "react";
import { checkRoleUser, getLocalStorage } from "../../../assets/helper/helper";
import NotAuth from "../../error/auth";
import "./styles.scss";
function AdminHome() {
  if (getLocalStorage("userInfo") === null) {
    return <></>;
  } else if (checkRoleUser() !== "ADMIN") {
    return <NotAuth />;
  } else {
    return <div className="adminHome__wrapper">home</div>;
  }
}
export default AdminHome;
