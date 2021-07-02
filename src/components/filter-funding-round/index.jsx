import React, { useState } from "react";
import { Select, Skeleton, Input, Button } from "antd";
import "./styles.scss";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import {
  checkEmailUser,
  getLocalStorage,
  showMessage,
} from "../../assets/helper/helper";
import { getAllRoundsActive } from "../../store/action/round.action";
function FilterFundingRound() {
  const { loading } = useSelector((state) => state.loading);
  const { listStage } = useSelector((state) => state.register);
  const userLogin = getLocalStorage("userInfo");
  const dispatch = useDispatch();
  const [selectedStage, setSelectedStage] = useState([]);
  const [valueInput, setValueInput] = useState({
    min: "",
    max: "",
  });
  const { Option } = Select;
  const stage = [];
  // eslint-disable-next-line array-callback-return
  listStage.map((item, index) => {
    stage.push(
      <Option name="stage" value={item.idStage} key={index}>
        {item.name}
      </Option>
    );
  });
  const renderSelect = (placeholder, defaultValue, value, change, child) => {
    return (
      <Select
        mode="multiple"
        placeholder={placeholder}
        style={{ width: "100%" }}
        defaultValue={defaultValue}
        onChange={change}
        value={value}
        maxTagCount="responsive"
      >
        {child}
      </Select>
    );
  };
  const handleChangeStage = (value) => {
    setSelectedStage(value);
  };
  const handleChangeValue = (event) => {
    const { name, value } = event.target;
    setValueInput({
      ...valueInput,
      [name]: value,
    });
  };
  const handleFilterData = () => {
    const parseMin = parseInt(valueInput.min);
    const parseMax = parseInt(valueInput.max);
    const arrayStage = [0];
    if (
      (!isNaN(parseMin) && parseMin < 0) ||
      (!isNaN(parseMax) && parseMax < 0)
    ) {
      return showMessage("error", "Số tiền không được là số âm");
    } else if (parseMin >= parseMax) {
      return showMessage(
        "error",
        "Số tiền cao nhất phải lớn hơn số tiền thấp nhất"
      );
    } else if (userLogin === null) {
      return dispatch(getAllRoundsActive(` `, parseMax, parseMin, arrayStage));
    } else if (userLogin !== null) {
      return dispatch(
        getAllRoundsActive(checkEmailUser(), parseMax, parseMin, selectedStage)
      );
    }
  };
  const handleClear = () => {
    const min = NaN;
    const max = NaN;
    setValueInput({
      min: "",
      max: "",
    });
    setSelectedStage([]);
    let tempStage = [0];
    if (userLogin === null) {
      dispatch(getAllRoundsActive(` `, max, min, tempStage));
    } else if (userLogin !== null) {
      dispatch(getAllRoundsActive(checkEmailUser(), max, min, tempStage));
    }
  };
  return (
    <div className="ffr__wrapper">
      <div className="ffr__container">
        <form>
          <div className="ffr__dislayGrid">
            <div className="box">
              <small>Giai đoạn</small>
              {loading === true ? (
                <Skeleton.Input style={{ width: 200 }} active />
              ) : (
                renderSelect(
                  "Chọn giai đoạn",
                  selectedStage,
                  selectedStage,
                  handleChangeStage,
                  stage
                )
              )}
            </div>
            <div className="box">
              <small>Số tiền thấp nhất</small>
              <Input
                addonAfter=",000,000 VNĐ"
                type="number"
                name="min"
                value={valueInput.min}
                onChange={handleChangeValue}
              />
            </div>
            <div className="box">
              <small>Số tiền cao nhất</small>
              <Input
                addonAfter=",000,000 VNĐ"
                type="number"
                name="max"
                value={valueInput.max}
                onChange={handleChangeValue}
              />
            </div>
            <div className="box ffr__button">
              <Button
                className="ffr__ads"
                type="primary"
                onClick={handleFilterData}
              >
                Áp dụng
              </Button>
              <Button type="primary" className="ffr__ht" onClick={handleClear}>
                Hoàn tác
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FilterFundingRound;
