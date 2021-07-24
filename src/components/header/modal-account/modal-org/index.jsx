import React from "react";
import { Button, Modal, Input, Tooltip, Spin, Checkbox } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./styles.scss";
import ModalAccountOrganizationBasic from "./basic-info";
import ModalAccountOrganizationFunding from "./funding-info";
import { useSelector } from "react-redux";
function ModalAccountOrganization(props) {
  const { listProvince, listIndustry } = useSelector((state) => state.register);
  return (
    <Modal
      className="modalah__accountOrg"
      visible={props.open}
      maskClosable={true}
      footer={null}
      closable={true}
      destroyOnClose={true}
      onCancel={props.close}
    >
      <h2 style={{ textAlign: "center" }}>Cập nhật thông tin tài khoản</h2>
      <div className="modalo__wrapper">
        <div className="modalo__lineOne">
          <ModalAccountOrganizationBasic
            data={props.data}
            avataError={props.avataError}
            setAvataError={props.setAvataError}
          />
        </div>
        <hr className="modalo__hr" />
        <div className="modalo__lineTwo">
          <ModalAccountOrganizationFunding
            data={props.data}
            handleChangeProvince={props.handleChangeProvince}
            handleChangeIndustry={props.handleChangeIndustry}
            //
            arrayIndustry={props.arrayIndustry}
            arrayIn={props.arrayIn}
            arrayProvince={props.arrayProvince}
            arayPro={props.arayPro}
            //
            listProvince={listProvince}
            listIndustry={listIndustry}
          />
        </div>
        <div className="modalo__action">
          <Button className="modalo__update" type="primary" size="large">
            Cập nhật
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalAccountOrganization;
