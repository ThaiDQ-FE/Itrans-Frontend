import React from "react";
import { Route } from "react-router";

function LoginTemplate(props) {
  return <main>{props.children}</main>;
}

const RouterLoginTemplate = ({ path, exact, Component }) => {
  return (
    <Route path={path} exact={exact}>
      <LoginTemplate>
        <Component />
      </LoginTemplate>
    </Route>
  );
};
export default RouterLoginTemplate;
