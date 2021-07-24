import React, { useState } from "react";
import { Button, Modal, Input, Tooltip, Spin, Checkbox } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./styles.scss";
import ModalAccountInvestorBasic from "./basic-info";
import { useSelector } from "react-redux";
import ModalAccountInvestorInvesment from "./investment-info";
function ModalAccountInvestor(props) {
  const {
    listProvince,
    listRegion,
    listStage,
    listIndustry,
    listInvestorType,
  } = useSelector((state) => state.register);
  const [loading, setLoading] = useState(false);
  return (
    <Modal
      className="modalah__accountInv"
      visible={props.open}
      maskClosable={true}
      footer={null}
      closable={true}
      destroyOnClose={true}
      onCancel={props.close}
    >
      <h2 style={{ textAlign: "center" }}>Cập nhật thông tin tài khoản</h2>
      <div className="modali__wrapper">
        <div className="modali__lineOne">
          <ModalAccountInvestorBasic
            data={props.data}
            loading={loading}
            setLoading={setLoading}
            avataError={props.avataError}
            setAvataError={props.setAvataError}
          />
        </div>
        <hr className="modali__hr" />
        <div className="modali__lineTwo">
          <ModalAccountInvestorInvesment
            data={props.data}
            arrayProvince={props.arrayProvince}
            arayPro={props.arayPro}
            arrayRegion={props.arrayRegion}
            arrayRe={props.arrayRe}
            arrayStage={props.arrayStage}
            arrayS={props.arrayS}
            arrayIndustry={props.arrayIndustry}
            arrayIn={props.arrayIn}
            arrayInvestorType={props.arrayInvestorType}
            arrayInv={props.arrayInv}
            //
            listProvince={listProvince}
            listRegion={listRegion}
            listStage={listStage}
            listIndustry={listIndustry}
            listInvestorType={listInvestorType}
            //
            handleChangeIType={props.handleChangeIType}
            handleChangeStage={props.handleChangeStage}
            handleChangeRegion={props.handleChangeRegion}
            handleChangeProvince={props.handleChangeProvince}
            handleChangeIndustry={props.handleChangeIndustry}
          />
        </div>
        <div className="modali__action">
          <Button className="modali__update" type="primary" size="large">
            Cập nhật
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalAccountInvestor;
