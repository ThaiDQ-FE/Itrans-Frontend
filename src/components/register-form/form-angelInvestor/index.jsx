import React from "react";
import { Input, Button, Select } from "antd";
import "./styles.scss";
import "antd/dist/antd.css";
import Messages from "../../../assets/message/text";
import Images from "../../../assets/images/images";
function FormAngelInvestorInformation(props) {
  const { Option } = Select;
  const { TextArea } = Input;
  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }
  const handleChange = (value) => {};
  return (
    <div className="faii__wrapper">
      <div className="faii__container">
        <h3>{Messages.INVESTOR_INFORMATION}</h3>
        <div className="faii__box">
          <form className="faii__form">
            <div className="faii__formLeft">
              <div className="faii__avata">
                <img
                  src={Images.USER_AVATA}
                  alt=""
                  className="faii__userAvata"
                />
                <input className="faii__file" type="file" id="file" />
                <label htmlFor="file" className="faii__span">
                  <img
                    src="https://i.ibb.co/jZmmMRz/camera.png"
                    alt=""
                    className="faii__camera"
                  />
                </label>
              </div>
              <div className="faii__hoVaTenNamSinh">
                <div className="faii__hoVaTen">
                  <Input placeholder="Họ và Tên" size="large" />
                </div>
                <div className="faii__namSinh">
                  <Input placeholder="Năm sinh" size="large" />
                </div>
              </div>
              <div className="faii__moTaVeNhaDauTu">
                <TextArea
                  rows={3}
                  placeholder="Mô tả về nhà đầu tư"
                  size="large"
                />
              </div>
            </div>
            <div className="faii__formMiddle"></div>
            <div className="faii__formRight">
              <div className="faii__avata">
                <img
                  src={Images.LOGO_HERE}
                  alt=""
                  className="faii__userAvata"
                />
                <input className="faii__file" type="file" id="file" />
                <label htmlFor="file" className="faii__span">
                  <img
                    src="https://i.ibb.co/jZmmMRz/camera.png"
                    alt=""
                    className="faii__camera"
                  />
                </label>
              </div>
              <div className="faii__linhVucDauTu">
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Lĩnh vực đầu tư"
                  onChange={handleChange}
                  size="large"
                >
                  {children}
                </Select>
              </div>
              <div className="faii__khuVucMuonDauTu">
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Khu vực muốn đầu tư"
                  onChange={handleChange}
                  size="large"
                >
                  {children}
                </Select>
              </div>
              <div className="faii__ul">
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
          </form>
        </div>
        <div className="faii__button">
          <div className="faii__buttonBack" onClick={props.handleBack}>
            <img src={Images.RIGHT_ARROWS} alt="" />
            <span>Quay lại</span>
          </div>
          <div className="faii__buttonDone">
            <Button type="primary">Hoàn tất</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FormAngelInvestorInformation;
