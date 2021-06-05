import React from "react";
import { Route } from "react-router-dom";
function MainTemplate(props) {
  return (
    <>
      <header>header user</header>
      <main>
        <section>{props.children}</section>
      </main>
      <footer>footer</footer>
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
