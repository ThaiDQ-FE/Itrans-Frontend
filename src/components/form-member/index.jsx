import { Input, Button } from "antd";
import React, { useState } from "react";
import "./styles.scss";
import Messages from "../../assets/message/text";
import Images from "../../assets/images/images";
import { useDispatch } from "react-redux";
import { postBasicInformation } from "../../store/action/register.action";
function FormMember(props) {
  const [teamMember, setTeamMember] = useState({
    name: "",
    position: "",
    gmail: "",
    linkcv: "",
  });

  const dispatch = useDispatch();
  const handleChangeInput = (event) => {
    const { value, name } = event.target;
    setTeamMember({
      ...teamMember,
      [name]: value,
    });
  };
  const handleAdd = () => {
    if (!localStorage.getItem("TeamMember")) {
      localStorage.setItem("TeamMember", JSON.stringify([teamMember]));
    } else {
      let listTeamMember = localStorage.getItem("TeamMember");
      let listTeamMemberNew = JSON.parse(listTeamMember);
      listTeamMemberNew.push(teamMember);
      localStorage.setItem("TeamMember", JSON.stringify(listTeamMemberNew));
    }
  };
  const handleConfirm = () => {
    const user = JSON.parse(localStorage.getItem("Form1"));
    dispatch(postBasicInformation(user.gmail, user.password));
  };
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
                <Input
                  onChange={handleChangeInput}
                  name="name"
                  placeholder="Họ và Tên"
                  size="large"
                />
              </div>
              <div className="fm__chucVu">
                <Input
                  nChange={handleChangeInput}
                  name="position"
                  placeholder="Chức vụ"
                  size="large"
                />
              </div>
              <div className="fm__gmail">
                <Input
                  onChange={handleChangeInput}
                  name="gmail"
                  placeholder="Gmail"
                  size="large"
                />
              </div>
              <div className="fm__linkCv">
                <Input
                  onChange={handleChangeInput}
                  name="linkcv"
                  placeholder="Link CV"
                  size="large"
                />
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
                <Button onClick={handleAdd}>Thêm thành viên</Button>
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
            <Button onClick={handleConfirm} type="primary">
              Hoàn tất
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FormMember;
