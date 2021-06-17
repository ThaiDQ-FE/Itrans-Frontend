import AdminHome from "../pages/admin/home";
import Login from "../pages/general/login";
import Register from "../pages/general/register";
import AccountManagement from "../pages/main/account-management";
import UserHome from "../pages/main/home";
import TimeManagement from "../pages/main/time-management";

export const mainRouter = [
  {
    path: "/",
    exact: true,
    Component: UserHome,
  },
  {
    path: "/quan-ly-tai-khoan",
    exact: false,
    Component: AccountManagement,
  },
  {
    path: "/quan-ly-thoi-gian",
    exact: false,
    Component: TimeManagement,
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
