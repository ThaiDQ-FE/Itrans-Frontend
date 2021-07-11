import React from "react";
import { Route } from "react-router-dom";
import SideBar from "../../components/side-bar"
import Images from "../../assets/images/images";
function AdminTemplate(props) {
  return (
    <div className="admin-wrapper" style={{ display: "flex" }}>
      <SideBar />
      <section>{props.children}</section>
      <img style={{ width: 50, height: 50, float: "left", marginTop: 5 }} src={Images.USER_AVATA} />
    </div>
  );
}
const RouterAdminTemplate = ({ path, exact, Component }) => {
  return (
    <Route path={path} exact={exact}>
      <AdminTemplate>
        <Component />
      </AdminTemplate>
    </Route>
  );
};
export default RouterAdminTemplate;
