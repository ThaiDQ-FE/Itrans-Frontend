import { Input, Button, Tooltip } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { postVerificationCode } from "../../../store/action/register.action";
import "./styles.scss";
import "antd/dist/antd.css";
import Messages from "../../../assets/message/text";
import Images from "../../../assets/images/images";
import axios from "axios";
import {
  doccumentAddDis,
  doccumentRemoveDis,
  getLocalStorage,
} from "../../../assets/helper/helper";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
function FormBasicInformation(props) {
  const dispatch = useDispatch();
  const [checkMail, setCheckMail] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const saveData = getLocalStorage("Form1");

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(null);
    }

    // exit early when we reach 0
    if (!timeLeft) {
      doccumentRemoveDis("fbi_MXT");
      return;
    }

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);
  const [user, setUser] = useState({
    gmail: "",
    password: "",
    rePassword: "",
    verificationCode: "",
  });
  if (saveData !== null) {
    setUser({
      gmail: saveData.gmail,
      password: saveData.password,
      rePassword: saveData.rePassword,
      verificationCode: localStorage.getItem("VerificationCode"),
    });
    setCheckMail(saveData.gmail);
    localStorage.removeItem("Form1");
  }
  const handleChange = (event) => {
    const { value, name } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const [errors, setErrors] = useState({
    gmail: "",
    password: "",
    rePassword: "",
    verificationCode: "",
  });
  const [color, setColor] = useState({
    gmail: "",
    password: "",
    rePassword: "",
    verificationCode: "",
  });
  const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  let check = 0;
  const validate = (values) => {
    let errors = {};
    const mailLength = values.gmail.split("@");
    const verificationCode = JSON.parse(
      localStorage.getItem("VerificationCode")
    );
    if (!values.gmail) {
      errors.gmail = "Gmail không được để trống";
    } else if (!regex.test(user.gmail)) {
      errors.gmail = "Gmail không đúng định dạng";
    } else if (mailLength[0].length < 6 || mailLength[0].length > 30) {
      errors.gmail = "Gmail phải có độ dài từ 6 - 30 kí tự";
    } else {
      errors.name = "";
      check++;
    }
    if (!values.password) {
      errors.password = "Mật khẩu không được để trống";
    } else if (values.password.length < 8 || values.password.length > 30) {
      errors.password = "Mật khẩu phải có độ dài 8-30 ký tự";
    } else {
      errors.password = "";
      check++;
    }
    if (!values.rePassword) {
      errors.rePassword = "Nhập lại mật khẩu không được để trống";
    } else if (values.rePassword !== values.password) {
      errors.rePassword = "Nhập lại mật khẩu phải giống mật khẩu";
    } else {
      errors.rePassword = "";
      check++;
    }

    if (!values.verificationCode) {
      errors.verificationCode = "Mã xác thực không được để trống";
    } else if (values.verificationCode !== verificationCode.toString()) {
      errors.verificationCode = "Mã xác thực không đúng";
    } else {
      errors.verificationCode = "";
      check++;
    }
    return errors;
  };
  const validateColor = (values) => {
    let errors = {};
    const verificationCode = JSON.parse(
      localStorage.getItem("VerificationCode")
    );
    const mailLength = values.gmail.split("@");
    if (!values.gmail) {
      errors.gmail = "1px solid red";
    } else if (!regex.test(user.gmail)) {
      errors.gmail = "1px solid red";
    } else if (mailLength[0].length < 6 || mailLength[0].length > 30) {
      errors.gmail = "1px solid red";
    } else {
      errors.name = "";
    }
    if (!values.password) {
      errors.password = "1px solid red";
    } else if (values.password.length < 8 || values.password.length > 30) {
      errors.password = "1px solid red";
    } else {
      errors.password = "";
    }
    if (!values.rePassword) {
      errors.rePassword = "1px solid red";
    } else if (values.rePassword !== values.password) {
      errors.rePassword = "1px solid red";
    } else {
      errors.rePassword = "";
    }
    if (!values.verificationCode) {
      errors.verificationCode = "1px solid red";
    } else if (values.verificationCode !== verificationCode.toString()) {
      errors.verificationCode = "1px solid red";
    } else {
      errors.verificationCode = "";
    }
    return errors;
  };
  const handleNext = () => {
    console.log("e");
    console.log(checkMail);
    console.log(user.gmail);
    if (checkMail !== user.gmail && !checkMail) {
      if (!user.verificationCode) {
        setErrors({
          verificationCode: "Mã xác thực không được để trống",
        });
        setColor({
          verificationCode: "1px solid red",
        });
      } else {
        console.log("e");
        setErrors({
          verificationCode: "Mã xác thực không đúng",
        });
        setColor({
          verificationCode: "1px solid red",
        });
      }
      setErrors(validate(user));
      setColor(validateColor(user));
    } else {
      console.log("a");
      console.log(user);
      setErrors(validate(user));
      setColor(validateColor(user));
      if (check == 4) {
        localStorage.setItem("Form1", JSON.stringify(user));
        props.handleNext();
      }
    }
  };
  const handleClick = () => {
    axios({
      method: "Get",
      url: `http://localhost:8080/api/v1/auth/existed-account?gmail=${user.gmail}`,
    })
      .then((res) => {
        console.log(res.data);
        if (res.data === true) {
          dispatch(
            postVerificationCode({
              gmail: user.gmail,
              title: "Code",
              content: Math.floor(100000 + Math.random() * 900000),
            })
          );
          setErrors({
            gmail: "",
          });
          setColor({
            gmail: "",
          });
        } else {
          setErrors({
            gmail: "Tài khoản đã tồn tại.",
          });
          setColor({
            gmail: "1px solid red",
          });
        }
      })
      .catch((err) => {});
    localStorage.setItem("VerificationCode", 1);
    setCheckMail(user.gmail);
    setTimeLeft(5);
    doccumentAddDis("fbi_MXT");
  };
  return (
    <div className="fbi__wrapper">
      <div className="fbi__container">
        <h3>{Messages.GENERAL_STEP_1}</h3>
        <form className="fbi__form">
          <div className="fbi__gmail fbi__input">
            <small className="label__fontWeight">Gmail</small>
            <Tooltip title={errors.gmail} placement="topRight" color="red">
              <Input
                style={{ border: color.gmail }}
                onChange={handleChange}
                defaultValue={user.gmail}
                name="gmail"
                size="large"
              />
            </Tooltip>
          </div>
          <div className="fbi__password fbi__input">
            <small className="label__fontWeight">Mật khẩu</small>
            <Tooltip title={errors.password} placement="topRight" color="red">
              <Input.Password
                style={{ border: color.password }}
                onChange={handleChange}
                name="password"
                defaultValue={user.password}
                size="large"
                type="password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              {/* <Input
                style={{ border: color.password }}
                onChange={handleChange}
                name="password"
                defaultValue={user.password}
                size="large"
                type="password"
              /> */}
            </Tooltip>
          </div>
          <div className="fbi__confirmPassword fbi__input">
            <small className="label__fontWeight">Nhập lại mật khẩu</small>
            <Tooltip title={errors.rePassword} placement="topRight" color="red">
              <Input.Password
                style={{ border: color.rePassword }}
                onChange={handleChange}
                name="rePassword"
                defaultValue={user.rePassword}
                size="large"
                type="password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              {/* <Input
                style={{ border: color.rePassword }}
                onChange={handleChange}
                name="rePassword"
                defaultValue={user.rePassword}
                size="large"
                type="password"
              /> */}
            </Tooltip>
          </div>
          <div className="fbi__groupGmail fbi__input">
            <div className="fbi__confirmGmail">
              <Button
                id="fbi_MXT"
                onClick={handleClick}
                type="primary"
                size="small"
                className={`fbi__getCode${
                  timeLeft === null ? "" : " fbi__getCodeDis"
                }`}
              >
                {timeLeft === null ? "Lấy mã xác thực" : timeLeft + " s"}
              </Button>
            </div>
            <div className="fbi__inputConfirmGmail fbi__input">
              <small className="label__fontWeight">Mã xác thực</small>
              <Tooltip
                title={errors.verificationCode}
                placement="topRight"
                color="red"
              >
                <Input
                  style={{ border: color.verificationCode }}
                  onChange={handleChange}
                  name="verificationCode"
                  defaultValue={user.verificationCode}
                  type="text"
                  maxLength="6"
                  size="large"
                />
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
