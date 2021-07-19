import React, { useEffect } from "react";
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
function UserHome(props) {
  const { listViewArticle } = useSelector((state) => state.article);
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  useEffect(() => {
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
        <HomeBody list={listViewArticle} loading={loading} />
      </>
    );
  }
}
export default withRouter(UserHome);
