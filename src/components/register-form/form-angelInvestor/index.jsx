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
        <h2>{Messages.INVESTOR_INFORMATION}</h2>
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
                  <label className="label__fontWeight">Họ và Tên</label>
                  <Input placeholder="VD: Nguyễn Văn A" size="large" />
                </div>
                <div className="faii__namSinh">
                  <label className="label__fontWeight">Năm sinh</label>
                  <Input placeholder="VD: 1998" size="large" />
                </div>
              </div>
              <div className="faii__link">
                <label className="label__fontWeight">Link website</label>
                <Input
                  placeholder="VD: https://www.facebook.com/"
                  size="large"
                />
              </div>
              <div className="faii__truSo">
                <label className="label__fontWeight">Trụ sở chính</label>
                <Select
                  placeholder="VD: Bến Tre"
                  size="large"
                  className="faii__selectHead"
                >
                  {children}
                </Select>
              </div>
              {/* tax code */}
              <div className="faii__taxCode">
                <label className="label__fontWeight">Mã số thuế</label>
                <Input
                  // placeholder="VD: https://www.facebook.com/"
                  size="large"
                />
              </div>
              {/* end tax */}
            </div>
            <div className="faii__formMiddle"></div>
            <div className="faii__formRight">
              <div className="faii__money">
                <label className="label__fontWeight">Số tiền đầu tư</label>
                <div className="faii__moneyInput">
                  <div className="faii__from">
                    <Input size="large" type="number" addonAfter="Tỷ VNĐ" />
                  </div>
                  <span className="faii__spanMoney">-</span>
                  <div className="faii__to">
                    <Input size="large" type="number" addonAfter="Tỷ VNĐ" />
                  </div>
                </div>
              </div>
              <div className="faii__linhVucDauTu">
                <label className="label__fontWeight">Lĩnh vực đầu tư</label>
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="VD: Thực phẩm,May mặc"
                  onChange={handleChange}
                  size="large"
                >
                  {children}
                </Select>
              </div>
              <div className="faii__khuVucMuonDauTu">
                <label className="label__fontWeight">Khu vực đầu tư</label>
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="VD: Miền Bắc,Miền Trung"
                  onChange={handleChange}
                  size="large"
                >
                  {children}
                </Select>
              </div>
              <div className="faii__tinhThanhDauTu">
                <label className="label__fontWeight">Tỉnh/thành đầu tư</label>
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Hồ Chí Minh, Hà Nội"
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
