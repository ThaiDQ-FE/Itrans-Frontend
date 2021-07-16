import { Input, Button, Tooltip } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postVerificationCode } from "../../store/action/register.action"
import "./styles.scss";
import "antd/dist/antd.css";
import Messages from "../../assets/message/text";
import Images from "../../assets/images/images";
function FormBasicInformation(props) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    gmail: "",
    password: "",
    rePassword: "",
    verification: ""
  })
  const handleChange = (event) => {
    const { value, name } = event.target;
    setUser({
      ...user, [name]: value
    })
  }
  const [errors, setErrors] = useState({
    gmail: "",
    password: "",
    rePassword: "",
    verificationCode: ""
  });
  const [color, setColor] = useState({
    gmail: "",
    password: "",
    rePassword: "",
    verificationCode: ""
  });
  const regex = new RegExp("^([a-zA-Z0-9]{6,30})+@[a-zA-Z0-9]+\.([a-zA-Z0-9]{2,4})+$");
  let check = 0;
  const validate = (values) => {

    let errors = {};
    const verificationCode = JSON.parse(localStorage.getItem("VerificationCode"));
    if (!values.gmail) {
      errors.gmail = 'Gmail không được để trống';
    } else if (!regex.test(user.gmail)) {
      errors.gmail = 'Gmail không đúng định dạng';
    } else {
      errors.name = '';
      check++;
    }
    if (!values.password) {
      errors.password = 'Mật khẩu không được để trống';
    } else if (values.password.length < 8 || values.password.length > 30) {
      errors.password = 'Mật khẩu phải có độ dài 8-30 ký tự';
    } else {
      errors.password = '';
      check++;
    }
    if (!values.rePassword) {
      errors.rePassword = 'Nhập lại mật khẩu không được để trống';
    } else if (values.rePassword !== values.password) {
      errors.rePassword = 'Nhập lại mật khẩu phải giống mật khẩu';
    } else {
      errors.rePassword = '';
      check++;
    }
    if (!values.verificationCode) {
      errors.verificationCode = 'Mã xác thực không được để trống';
    } else if (values.verificationCode !== verificationCode.toString()) {
      errors.verificationCode = 'Mã xác thực không đúng';
    } else {
      errors.verificationCode = '';
      check++;
    }
    return errors;
  }
  const validateColor = (values) => {
    let errors = {};
    const verificationCode = JSON.parse(localStorage.getItem("VerificationCode"));
    if (!values.gmail) {
      errors.gmail = '1px solid red';
    } else if (!regex.test(user.gmail)) {
      errors.gmail = '1px solid red';
    } else {
      errors.name = '';
    }
    if (!values.password) {
      errors.password = '1px solid red';
    } else if (values.password.length < 8 || values.password.length > 30) {
      errors.password = '1px solid red';
    } else {
      errors.password = '';
    }
    if (!values.rePassword) {
      errors.rePassword = '1px solid red';
    } else if (values.rePassword !== values.password) {
      errors.rePassword = '1px solid red';
    } else {
      errors.rePassword = '';
    }
    if (!values.verificationCode) {
      errors.verificationCode = '1px solid red';
    } else if (values.verificationCode !== verificationCode.toString()) {
      errors.verificationCode = '1px solid red';
    } else {
      errors.verificationCode = '';
    }
    return errors;
  }
  const handleNext = () => {
    localStorage.setItem("Form1", JSON.stringify(user));

    setErrors(validate(user));
    setColor(validateColor(user));
    if (check == 4) {
      props.handleNext();
    }
  }
  const handleClick = () => {
    localStorage.setItem("VerificationCode", 1);
    dispatch(postVerificationCode({ gmail: user.gmail, title: 'Code', content: Math.floor(100000 + Math.random() * 900000) }));
  }
  return (
    <div className="fbi__wrapper">
      <div className="fbi__container">
        <h3>{Messages.GENERAL_STEP_1}</h3>
        <form className="fbi__form">
          <div className="fbi__gmail fbi__input">
            <small>Gmail</small>
            <Tooltip title={errors.gmail} placement='topRight' color='red' >
              <Input style={{ 'border': color.gmail }} onChange={handleChange} name="gmail" size="large" />
            </Tooltip>
          </div>
          <div className="fbi__password fbi__input">
            <small>Mật khẩu</small>
            <Tooltip title={errors.password} placement='topRight' color='red' >
              <Input style={{ 'border': color.password }} onChange={handleChange} name="password" size="large" type="password" />
            </Tooltip>
          </div>
          <div className="fbi__confirmPassword fbi__input">
            <small>Nhập lại mật khẩu</small>
            <Tooltip title={errors.rePassword} placement='topRight' color='red' >
              <Input
                style={{ 'border': color.rePassword }}
                onChange={handleChange} name="rePassword"
                size="large"
                type="password"
              />
            </Tooltip>
          </div>
          <div className="fbi__groupGmail fbi__input">
            <div className="fbi__confirmGmail">
              <Button onClick={handleClick} type="primary">Lấy mã xác thực</Button>
            </div>
            <div className="fbi__inputConfirmGmail fbi__input">
              <small>Mã xác thực</small>
              <Tooltip title={errors.verificationCode} placement='topRight' color='red' >
                <Input style={{ 'border': color.verificationCode }} onChange={handleChange} name="verificationCode" type="text" maxLength="6" size="large" />
              </Tooltip>
            </div>
          </div>
        </form>
        <div className="fbi__item fbi__button fbi__itemF">
          <div className="fbi__buttonWrapper" onClick={handleNext}>
            <img src={Images.RIGHT_ARROWS} alt="arrow-next" />
            <p>Tiếp theo</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FormBasicInformation;
