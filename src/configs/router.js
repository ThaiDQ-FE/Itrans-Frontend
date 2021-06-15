import AdminHome from "../pages/admin/home";
import Login from "../pages/general/login";
import Register from "../pages/general/register";
import UserHome from "../pages/main/home";

export const mainRouter = [
  {
    path: "/",
    exact: true,
    Component: UserHome,
  },
];

export const adminRouter = [
  {
    path: "/",
    exact: true,
    Component: AdminHome,
  },
];

export const generalRouter = [
  {
    path: "/dang-nhap",
    exact: false,
    Component: Login,
  },
  {
    path: "/dang-ky",
    exact: false,
    Component: Register,
  },
];
