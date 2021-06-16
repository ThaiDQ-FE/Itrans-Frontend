import React from "react";
import "./styles.scss";
import "antd/dist/antd.css";
import { Input, Select } from "antd";
import Messages from "../../assets/message/text";
import Images from "../../assets/images/images";
function FormInformationAboutTheOrganization(props) {
  const { Option } = Select;
  const { TextArea } = Input;
  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
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
                {children}
              </Select>
            </div>
          </div>
          <div className="fiato__lineTwo">
            <div className="fiato__giaiDoanPhatTrien">
              <Select placeholder="Giai đoạn phát triển" size="large">
                <Option value="jack">Jack (100)</Option>
                <Option value="lucy">Lucy (101)</Option>
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
              <Select placeholder="Khu vục hoạt động" size="large">
                <Option value="HCM">Hồ Chí Minh</Option>
                <Option value="HN">Hà Nội</Option>
                <Option value="...">...</Option>
              </Select>
            </div>
            <div className="fiato__ul">
              <Select
                mode="multiple"
                allowClear
                placeholder=""
                onChange={handleChange}
                size="large"
              >
                {children}
              </Select>
            </div>
          </div>
          <div className="fiato__lineFour">
            <div className="fiato__left">
              <div className="fiato__linkWebsite">
                <Input placeholder="Link Website" size="large" />
              </div>
              <div className="fiato__moTaVeDoanhNghiep">
                <TextArea
                  rows={3}
                  placeholder="Mô tả về doanh nghiệp"
                  size="large"
                />
              </div>
            </div>
            <div className="fiato__right">
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
