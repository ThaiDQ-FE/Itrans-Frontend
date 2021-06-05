import Home from "../pages/general/home";
import Login from "../pages/general/login";

export const mainRouter = [
  {
    path: "/",
    exact: true,
    Component: Home,
  },
];

export const adminRouter = [
  {
    path: "/",
    exact: true,
    Component: Home,
  },
];

export const loginRouter = [
  {
    path: "/dang-nhap",
    exact: true,
    Component: Login,
  },
];
