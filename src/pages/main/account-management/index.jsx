import React from "react";
import { Tabs } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import Images from "../../../assets/images/images";
import OverviewTab from "../../../components/account-management-component/overview";
import NewsTab from "../../../components/account-management-component/news";
import RoundById from "../../../components/account-management-component/round";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDeatilCompany } from "../../../store/action/company.action";
import {
  checkEmailUser,
  checkIdUser,
  checkPathUrl,
  checkRoleUser,
  getLocalStorage,
  pathNhaDauTu,
  pathQuanLyTaiKhoan,
  pathToChuc,
} from "../../../assets/helper/helper";
import { getListMilestone } from "../../../store/action/milestone.action";
import { getListMediaById } from "../../../store/action/media.action";
import { getListIntroduceByGmail } from "../../../store/action/introduce.action";
import { getListArticleByGmail } from "../../../store/action/artical.action";
import TeamMember from "../../../components/account-management-component/team-member";
import { getListTeamMember } from "../../../store/action/team.action";
import {
  getListRoundByIdInvestor,
  getListRoundByIdOrganization,
} from "../../../store/action/round.action";
import { getListIndustry } from "../../../store/action/register.action";
import NotAuth from "../../error/auth";
import { withRouter } from "react-router-dom";
function AccountManagement(props) {
  const { TabPane } = Tabs;
  const dispatch = useDispatch();
  const { detailCompany } = useSelector((state) => state.detailCompany);
  const { loading } = useSelector((state) => state.loading);
  const { listMilestone } = useSelector((state) => state.milestone);
  const { listMedia } = useSelector((state) => state.media);
  const { listIntroduce } = useSelector((state) => state.introduce);
  const { listArticle } = useSelector((state) => state.article);
  const { listTeamMember } = useSelector((state) => state.teamMember);
  const { listRoundByIdInvestor, listRoundByIdOrganization } = useSelector(
    (state) => state.round
  );
  const { listIndustry } = useSelector((state) => state.register);
  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/quan-ly-tai-khoan") {
      dispatch(getListIndustry());
      dispatch(getDeatilCompany(checkEmailUser(), true));
      dispatch(getListMediaById(checkEmailUser(), true));
      dispatch(getListArticleByGmail(checkEmailUser(), false));
      dispatch(getListIntroduceByGmail(checkEmailUser(), true));
      dispatch(getListTeamMember(checkEmailUser(), false));
      if (checkRoleUser() === "ORGANIZATION") {
        dispatch(getListMilestone(checkIdUser(), true));
      }
      if (checkRoleUser() === "INVESTOR") {
        dispatch(getListRoundByIdInvestor(checkIdUser(), props.history));
      } else {
        dispatch(
          getListRoundByIdOrganization(checkIdUser(), false, props.history)
        );
      }
    } else if (path === "/to-chuc/chi-tiet") {
      const gmail = getLocalStorage("gmailOrganizationToDetail");
      const id = getLocalStorage("idOrganizationToDetail");
      dispatch(getDeatilCompany(gmail), true);
      dispatch(getListMediaById(gmail, true));
      dispatch(getListArticleByGmail(gmail, false));
      dispatch(getListIntroduceByGmail(gmail, true));
      dispatch(getListTeamMember(gmail, false));
      dispatch(getListMilestone(id, true));
      dispatch(getListRoundByIdOrganization(id, false, props.history));
    } else if (path === "/nha-dau-tu/chi-tiet") {
      const gmail = getLocalStorage("gmailInvestorToDetail");
      const id = getLocalStorage("idInvestorToDetail");
      dispatch(getDeatilCompany(gmail), true);
      dispatch(getListMediaById(gmail, true));
      dispatch(getListIntroduceByGmail(gmail, true));
      dispatch(getListTeamMember(gmail, false));
      dispatch(getListRoundByIdInvestor(id, props.history));
      dispatch(getListArticleByGmail(gmail, false));
    }
  }, []);
  const checkRole = () => {
    if (checkPathUrl() === pathQuanLyTaiKhoan()) {
      if (checkRoleUser() === "INVESTOR") {
        return "Thỏa thuận";
      } else {
        return "Vòng gọi vốn";
      }
    } else if (checkPathUrl() === pathToChuc()) {
      return "Vòng gọi vốn";
    } else if (checkPathUrl() === pathNhaDauTu()) {
      return "Thỏa thuận";
    }
  };
  if (loading === true) {
    return (
      <div className="am__loading">
        <img className="am__imgLoading" src={Images.LOADING} alt="loading" />
      </div>
    );
  }
  if (getLocalStorage("userInfo") === null) {
    return <NotAuth />;
  } else if (checkRoleUser() === "ADMIN") {
    return <NotAuth />;
  } else {
    return (
      <div className="am__wrapper">
        <div className="am__container">
          <div className="am__image">
            <img
              src={
                detailCompany.logo === "" ? Images.NO_IMAGE : detailCompany.logo
              }
              alt="logo company"
            />
          </div>
          <div className="am__info">
            <span>{detailCompany.name}</span>
            <br />
            <span>
              {detailCompany.numberOfEmp} thành viên - Thành lập năm{" "}
              {detailCompany.foundedYear}
            </span>
          </div>
          <Tabs defaultActiveKey="1" type="card" size="large">
            <TabPane tab="Tổng quan" key="1">
              <OverviewTab
                detailCompany={detailCompany}
                listMilestone={listMilestone}
                loading={loading}
                media={listMedia}
                introduce={listIntroduce}
              />
            </TabPane>
            <TabPane tab={checkRole()} key="2">
              <RoundById
                listRoundByIdInvestor={listRoundByIdInvestor}
                listRoundByIdOrganization={listRoundByIdOrganization}
              />
            </TabPane>
            {detailCompany.investorType !== "Nhà đầu tư thiên thần" ? (
              <TabPane tab="Thành viên chủ chốt" key="3">
                <TeamMember teamMember={listTeamMember} />
              </TabPane>
            ) : (
              <></>
            )}

            <TabPane tab="Tin tức" key="4">
              <NewsTab article={listArticle} industry={listIndustry} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}
export default withRouter(AccountManagement);
