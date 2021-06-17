import React, { useState } from "react";
import { Button, Calendar, TimePicker } from "antd";
import "./styles.scss";
import "antd/dist/antd.css";
import moment from "moment";
import Images from "../../assets/images/images";
import { postFreeTime } from "../../store/action/freeTime.action";
import { useDispatch } from "react-redux";
function RegisterFreeTime() {
  const today = new Date();
  const dispatch = useDispatch();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [error, setError] = useState(null);
  const [freeTime, setFreeTime] = useState([]);
  const format = "HH:mm";
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let formatDate = moment(date).format("DD-MM-YYYY");
  let formatTime = moment(time).format("hh:mm");

  const handleClickThem = () => {
    let finalDT = formatDate + " " + formatTime;
    const freeDateTime = { freeTime: finalDT, investor: userInfo.id };
    if (freeTime.length <= 0) {
      freeTime.push(freeDateTime);
    } else {
      let valueFreeTime = freeTime.map(function (item) {
        return item.freeTime;
      });
      if (valueFreeTime.includes(freeDateTime.freeTime) === true) {
        return setError(
          "Ngày: " + formatDate + ", Giờ: " + formatTime + " đã được chọn!"
        );
      } else {
        freeTime.push(freeDateTime);
      }
    }
    setTime(undefined);
    setError(null);
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
          {item.freeTime}{" "}
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
  const handleSubmit = () => {
    return freeTime.map((item, index) => {
      return dispatch(postFreeTime(item.freeTime, item.investor));
    });
  };
  return (
    <div className="rft__wrapper">
      <div className="rft__container">
        <div className="rft__left">
          <div className="rft__calendarWrapper">
            <Calendar value={date} onChange={setDate} />
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
              <ul>{freeTime.length > 0 ? renderListDateTime() : ""}</ul>
              <div className="rft__buttonUl">
                <Button onClick={handleSubmit}>Xác nhận</Button>
              </div>
            </div>
          </div>
          <div className="rft__rightBooked"></div>
        </div>
      </div>
    </div>
  );
}
export default RegisterFreeTime;
