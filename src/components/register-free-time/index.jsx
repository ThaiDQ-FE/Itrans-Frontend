import React, { useEffect, useState } from "react";
import { Button, Calendar, TimePicker, Badge  } from "antd";
import "./styles.scss";
import "antd/dist/antd.css";
import moment from "moment";
import Images from "../../assets/images/images";
import {
  getAllFreeTimeList,
  getFreeTimeList,
  postFreeTime,
  getValidateForButtonThem,
  getValidateForButtonSubmit,
} from "../../store/action/freeTime.action";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
function RegisterFreeTime() {
  const dispatch = useDispatch();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [error, setError] = useState(null);
  const [freeTime, setFreeTime] = useState([]);
  const format = "HH:mm";
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const { listFreeTime, listAllFreeTime } = useSelector(
    (state) => state.freeTime
  );
  var formatDate = moment(date).format("DD-MM-YYYY");
  var formatTime = moment(time).format("HH:mm");
  var formatMonth = moment(date).format("MM");

  const swal = (mess) => {
    return Swal.fire({
      icon: "error",
      title: mess,
      heightAuto: true,
      timerProgressBar: false,
      showConfirmButton: false,
      timer: 2000,
    });
  };
  const message = "Thời gian đã được đăng ký. Vui lòng chọn thời gian khác.";
  const handleClickThem = async () => {
    let finalDT = formatDate + " " + formatTime;
    handleResetAPI();
    const validateMess = await dispatch(getValidateForButtonThem(finalDT, userInfo.id));
    console.log(validateMess);
    const freeDateTime = { freeTime: finalDT, investor: userInfo.id };
    if (freeTime.length <= 0) {
      if (validateMess !== "" && validateMess !== message) {
        swal(validateMess);
      } else if (validateMess === message) {
        swal(validateMess);
      } else {
        freeTime.push(freeDateTime);
      }
    } else {
      if (validateMess !== "" && validateMess !== message) {
        swal(validateMess);
      } else if (validateMess === message) {
        swal(validateMess);
      } else {
        freeTime.push(freeDateTime);
      }
    }
    setTime(undefined);
  };
  const handleResetAPI = () => {
    dispatch(getAllFreeTimeList(userInfo.id));
    dispatch(getFreeTimeList(userInfo.id, formatMonth));
  };

  const handleDelete = (index) => {
    let tempFreeTime = [...freeTime];
    tempFreeTime.splice(index, 1);
    setFreeTime(tempFreeTime);
  };
  const renderListDateTime = () => {
    return freeTime.map((item, index) => {
      return (
        <li className="li__li" key={index}>
          {item.freeTime}
          <div className="li__cancel">
            <img
              src={Images.CANCEL}
              alt="cancel"
              onClick={() => handleDelete(index)}
            />
          </div>
        </li>
      );
    });
  };
  const renderListDateTimeBooked = () => {
    return listFreeTime.map((item, index) => {
      console.log(item);
      return (
          <li
            className={`li__li${
              item.dateTime.includes(formatDate) ? " booked" : " notthing"
            }`}
            key={index}
          >
            {item.dateTime.slice(0,11)} <span style={{fontWeight: 600}}>{item.dateTime.slice(11,17)}</span>
          </li>
      );
    });
  };
  console.log(date);
  useEffect(() => {
    dispatch(getFreeTimeList(userInfo.id, formatMonth));
    dispatch(getAllFreeTimeList(userInfo.id));
  }, []);
  const handleSubmit = () => {
    Swal.fire({
      title: "Bạn muốn đăng ký những ngày đã chọn ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let arrayTemp = [];
        arrayTemp = freeTime;
        dispatch(postFreeTime(arrayTemp));
      }
    });
  };
  return (
    <div className="rft__wrapper">
      <div className="rft__container">
        <div className="rft__left">
          <div className="rft__calendarWrapper">
            <Calendar className="ahihi" value={date} onChange={setDate} />
            <div className="rft__errorThem">{error !== null ? error : ""}</div>
            <div className="rft__timeAndButton">
              <div className="rft__time">
                <TimePicker
                  value={time}
                  onChange={setTime}
                  minuteStep={30}
                  format={format}
                />
              </div>
              <div className="rft__button">
                <Button
                  disabled={date === undefined || time === undefined}
                  onClick={handleClickThem}
                >
                  Thêm
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="rft__right">
          <div className="rft__rightBooking">
            <p>Lựa chọn của bạn</p>
            <div className="rft__ulList">
              <ul>
                {freeTime.length > 0 ? (
                  renderListDateTime()
                ) : (
                  <p
                    style={{
                      textAlign: "center",
                      fontWeight: 400,
                      fontSize: 14,
                    }}
                  >
                    Hãy chọn thời gian rãnh
                  </p>
                )}
              </ul>
              <div className="rft__buttonUl">
                {freeTime.length > 0 ? (
                  <Button onClick={handleSubmit}>Xác nhận</Button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="rft__rightBooked">
            <div className="rft__refresh">
              <img
                src={Images.REFRESH}
                alt="refresh"
                onClick={handleResetAPI}
              />
            </div>
            <p>
              {formatDate === undefined
                ? "Hãy chọn ngày"
                : "Thông tin ngày " + formatDate}
            </p>
            <div className="rft__ulList">
              <ul>{renderListDateTimeBooked()}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RegisterFreeTime;
