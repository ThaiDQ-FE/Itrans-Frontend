import { Input, Button } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {postVerificationCode} from "../../store/action/register.action"
import "./styles.scss";
import "antd/dist/antd.css";
import Messages from "../../assets/message/text";
import Images from "../../assets/images/images";
function FormBasicInformation(props) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    gmail: "",
    password: ""
  })
  const handleChange = (event) => {
    const { value, name } = event.target;
    setUser({
      ...user,[name]:value
    })
  }
  const handleNext = () =>{
    localStorage.setItem("Form1",JSON.stringify(user));
    props.handleNext();
  }
  const handleClick= ()=>{
    dispatch(postVerificationCode(user.gmail));
  }
  return (
    <div className="fbi__wrapper">
      <div className="fbi__container">
        <h3>{Messages.GENERAL_STEP_1}</h3>
        <form className="fbi__form">
          <div className="fbi__gmail fbi__input">
            <Input onChange={handleChange} name="gmail" placeholder="Gmail" size="large" />
          </div>
          <div className="fbi__password fbi__input">
            <Input onChange={handleChange} name="password" size="large" placeholder="Mật khẩu" type="password" />
          </div>
          <div className="fbi__confirmPassword fbi__input">
            <Input
              size="large"
              placeholder="Nhập lại mật khẩu"
              type="password"
            />
          </div>
          <div className="fbi__groupGmail fbi__input">
            <div className="fbi__confirmGmail">
              <Button onClick={handleClick} type="primary">Lấy mã xác thực</Button>
            </div>
            <div className="fbi__inputConfirmGmail fbi__input">
              <Input size="large" placeholder="Mã xác thực" />
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
