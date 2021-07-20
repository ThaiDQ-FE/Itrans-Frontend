import React, { useState } from "react";
import { Select, Button, Skeleton } from "antd";
import "./styles.scss";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStorage } from "../../../assets/helper/helper";
import { getOrganizationFilter } from "../../../store/action/organization.action";

function FilterOrganizationComponent(props) {
  const { listStage, listRegion, listProvince, listIndustry } = useSelector(
    (state) => state.register
  );
  const { loading } = useSelector((state) => state.loading);
  const { Option } = Select;
  const dispatch = useDispatch();
  const stage = [];
  const region = [];
  const province = [];
  const industry = [];
  // eslint-disable-next-line array-callback-return
  listStage.map((item, index) => {
    stage.push(
      <Option name="stage" value={item.idStage} key={index}>
        {item.name}
      </Option>
    );
  });
  // eslint-disable-next-line array-callback-return
  listRegion.map((item, index) => {
    region.push(
      <Option name="region" value={item.idRegion} key={index}>
        {item.name}
      </Option>
    );
  });
  // eslint-disable-next-line array-callback-return
  listProvince.map((item, index) => {
    province.push(
      <Option name="province" value={item.idProvince} key={index}>
        {item.name}
      </Option>
    );
  });
  // eslint-disable-next-line array-callback-return
  listIndustry.map((item, index) => {
    industry.push(
      <Option name="industry" value={item.idIndustry} key={index}>
        {item.name}
      </Option>
    );
  });
  const handleChangeStage = (value) => {
    props.setSelectedStage(value);
  };

  const handleChangeRegion = (value) => {
    props.setSelectedRegion(value);
  };
  const handleChangeProvince = (value) => {
    props.setSelectedProvince(value);
  };
  const handleChangeIndustry = (value) => {
    props.setSelectedIndustry(value);
  };
  const renderSelect = (placeholder, defaultValue, value, change, child) => {
    return (
      <Select
        mode="multiple"
        placeholder={placeholder}
        style={{ width: "100%" }}
        defaultValue={defaultValue}
        onChange={change}
        value={value}
        // maxTagCount="responsive"
      >
        {child}
      </Select>
    );
  };
  const handleFilterData = () => {
    const userLogin = getLocalStorage("userInfo");
    if (userLogin === null) {
      dispatch(
        getOrganizationFilter(
          props.selectedIndustry,
          props.selectedProvince,
          props.selectedRegion,
          props.selectedStage,
          `""`,
          true
        )
      );
    } else if (userLogin !== null) {
      dispatch(
        getOrganizationFilter(
          props.selectedIndustry,
          props.selectedProvince,
          props.selectedRegion,
          props.selectedStage,
          userLogin.gmail,
          true
        )
      );
    }
  };
  const handleClear = () => {
    props.setSelectedStage([]);
    props.setSelectedRegion([]);
    props.setSelectedProvince([]);
    props.setSelectedIndustry([]);
    const userLogin = getLocalStorage("userInfo");
    let tempIndustry = [];
    let tempProvince = [];
    let tempRegion = [];
    let tempStage = [];
    if (userLogin === null) {
      dispatch(
        getOrganizationFilter(
          tempIndustry,
          tempProvince,
          tempRegion,
          tempStage,
          `""`,
          true
        )
      );
    } else if (userLogin !== null) {
      dispatch(
        getOrganizationFilter(
          tempIndustry,
          tempProvince,
          tempRegion,
          tempStage,
          userLogin.gmail,
          true
        )
      );
    }
  };

  return (
    <div className="foc__wrapper">
      <div className="foc__container">
        <div className="foc__dislayGrid">
          <div className="box">
            <small>Giai đoạn</small>
            {loading === true ? (
              <Skeleton.Input style={{ width: 120 }} active />
            ) : (
              renderSelect(
                "Chọn giai đoạn",
                props.selectedStage,
                props.selectedStage,
                handleChangeStage,
                stage
              )
            )}
          </div>
          <div className="box">
            <small>Tỉnh/thành</small>
            {loading === true ? (
              <Skeleton.Input style={{ width: 260 }} active />
            ) : (
              renderSelect(
                "Chọn tỉnh/thành",
                props.selectedProvince,
                props.selectedProvince,
                handleChangeProvince,
                province
              )
            )}
          </div>
          <div className="box">
            <small>Khu vực</small>
            {loading === true ? (
              <Skeleton.Input style={{ width: 260 }} active />
            ) : (
              renderSelect(
                "Chọn khu vục",
                props.selectedRegion,
                props.selectedRegion,
                handleChangeRegion,
                region
              )
            )}
          </div>
          <div className="box">
            <small>Lĩnh vực </small>
            {loading === true ? (
              <Skeleton.Input style={{ width: 440 }} active />
            ) : (
              renderSelect(
                "Chọn lĩnh vực",
                props.selectedIndustry,
                props.selectedIndustry,
                handleChangeIndustry,
                industry
              )
            )}
            <div className="foc__button">
              <Button
                className="foc__ads"
                type="primary"
                onClick={handleFilterData}
              >
                Áp dụng
              </Button>
              <Button className="foc__ht" type="primary" onClick={handleClear}>
                Hoàn tác
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterOrganizationComponent;
