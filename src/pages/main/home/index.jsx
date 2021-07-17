import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkEmailUser } from "../../../assets/helper/helper";
import Banner from "../../../components/home-management-component/banner";
import HomeBody from "../../../components/home-management-component/home-body";
import { getListViewArticle } from "../../../store/action/artical.action";
import "./styles.scss";

function UserHome() {
  const { listViewArticle } = useSelector((state) => state.article);
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListViewArticle(checkEmailUser(), false));
  }, []);
  return (
    <>
      <Banner />
      <HomeBody list={listViewArticle} loading={loading} />
    </>
  );
}
export default UserHome;
