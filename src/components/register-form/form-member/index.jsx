import { Input, Button, Tooltip } from "antd";
import React, { useState } from "react";
import "antd/dist/antd.css";
import "./styles.scss";
import Messages from "../../../assets/message/text";
import Images from "../../../assets/images/images";
import { useDispatch } from "react-redux";
import { postBasicInformation } from "../../../store/action/register.action";
import { storage } from "../../../configs/firebase";
import { doccumentAddDis } from "../../../assets/helper/helper";
function FormMember(props) {
  const [teamMember, setTeamMember] = useState({
    name: "",
    position: "",
    linkCv: "",
    image: "",
  });
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    name: "",
    position: "",
    linkCv: "",
  });
  const [color, setColor] = useState({
    name: "",
    position: "",
    linkCv: "",
  });
  let check = 0;
  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Họ và tên không được để trống";
    } else {
      errors.name = "";
      check++;
    }
    if (!values.position) {
      errors.position = "Chức vụ không được để trống";
    } else {
      errors.position = "";
      check++;
    }
    if (!values.linkCv) {
      errors.linkCv = "Link CV không được để trống";
    } else {
      errors.linkCv = "";
      check++;
    }
    return errors;
  };
  const validateColor = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "1px solid red";
    } else {
      errors.name = "";
    }
    if (!values.position) {
      errors.position = "1px solid red";
    } else {
      errors.position = "";
    }
    if (!values.linkCv) {
      errors.linkCv = "1px solid red";
    } else {
      errors.linkCv = "";
    }
    return errors;
  };
  const [url, setUrl] = useState("");
  const handleChangeImage = (e) => {
    document.getElementById("name").disabled = true;
    document.getElementById("position").disabled = true;
    document.getElementById("linkCv").disabled = true;
    document.getElementById("submit").disabled = true;
    const image = e.target.files[0];
    if (image != undefined) {
      const upload = storage.ref(`images/${image.name}`).put(image);
      upload.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              teamMember.image = url;
              setUrl(url);
              document.getElementById("name").disabled = false;
              document.getElementById("position").disabled = false;
              document.getElementById("linkCv").disabled = false;
              document.getElementById("submit").disabled = false;
            });
        }
      );
    } else {
      setUrl(Images.USER_AVATA);
      document.getElementById("name").disabled = false;
      document.getElementById("position").disabled = false;
      document.getElementById("linkCv").disabled = false;
      document.getElementById("submit").disabled = false;
    }
  };
  const handleChangeInput = (event) => {
    const { value, name } = event.target;
    setTeamMember({
      ...teamMember,
      [name]: value,
    });
  };
  let member = () => {
    const teamMember = JSON.parse(localStorage.getItem("TeamMember"));
    if (!teamMember) {
      return (
        <>
          <div>Thêm thành viên nếu có</div>
        </>
      );
    } else {
      return teamMember.map((item, index) => {
        return (
          <div style={{ display: "flex" }}>
            <img src={item.image} />
            <div>
              {item.name}
              <p>{item.position}</p>
            </div>
          </div>
        );
      });
    }
  };

  const handleAdd = () => {
    setErrors(validate(teamMember));
    setColor(validateColor(teamMember));
    console.log(check);
    if (check == 3) {
      if (!localStorage.getItem("TeamMember")) {
        localStorage.setItem("TeamMember", JSON.stringify([teamMember]));
        setTeamMember({
          ...teamMember,
          name: "",
          linkCv: "",
          image: "",
          position: "",
        });
        setUrl(Images.USER_AVATA);
      } else {
        let listTeamMember = localStorage.getItem("TeamMember");
        let listTeamMemberNew = JSON.parse(listTeamMember);
        listTeamMemberNew.push(teamMember);
        localStorage.setItem("TeamMember", JSON.stringify(listTeamMemberNew));
        setTeamMember({
          ...teamMember,
          name: "",
          linkCv: "",
          image: "",
          position: "",
        });
        setUrl(Images.USER_AVATA);
      }
    }
  };
  const handleConfirm = () => {
    doccumentAddDis("fm_confirm");
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
                <img
                  src={url || Images.USER_AVATA}
                  alt=""
                  className="fm__userAvata"
                />
                <input
                  className="fm__file"
                  type="file"
                  id="file"
                  onChange={handleChangeImage}
                />
                <label htmlFor="file" className="fm__span">
                  <img
                    src="https://i.ibb.co/jZmmMRz/camera.png"
                    alt=""
                    className="fm__camera"
                  />
                </label>
              </div>
              <div className="fm__hoVaTen">
                <small className="label__fontWeight">Họ và Tên</small>
                <Tooltip title={errors.name} placement="topRight" color="red">
                  <Input
                    value={teamMember.name}
                    style={{ border: color.name }}
                    id="name"
                    onChange={handleChangeInput}
                    name="name"
                    size="large"
                  />
                </Tooltip>
              </div>
              <div className="fm__chucVu">
                <small className="label__fontWeight">Chức vụ</small>
                <Tooltip
                  title={errors.position}
                  placement="topRight"
                  color="red"
                >
                  <Input
                    id="position"
                    value={teamMember.position}
                    style={{ border: color.position }}
                    onChange={handleChangeInput}
                    name="position"
                    size="large"
                  />
                </Tooltip>
              </div>
              {/* <div className="fm__gmail">
              <Input
                onChange={handleChangeInput}
                name="gmail"
                placeholder="Gmail"
                size="large"
              />
            </div> */}
              <div className="fm__linkCv">
                <small className="label__fontWeight">Link CV</small>
                <Tooltip title={errors.linkCv} placement="topRight" color="red">
                  <Input
                    id="linkCv"
                    value={teamMember.linkCv}
                    style={{ border: color.linkCv }}
                    onChange={handleChangeInput}
                    name="linkCv"
                    size="large"
                  />
                </Tooltip>
                <div className="fm__upload">
                  <input className="fm__uploadPDF" type="file" id="filePDF" />
                  {/* <label htmlFor="filePDF" className="fm__spanPDF">
                    <img
                      src={Images.UPLOAD}
                      alt="icon upload"
                      className="fm__uploadPNG"

                    />
                  </label> */}
                </div>
              </div>
              <div className="fm__buttonThem">
                <Button id="submit" onClick={handleAdd}>
                  Thêm thành viên
                </Button>
              </div>
            </form>
          </div>
          <div className="fm__formMiddle"></div>
          <div className="fm__formRight">
            <div className="fm__member">{member()}</div>
          </div>
        </div>

        <div className="fm__button">
          <div className="fm__buttonBack" onClick={props.handleBack}>
            <img src={Images.RIGHT_ARROWS} alt="" />
            <span>Quay lại</span>
          </div>
          <div className="fm__buttonDone">
            <Button id="fm_confirm" onClick={handleConfirm} type="primary">
              Hoàn tất
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FormMember;
