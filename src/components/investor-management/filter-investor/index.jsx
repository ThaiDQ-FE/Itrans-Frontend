import React, { useState } from "react";
import { Select, Button, Skeleton } from "antd";
import "./styles.scss";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStorage } from "../../../assets/helper/helper";
import { getInvestorFilter } from "../../../store/action/investor.action";
function FilterInvestorComponent(props) {
  const { listProvince, listInvestorType } = useSelector(
    (state) => state.register
  );
  const { loading } = useSelector((state) => state.loading);
  const { Option } = Select;
  const dispatch = useDispatch();

  const province = [];
  const type = [];
  let arrayP = [];
  let arrayT = [];
  for (let i = 0; i < listProvince.length; i++) {
    province.push(
      <Option key={listProvince[i].idProvince} value={listProvince[i].name}>
        {listProvince[i].name}
      </Option>
    );
  }

  for (let i = 0; i < listInvestorType.length; i++) {
    type.push(
      <Option
        key={listInvestorType[i].idInvestorType}
        value={listInvestorType[i].name}
      >
        {listInvestorType[i].name}
      </Option>
    );
  }
  const handleChangeProvince = (value, action) => {
    for (let i = 0; i < action.length; i++) {
      arrayP.push(Number(action[i].key));
    }
    props.setSelectedProvince(arrayP);
    props.setSelectedP(value);
  };
  const handleChangeType = (value, action) => {
    for (let i = 0; i < action.length; i++) {
      arrayT.push(Number(action[i].key));
    }
    props.setSelectedType(arrayT);
    props.setSelectedT(value);
  };
  const renderSelect = (placeholder, change, child, value) => {
    return (
      <Select
        mode="multiple"
        placeholder={placeholder}
        style={{ width: "100%" }}
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
        getInvestorFilter(props.selectedProvince, props.selectedType, ` `)
      );
    } else if (userLogin !== null) {
      dispatch(
        getInvestorFilter(
          props.selectedProvince,
          props.selectedType,
          userLogin.gmail
        )
      );
    }
  };
  const handleClear = () => {
    props.setSelectedProvince([]);
    props.setSelectedType([]);
    props.setSelectedP([]);
    props.setSelectedT([]);
    arrayP = [];
    arrayT = [];
    const userLogin = getLocalStorage("userInfo");
    let tempProvince = [];
    let tempType = [];
    if (userLogin === null) {
      dispatch(getInvestorFilter(tempProvince, tempType, ` `));
    } else if (userLogin !== null) {
      dispatch(getInvestorFilter(tempProvince, tempType, userLogin.gmail));
    }
  };
  return (
    <div className="filter__wrapper">
      <div className="filter__container">
        <div className="filter__displayGrid">
          <div className="box">
            <small>Tỉnh/thành</small>
            {loading === true ? (
              <Skeleton.Input style={{ width: 220 }} active />
            ) : (
              renderSelect(
                "Chọn tỉnh/thành",
                handleChangeProvince,
                province,
                props.selectedP
              )
            )}
          </div>
          <div className="box">
            <small>Loại nhà đầu tư</small>
            {loading === true ? (
              <Skeleton.Input style={{ width: 380 }} active />
            ) : (
              renderSelect(
                "Chọn loại nhà đầu tư",
                handleChangeType,
                type,
                props.selectedT
              )
            )}
            <div className="filter__button">
              <Button
                className="filter__ads"
                type="primary"
                onClick={handleFilterData}
              >
                Áp dụng
              </Button>
              <Button
                className="filter__ht"
                type="primary"
                onClick={handleClear}
              >
                Hoàn tác
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterInvestorComponent;
