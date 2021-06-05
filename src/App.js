import logo from "./logo.svg";
import "./App.css";
import { adminRouter, loginRouter, mainRouter } from "./configs/router";
import RouterMainTemplate from "./templates/main";
import RouterAdminTemplate from "./templates/admin";
import { BrowserRouter, Switch } from "react-router-dom";
import RouterLoginTemplate from "./templates/login";

function App() {
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  console.log(userLogin);
  const renderMainRouter = () => {
    return mainRouter.map(({ path, exact, Component }) => {
      return (
        <RouterMainTemplate
          path={path}
          exact={exact}
          Component={Component}
        ></RouterMainTemplate>
      );
    });
  };

  const renderAdminRouter = () => {
    return adminRouter.map(({ path, exact, Component }) => {
      return (
        <RouterAdminTemplate
          path={path}
          exact={exact}
          Component={Component}
        ></RouterAdminTemplate>
      );
    });
  };

  const renderLoginRouter = () => {
    return loginRouter.map(({ path, exact, Component }) => {
      return (
        <RouterLoginTemplate
          path={path}
          exact={exact}
          Component={Component}
        ></RouterLoginTemplate>
      );
    });
  };

  return (
    <>
      <BrowserRouter>
        {userLogin === "admin" ? (
          <Switch>{renderAdminRouter()}</Switch>
        ) : (
          <Switch>{renderMainRouter()}</Switch>
        )}
        <Switch>{renderLoginRouter()}</Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
