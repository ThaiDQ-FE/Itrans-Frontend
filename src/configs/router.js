import AdminHome from "../pages/admin/home";
import Login from "../pages/general/login";
import Register from "../pages/general/register";
import AccountManagement from "../pages/main/account-management";
import DealManagement from "../pages/main/deal-management";
import FundingRound from "../pages/main/funding-round";
import FundraisingManagement from "../pages/main/fundraising-management";
import UserHome from "../pages/main/home";
import InvestorManagement from "../pages/main/investor-management";
import OrganizationManagement from "../pages/main/organization-management";
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
  {
    path: "/quan-ly-deal",
    exact: false,
    Component: DealManagement,
  },
  {
    path: "/quan-ly-vong-goi-von",
    exact: false,
    Component: FundraisingManagement,
  },
  {
    path: "/vong-goi-von",
    exact: false,
    Component: FundingRound,
  },
  {
    path: "/to-chuc",
    exact: false,
    Component: OrganizationManagement,
  },
  {
    path: "/nha-dau-tu",
    exact: false,
    Component: InvestorManagement,
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
