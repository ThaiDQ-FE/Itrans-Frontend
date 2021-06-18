import React, { useEffect } from "react";
import "./styles.scss";
import "antd/dist/antd.css";
import { Input, Select } from "antd";
import Messages from "../../assets/message/text";
import Images from "../../assets/images/images";
import { getListIndustry, getListProvince, getListStage } from "../../store/action/register.action";
import { useDispatch, useSelector } from "react-redux";
function FormInformationAboutTheOrganization(props) {
  const { Option } = Select;
  const { TextArea } = Input;
  const children = [];
  const dispatch = useDispatch();
  const { listProvince, listStage, listIndustry } = useSelector((state) => state.register);
 
  const renderListProvince = () => {
    return listProvince.map((item, index) => {
      return <Option value={item.idProvince} key={index}>{item.name}</Option>
    })
  }
  const renderListStage = ()=>{
    return listStage.map((item,index)=>{
      return <Option value={item.idStage} key={index} >{item.name}</Option>
    })
  }
  const renderListIndustry = () => {
    return listIndustry.map((item,index)=>{
      return <Option value = {item.idIndustry} key = {index} disabled ={item.active === false}>{item.name}</Option>
    })
  }
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }
 
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
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
              <Input placeholder="Tên tổ chức" size="large" />
            </div>
            <div className="fiato__linhVucKinhDoanh">
              <Select
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
              <Select placeholder="Giai đoạn phát triển" size="large">
              {renderListStage()}
              </Select>
            </div>
            <div className="fiato__namThanhLap">
              <Input placeholder="Năm thành lập" type="text" size="large" />
            </div>
            <div className="fiato__soLuongThanhVien">
              <Input placeholder="Số lượng thành viên" size="large" />
            </div>
          </div>
          <div className="fiato__lineThree">
            <div className="fiato__khuVucHoatDong">
              <Select
                mode="multiple"
                allowClear
                placeholder="Khu vực hoạt động"
                onChange={handleChange}
                size="large"
              >
                {renderListProvince()}
              </Select>
            </div>
            <div className="fiato__linkWebsite">
              <Input placeholder="Link Website" size="large" />
            </div>
          </div>
          <div className="fiato__lineFour">
            <div className="fiato__moTaVeDoanhNghiep">
              <TextArea
                rows={5}
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
          <div className="fiato__buttonRight" onClick={props.handleNext}>
            <img src={Images.RIGHT_ARROWS} alt="" />
            <span>Tiếp theo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FormInformationAboutTheOrganization;
