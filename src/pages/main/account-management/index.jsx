import React from "react";
import { Tabs } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import Images from "../../../assets/images/images";
import OverviewTab from "../../../components/overview";
function AccountManagement() {
  const { TabPane } = Tabs;
  return (
    <div className="am__wrapper">
      <div className="am__container">
        <div className="am__image">
          <img src={Images.NO_IMAGE} alt="No img" />
        </div>
        <div className="am__info">
          <span>Công ty Baby Shark</span>
          <br />
          <span>200 thành viên - Thành lập năm 2017</span>
        </div>
        <div className="am__setting">
          <img src={Images.SETTING_ACCOUNT} alt="setting account" />
        </div>
        <Tabs defaultActiveKey="1" type="card" size="large">
          <TabPane tab="Tổng quan" key="1">
            <OverviewTab />
          </TabPane>
          <TabPane tab="Tài chính" key="2">
            Content of card tab 2
          </TabPane>
          <TabPane tab="Thành viên" key="3">
            Content of card tab 3
          </TabPane>
          <TabPane tab="Tin tức" key="4">
            Content of card tab 3
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
export default AccountManagement;
