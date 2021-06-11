import React from "react";
import { Route } from "react-router-dom";
import UserFooter from "../../components/footer";
import Header from "../../components/header";
function MainTemplate(props) {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>{props.children}</main>
      <UserFooter />
    </>
  );
}
const RouterMainTemplate = ({ path, exact, Component }) => {
  return (
    <Route path={path} exact={exact}>
      <MainTemplate>
        <Component />
      </MainTemplate>
    </Route>
  );
};
export default RouterMainTemplate;
