import React from "react";
import "./styles.scss";
import "antd/dist/antd.css";
import { Input, Select } from "antd";
import Messages from "../../assets/message/text";
import Images from "../../assets/images/images";
function FormInvestor(props) {
  const { Option } = Select;
  const { TextArea } = Input;
  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }
  const handleChange = (value) => {
  };
  return (
    <div className="fi__wrapper">
      <div className="fi__container">
        <h3>{Messages.INVESTOR_INFORMATION}</h3>
        <form className="fi__form">
          <div className="fi__lineOne">
            <div className="fi__tenNhaQuyDauTu">
              <Input placeholder="Tên nhà/quỹ đầu tư" size="large" />
            </div>
            <div className="fi__namThanhLap">
              <Input placeholder="Năm thành lập" size="large" />
            </div>
            <div className="fi__soLuongThanhVien">
              <Input placeholder="Số thành viên" size="large" />
            </div>
          </div>
          <div className="fi__lineTwo">
            <div className="fi__linkKhuUl">
              <div className="fi__linkWebsite">
                <Input placeholder="Link website" size="large" />
              </div>
              <div className="fi__khuUl">
                <div className="fi__khuVucHoatDong">
                  <Select
                    mode="multiple"
                    allowClear
                    placeholder="Khu vực hoạt động"
                    onChange={handleChange}
                    size="large"
                  >
                    {children}
                  </Select>
                </div>
                <div className="fi__ul">
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
            </div>
            <div className="fi__logo">
              <img src={Images.LOGO_HERE} alt="" className="fi__userLogo" />
              <input className="fi__file" type="file" id="file" />
              <label htmlFor="file" className="fi__span">
                <img src={Images.CAMERA} alt="camera" className="fi__camera" />
              </label>
            </div>
          </div>
          <div className="fi__lineThree">
            <TextArea
              rows={3}
              placeholder="Mô tả về nhà/quỹ đầu tư"
              size="large"
            />
          </div>
          <p className="fi__word">Thông tin về đầu tư</p>
          <div className="fi__lineFour">
            <div className="fi__giaiDoanMuonDauTu">
              <Select
                mode="multiple"
                allowClear
                placeholder="Giai đoạn muốn đầu tư"
                onChange={handleChange}
                size="large"
              >
                {children}
              </Select>
            </div>
            <div className="fi__linhVucKinhDoanhMuonDauTu">
              <Select
                mode="multiple"
                allowClear
                placeholder="Lĩnh vực kinh doanh muốn đầu tư"
                onChange={handleChange}
                size="large"
              >
                {children}
              </Select>
            </div>
          </div>
          <div className="fi__lineFive">
            <div className="fi__khuVucDauTu">
              <Select
                mode="multiple"
                allowClear
                placeholder="Khu vực đầu tư"
                onChange={handleChange}
                size="large"
              >
                {children}
              </Select>
            </div>
            <div className="fi__ul">
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
        <div className="fi__button">
          <div className="fi__buttonBack" onClick={props.handleBack}>
            <img src={Images.RIGHT_ARROWS} alt="back" />
            <span>Quay lại</span>
          </div>
          <div className="fi__buttonNext" onClick={props.handleNext}>
            <img src={Images.RIGHT_ARROWS} alt="next" />
            <span>Tiếp theo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FormInvestor;
