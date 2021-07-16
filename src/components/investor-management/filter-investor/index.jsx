import React, { useState } from "react";
import { Select, Button, Skeleton } from "antd";
import "./styles.scss";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStorage } from "../../../assets/helper/helper";
import { getInvestorFilter } from "../../../store/action/investor.action";
function FilterInvestorComponent() {
  const { listProvince, listInvestorType } = useSelector(
    (state) => state.register
  );
  const { loading } = useSelector((state) => state.loading);
  const { Option } = Select;
  const dispatch = useDispatch();
  const [selectedProvince, setSelectedProvince] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const province = [];
  const type = [];
  // eslint-disable-next-line array-callback-return
  listProvince.map((item, index) => {
    province.push(
      <Option name="stage" value={item.idProvince} key={index}>
        {item.name}
      </Option>
    );
  });
  // eslint-disable-next-line array-callback-return
  listInvestorType.map((item, index) => {
    type.push(
      <Option name="stage" value={item.idInvestorType} key={index}>
        {item.name}
      </Option>
    );
  });
  const handleChangeProvince = (value) => {
    setSelectedProvince(value);
  };
  const handleChangeType = (value) => {
    setSelectedType(value);
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
      dispatch(getInvestorFilter(selectedProvince, selectedType, ` `));
    } else if (userLogin !== null) {
      dispatch(
        getInvestorFilter(selectedProvince, selectedType, userLogin.gmail)
      );
    }
  };
  const handleClear = () => {
    setSelectedProvince([]);
    setSelectedType([]);
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
                selectedProvince,
                selectedProvince,
                handleChangeProvince,
                province
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
                selectedType,
                selectedType,
                handleChangeType,
                type
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
