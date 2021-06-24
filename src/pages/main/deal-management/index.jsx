import React, { useState } from "react";
import { Table, Badge, Menu, Dropdown, Space, Button } from "antd";
import "./styles.scss";
import "antd/dist/antd.css";
import CurrentDeal from "../../../components/current-deal";
import PreviousDeal from "../../../components/pre-deal";
function DealManagement() {
  return (
    <div className="dm__wrapper">
      <div className="dm__button">
        <Button>Tạo deal</Button>
      </div>
      <h1 className="dm__title">Quản lý Deal</h1>
      <CurrentDeal />
      <PreviousDeal />
    </div>
  );
}
export default DealManagement;