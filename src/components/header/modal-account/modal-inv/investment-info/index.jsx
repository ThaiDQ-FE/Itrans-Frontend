import React from "react";
import { Select, Input, Tooltip, Spin } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
function ModalAccountInvestorInvesment(props) {
  const { Option } = Select;
  const listIT = [];
  const listII = [];
  const listPI = [];
  const listRI = [];
  const listSI = [];
  for (let i = 0; i < props.listInvestorType.length; i++) {
    listIT.push(
      <Option
        key={props.listInvestorType[i].idInvestorType}
        value={props.listInvestorType[i].name}
      >
        {props.listInvestorType[i].name}
      </Option>
    );
  }
  for (let i = 0; i < props.listIndustry.length; i++) {
    listII.push(
      <Option
        key={props.listIndustry[i].idIndustry}
        value={props.listIndustry[i].name}
      >
        {props.listIndustry[i].name}
      </Option>
    );
  }
  for (let i = 0; i < props.listProvince.length; i++) {
    listPI.push(
      <Option
        key={props.listProvince[i].idProvince}
        value={props.listProvince[i].name}
      >
        {props.listProvince[i].name}
      </Option>
    );
  }
  for (let i = 0; i < props.listRegion.length; i++) {
    listRI.push(
      <Option
        key={props.listRegion[i].idRegion}
        value={props.listRegion[i].name}
      >
        {props.listRegion[i].name}
      </Option>
    );
  }
  for (let i = 0; i < props.listStage.length; i++) {
    listSI.push(
      <Option key={props.listStage[i].idStage} value={props.listStage[i].name}>
        {props.listStage[i].name}
      </Option>
    );
  }

  return (
    <>
      <div className="maii__lineOne">
        <div className="maii__itype">
          <label className="label__fontWeight">Loại nhà đầu tư</label>
          <Select
            className="maill__selectit"
            mode="multiple"
            dropdownClassName="modal__articleDrop"
            defaultValue={props.arrayInv}
            size="large"
            bordered={false}
            onChange={props.handleChangeIType}
            dropdownAlign="top"
          >
            {listIT}
          </Select>
        </div>
        <div className="maii__iindustry">
          <label className="label__fontWeight">Lĩnh vục đầu tư</label>
          <Select
            className="maill__selectii"
            mode="multiple"
            dropdownClassName="modal__articleDrop"
            defaultValue={props.arrayIn}
            size="large"
            bordered={false}
            onChange={props.handleChangeIndustry}
          >
            {listII}
          </Select>
        </div>
      </div>
      <div className="maii__lineTwo">
        <div className="maii__iProvince">
          <label className="label__fontWeight">Khu vực đầu tư</label>
          <Select
            className="maill__selectip"
            mode="multiple"
            dropdownClassName="modal__articleDrop"
            defaultValue={props.arayPro}
            size="large"
            bordered={false}
            onChange={props.handleChangeProvince}
          >
            {listPI}
          </Select>
        </div>
        <div className="maii__iRegion">
          <label className="label__fontWeight">Tỉnh thành đầu tư</label>
          <Select
            className="maill__selectir"
            mode="multiple"
            dropdownClassName="modal__articleDrop"
            defaultValue={props.arrayRe}
            size="large"
            bordered={false}
            onChange={props.handleChangeRegion}
          >
            {listRI}
          </Select>
        </div>
      </div>
      <div className="maii__lineThree">
        <div className="maii__iStage">
          <label className="label__fontWeight">Giai đoạn đầu tư</label>
          <Select
            className="maill__selectis"
            mode="multiple"
            dropdownClassName="modal__articleDrop"
            defaultValue={props.arrayS}
            size="large"
            bordered={false}
            onChange={props.handleChangeStage}
          >
            {listSI}
          </Select>
        </div>
        <div className="maii__iValue">
          <label className="label__fontWeight">Số tiền đầu tư</label>
          <div className="maii__minMax">
            <div className="maii__minValue">
              <Input
                defaultValue={props.data.minInvestment}
                type="number"
                size="large"
                addonAfter="Tỷ VNĐ"
              />
            </div>
            <div className="maii__space">
              <span>-</span>
            </div>
            <div className="maii__maxValue">
              <Input
                defaultValue={props.data.maxInvestment}
                type="number"
                size="large"
                addonAfter="Tỷ VNĐ
              "
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalAccountInvestorInvesment;
