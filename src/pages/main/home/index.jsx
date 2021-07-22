import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkEmailUser,
  checkRoleUser,
  getLocalStorage,
} from "../../../assets/helper/helper";
import Banner from "../../../components/home-management-component/banner";
import HomeBody from "../../../components/home-management-component/home-body";
import { getListViewArticle } from "../../../store/action/artical.action";
import { getOrgOrInvNotFollow } from "../../../store/action/interest.action";
import "./styles.scss";
import NotAuth from "../../error/auth";
import { withRouter } from "react-router-dom";
import { getDeatilCompany } from "../../../store/action/company.action";
function UserHome(props) {
  const { listViewArticle, listSearch } = useSelector((state) => state.article);
  const { loading } = useSelector((state) => state.loading);
  const [search, setSearch] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setSearch(false);
    dispatch(getDeatilCompany(checkEmailUser(), false));
    dispatch(getListViewArticle(checkEmailUser(), false, props.history));
    dispatch(getOrgOrInvNotFollow(checkEmailUser(), true));
  }, []);
  if (getLocalStorage("userInfo") === null) {
    return <NotAuth />;
  } else if (checkRoleUser() === "ADMIN") {
    return <NotAuth />;
  } else {
    return (
      <>
        <Banner />
        <HomeBody
          list={listViewArticle}
          listS={listSearch}
          loading={loading}
          search={search}
          setSearch={setSearch}
        />
      </>
    );
  }
}
export default withRouter(UserHome);
