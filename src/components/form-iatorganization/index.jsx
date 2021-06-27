import React, { useEffect, useState } from "react";
import "./styles.scss";
import "antd/dist/antd.css";
import { Input, Select } from "antd";
import Messages from "../../assets/message/text";
import Images from "../../assets/images/images";
import {
  getListIndustry,
  getListProvince,
  getListStage,
} from "../../store/action/register.action";
import { useDispatch, useSelector } from "react-redux";
function FormInformationAboutTheOrganization(props) {
  const { Option } = Select;
  const { TextArea } = Input;
  const children = [];
  const dispatch = useDispatch();
  const { listProvince, listStage, listIndustry } = useSelector(
    (state) => state.register
  );
  const [information, setInformation] = useState({
    name: "",
    industry: "",
    stage: "",
    foundedYear: "",
    numberOfEmployee: "",
    province: "",
    link: "",
    description: "",
  });
  const handleChangeInput = (event) => {
    const { value, name } = event.target;
    setInformation({
      ...information,
      [name]: value,
    });
  };
  const handleNext = () => {
    localStorage.setItem("Form2", JSON.stringify(information));
    props.handleNext();
  };
  const handleChange = (value, action) => {
    if (!action.length) {
      setInformation({
        ...information,
        [action.name]: value,
      });
    } else {
      setInformation({
        ...information,
        [action[0].name]: value,
      });
    }
  };
  const renderListProvince = () => {
    return listProvince.map((item, index) => {
      return (
        <Option name="province" value={item.idProvince} key={index}>
          {item.name}
        </Option>
      );
    });
  };
  const renderListStage = () => {
    return listStage.map((item, index) => {
      return (
        <Option name="stage" value={item.idStage} key={index}>
          {item.name}
        </Option>
      );
    });
  };
  const renderListIndustry = () => {
    return listIndustry.map((item, index) => {
      return (
        <Option
          name="industry"
          value={item.idIndustry}
          key={index}
          disabled={item.active === false}
        >
          {item.name}
        </Option>
      );
    });
  };
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }

  useEffect(() => {
    dispatch(getListProvince());
    dispatch(getListIndustry());
    dispatch(getListStage());
  }, []);
  return (
    <div className="fiato__wrapper">
      <div className="fiato__container">
        <h3>{Messages.ORGANIZATION_STEP_2}</h3>
        <form className="fiato__form">
          <div className="fiato__lineOne">
            <div className="fiato__tenToChuc">
              <Input
                name="name"
                onChange={handleChangeInput}
                placeholder="Tên tổ chức"
                size="large"
              />
            </div>
            <div className="fiato__linhVucKinhDoanh">
              <Select
                name="industry"
                mode="multiple"
                allowClear
                placeholder="Lĩnh vực kinh doanh"
                onChange={handleChange}
                size="large"
              >
                {renderListIndustry()}
              </Select>
            </div>
          </div>
          <div className="fiato__lineTwo">
            <div className="fiato__giaiDoanPhatTrien">
              <Select
                onChange={handleChange}
                name="stage"
                placeholder="Giai đoạn phát triển"
                size="large"
              >
                {renderListStage()}
              </Select>
            </div>
            <div className="fiato__namThanhLap">
              <Input
                name="foundedYear"
                onChange={handleChangeInput}
                placeholder="Năm thành lập"
                type="text"
                size="large"
              />
            </div>
            <div className="fiato__soLuongThanhVien">
              <Input
                name="numberOfEmployee"
                onChange={handleChangeInput}
                placeholder="Số lượng thành viên"
                size="large"
              />
            </div>
          </div>
          <div className="fiato__lineThree">
            <div className="fiato__khuVucHoatDong">
              <Select
                mode="multiple"
                allowClear
                name="province"
                placeholder="Khu vực hoạt động"
                onChange={handleChange}
                size="large"
              >
                {renderListProvince()}
              </Select>
            </div>
            <div className="fiato__linkWebsite">
              <Input
                name="link"
                onChange={handleChangeInput}
                placeholder="Link Website"
                size="large"
              />
            </div>
          </div>
          <div className="fiato__lineFour">
            <div className="fiato__moTaVeDoanhNghiep">
              <TextArea
                name="description"
                rows={5}
                onChange={handleChangeInput}
                placeholder="Mô tả về doanh nghiệp"
                size="large"
              />
            </div>
            <div className="fiato__logo">
              <img src={Images.LOGO_HERE} alt="" className="fiato__userLogo" />
              <input className="fiato__file" type="file" id="file" />
              <label htmlFor="file" className="fiato__span">
                <img
                  src={Images.CAMERA}
                  alt="camera"
                  className="fiato__camera"
                />
              </label>
            </div>
          </div>
        </form>
        <div className="fiato__button">
          <div className="fiato__buttonLeft" onClick={props.handleBack}>
            <img src={Images.RIGHT_ARROWS} alt="" />
            <span>Quay lại</span>
          </div>
          <div onClick={handleNext} className="fiato__buttonRight">
            <img src={Images.RIGHT_ARROWS} alt="" />
            <span>Tiếp theo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FormInformationAboutTheOrganization;
