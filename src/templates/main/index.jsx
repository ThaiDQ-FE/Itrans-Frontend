import React from "react";
import { Redirect, Route } from "react-router-dom";
import UserFooter from "../../components/footer";
import Header from "../../components/header";
function MainTemplate(props) {
  const test = JSON.parse(localStorage.getItem("userInfo"));
  console.log(test);
  if (test === null) {
    return <Redirect to="/dang-nhap" />;
  } else {
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
