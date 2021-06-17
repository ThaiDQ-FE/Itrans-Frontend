import React from "react";
import { Tabs } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import RegisterFreeTime from "../../../components/register-free-time";
import ScheduleManagement from "../../../components/schedule-management";
function TimeManagement() {
  const { TabPane } = Tabs;
  return (
    <div className="tm__wrapper">
      <Tabs defaultActiveKey="1" type="card" size="large">
        <TabPane tab="ĐĂNG KÝ THỜI GIAN RÃNH" key="1">
          <RegisterFreeTime />
        </TabPane>
        <TabPane tab="QUẢN LÝ LỊCH TRÌNH" key="2">
          <ScheduleManagement />
        </TabPane>
      </Tabs>
    </div>
  );
}
export default TimeManagement;
