import React, { useState } from "react";
import { Select, Skeleton, Input, Button } from "antd";
import "./styles.scss";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import {
  checkEmailUser,
  getLocalStorage,
  showMessage,
} from "../../../assets/helper/helper";
import { getAllRoundsActive } from "../../../store/action/round.action";
function FilterFundingRound() {
  const { loading } = useSelector((state) => state.loading);
  const { listStage } = useSelector((state) => state.register);
  const userLogin = getLocalStorage("userInfo");
  const dispatch = useDispatch();
  const [selectedStage, setSelectedStage] = useState([]);
  const [selectedS, setSelectedS] = useState([]);
  const [valueInput, setValueInput] = useState({
    min: "",
    max: "",
  });
  const { Option } = Select;
  const stage = [];
  let arrayS = [];
  for (let i = 0; i < listStage.length; i++) {
    stage.push(
      <Option key={listStage[i].idStage} value={listStage[i].name}>
        {listStage[i].name}
      </Option>
    );
  }
  const renderSelect = (placeholder, value, change, child) => {
    return (
      <Select
        mode="multiple"
        placeholder={placeholder}
        style={{ width: "100%" }}
        onChange={change}
        value={value}
        maxTagCount="responsive"
      >
        {child}
      </Select>
    );
  };
  const handleChangeStage = (value, action) => {
    for (let i = 0; i < action.length; i++) {
      arrayS.push(Number(action[i].key));
    }
    setSelectedStage(arrayS);
    setSelectedS(value);
  };
  const handleChangeValue = (event) => {
    const { name, value } = event.target;
    setValueInput({
      ...valueInput,
      [name]: value,
    });
  };
  const handleFilterData = () => {
    const parseMin = parseFloat(valueInput.min);
    const parseMax = parseFloat(valueInput.max);
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
    setSelectedS([]);
    arrayS = [];
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
                  selectedS,
                  handleChangeStage,
                  stage
                )
              )}
            </div>
            <div className="box">
              <small>Số tiền thấp nhất</small>
              <Input
                addonAfter="Tỷ VNĐ"
                type="number"
                name="min"
                value={valueInput.min}
                onChange={handleChangeValue}
              />
            </div>
            <div className="box">
              <small>Số tiền cao nhất</small>
              <Input
                addonAfter="Tỷ vnd"
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
