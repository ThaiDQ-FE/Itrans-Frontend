import { Input, Button } from "antd";
import React from "react";
import "./styles.scss";
import Messages from "../../assets/message/text";
import Images from "../../assets/images/images";
function FormMember(props) {
  return (
    <div className="fm__wrapper">
      <div className="fm__container">
        <h3>{Messages.ORGANIZATION_STEP_3}</h3>
        <div className="fm__box">
          <div className="fm__formLeft">
            <form className="fm__form">
              <div className="fm__avata">
                <img src={Images.USER_AVATA} alt="" className="fm__userAvata" />
                <input className="fm__file" type="file" id="file" />
                <label htmlFor="file" className="fm__span">
                  <img
                    src="https://i.ibb.co/jZmmMRz/camera.png"
                    alt=""
                    className="fm__camera"
                  />
                </label>
              </div>
              <div className="fm__hoVaTen">
                <Input placeholder="Họ và Tên" size="large" />
              </div>
              <div className="fm__chucVu">
                <Input placeholder="Chức vụ" size="large" />
              </div>
              <div className="fm__gmail">
                <Input placeholder="Gmail" size="large" />
              </div>
              <div className="fm__linkCv">
                <Input placeholder="Link CV" size="large" />
                <div className="fm__upload">
                  <input className="fm__uploadPDF" type="file" id="filePDF" />
                  <label htmlFor="filePDF" className="fm__spanPDF">
                    <img
                      src={Images.UPLOAD}
                      alt="icon upload"
                      className="fm__uploadPNG"
                    />
                  </label>
                </div>
              </div>
              <div className="fm__buttonThem">
                <Button>Thêm thành viên</Button>
              </div>
            </form>
          </div>
          <div className="fm__formMiddle"></div>
          <div className="fm__formRight">
            <div className="fm__member">Hãy thêm thành viên(nếu có).</div>
          </div>
        </div>

        <div className="fm__button">
          <div className="fm__buttonBack" onClick={props.handleBack}>
            <img src={Images.RIGHT_ARROWS} alt="" />
            <span>Quay lại</span>
          </div>
          <div className="fm__buttonDone">
            <Button type="primary">Hoàn tất</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FormMember;
