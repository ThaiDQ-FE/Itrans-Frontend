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
import {
  getAllRoundActiveV2,
  getAllRoundsActive,
} from "../../../store/action/round.action";
function FilterFundingRound() {
  const { loading } = useSelector((state) => state.loading);
  const { listStage, listIndustry, listProvince, listRegion } = useSelector(
    (state) => state.register
  );
  const dispatch = useDispatch();
  const [selectedStage, setSelectedStage] = useState([]);
  const [selectedS, setSelectedS] = useState([]);
  const [selectedIndus, setSelectedIndus] = useState([]);
  const [selectedI, setSelectedI] = useState([]);
  const [selectedPro, setSelectedPro] = useState([]);
  const [selectedP, setSelectedP] = useState([]);
  const [selectedRe, setSelectedRe] = useState([]);
  const [selectedR, setSelectedR] = useState([]);
  const [valueInput, setValueInput] = useState({
    min: "",
    max: "",
  });
  const { Option } = Select;
  const stage = [];
  const indus = [];
  const pro = [];
  const re = [];
  let arrayS = [];
  let arrayI = [];
  let arrayP = [];
  let arrayR = [];
  for (let i = 0; i < listStage.length; i++) {
    stage.push(
      <Option key={listStage[i].idStage} value={listStage[i].name}>
        {listStage[i].name}
      </Option>
    );
  }
  for (let i = 0; i < listIndustry.length; i++) {
    indus.push(
      <Option key={listIndustry[i].idIndustry} value={listIndustry[i].name}>
        {listIndustry[i].name}
      </Option>
    );
  }
  for (let i = 0; i < listProvince.length; i++) {
    pro.push(
      <Option key={listProvince[i].idProvince} value={listProvince[i].name}>
        {listProvince[i].name}
      </Option>
    );
  }
  for (let i = 0; i < listRegion.length; i++) {
    re.push(
      <Option key={listRegion[i].idRegion} value={listRegion[i].name}>
        {listRegion[i].name}
      </Option>
    );
  }

  const handleChangeStage = (value, action) => {
    for (let i = 0; i < action.length; i++) {
      arrayS.push(Number(action[i].key));
    }
    setSelectedStage(arrayS);
    setSelectedS(value);
  };
  const handleChangeIndus = (value, action) => {
    for (let i = 0; i < action.length; i++) {
      arrayI.push(Number(action[i].key));
    }
    setSelectedIndus(arrayI);
    setSelectedI(value);
  };
  const handleChangePro = (value, action) => {
    for (let i = 0; i < action.length; i++) {
      arrayP.push(Number(action[i].key));
    }
    setSelectedPro(arrayP);
    setSelectedP(value);
  };
  const handleChangeRe = (value, action) => {
    for (let i = 0; i < action.length; i++) {
      arrayR.push(Number(action[i].key));
    }
    setSelectedRe(arrayR);
    setSelectedR(value);
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
    if (
      (!isNaN(parseMin) && parseMin < 0) ||
      (!isNaN(parseMax) && parseMax < 0)
    ) {
      return showMessage("error", "S??? ti???n kh??ng ???????c l?? s??? ??m");
    } else if (parseMin >= parseMax) {
      return showMessage(
        "error",
        "S??? ti???n cao nh???t ph???i l???n h??n s??? ti???n th???p nh???t"
      );
    } else {
      return dispatch(
        getAllRoundActiveV2(
          selectedIndus,
          checkEmailUser(),
          parseMax,
          parseMin,
          selectedPro,
          selectedRe,
          selectedStage
        )
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
    setSelectedIndus([]);
    setSelectedI([]);
    setSelectedPro([]);
    setSelectedP([]);
    setSelectedRe([]);
    setSelectedR([]);
    arrayS = [];
    arrayI = [];
    arrayP = [];
    arrayR = [];
    let tempStage = [0];
    let tempIndus = [0];
    let tempPro = [0];
    let tempRe = [0];
    dispatch(
      getAllRoundActiveV2(
        tempIndus,
        checkEmailUser(),
        max,
        min,
        tempPro,
        tempRe,
        tempStage
      )
    );
  };
  const renderSelect = (value, change, child) => {
    return (
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        onChange={change}
        value={value}
        loading={loading}
      >
        {child}
      </Select>
    );
  };
  return (
    <div className="ffr__wrapper">
      <div className="ffr__container">
        <form>
          <div className="ffr__dislayGrid">
            <div className="box">
              <small className="label__fontWeight">Giai ??o???n</small>
              {renderSelect(selectedS, handleChangeStage, stage)}
            </div>
            <div className="box">
              <small className="label__fontWeight">L??nh v???c ?????u t??</small>
              {renderSelect(selectedI, handleChangeIndus, indus)}
            </div>
            <div className="box">
              <small className="label__fontWeight">Khu v???c ?????u t??</small>
              {renderSelect(selectedR, handleChangeRe, re)}
            </div>
            <div className="box">
              <small className="label__fontWeight">T???nh/th??nh ?????u t??</small>
              {renderSelect(selectedP, handleChangePro, pro)}
            </div>
            <div className="box">
              <small className="label__fontWeight">S??? ti???n th???p nh???t</small>
              <Input
                addonAfter="T??? VN??"
                type="number"
                name="min"
                value={valueInput.min}
                onChange={handleChangeValue}
              />
            </div>
            <div className="box">
              <small className="label__fontWeight">S??? ti???n cao nh???t</small>
              <Input
                addonAfter="T??? VN??"
                type="number"
                name="max"
                value={valueInput.max}
                onChange={handleChangeValue}
              />
            </div>
            <div className="ffr__button">
              <Button
                className="ffr__ads"
                type="primary"
                onClick={handleFilterData}
              >
                ??p d???ng
              </Button>
              <Button type="primary" className="ffr__ht" onClick={handleClear}>
                Ho??n t??c
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default FilterFundingRound;
