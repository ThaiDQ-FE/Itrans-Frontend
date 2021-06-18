import React, { useEffect, useState } from "react";
import { Button, Calendar, TimePicker } from "antd";
import "./styles.scss";
import "antd/dist/antd.css";
import moment from "moment";
import Images from "../../assets/images/images";
import {
  getFreeTimeList,
  postFreeTime,
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
  const { listFreeTime } = useSelector((state) => state.freeTime);
  var formatDate = moment(date).format("DD-MM-YYYY");
  var formatTime = moment(time).format("hh:mm");
  var formatMonth = moment(date).format("MM");
  var formatMonthYear = moment(date).format("MM-YYYY");
  var todayDate = moment(new Date()).format("DD-MM-YYYY");
  var todayTime = moment(new Date()).format("hh:mm");
  //
  var dateFormatToParse = moment(date).format("YYYY-MM-DD");
  var todayFormatToParse = moment(new Date()).format("YYYY-MM-DD hh:mm");
  const handleClickThem = () => {
    handleResetAPI();
    let finalDT = formatDate + " " + formatTime;
    let parseFinalDateTime = dateFormatToParse + " " + formatTime;
    let parseFinalDT = Date.parse(parseFinalDateTime);
    let parseToday = Date.parse(todayFormatToParse);
    let checkPreDate = parseFinalDT <= parseToday;
    let valueFreeTime = freeTime.map(function (item) {
      return item.freeTime;
    });
    let valueBooked = listFreeTime.map((item) => {
      return item.dateTime;
    });
    console.log(listFreeTime);
    const freeDateTime = { freeTime: finalDT, investor: userInfo.id };
    if (freeTime.length <= 0) {
      if (checkPreDate === true) {
        return setError(
          "Hãy chọn sau ngày: " + todayDate + " và sau: " + todayTime
        );
      } else if (valueBooked.includes(finalDT) === true) {
        return setError(
          "Ngày: " + formatDate + ", Giờ: " + formatTime + " đã được chọn!"
        );
      } else {
        freeTime.push(freeDateTime);
      }
    } else {
      if (checkPreDate === true) {
        setError("Hãy chọn sau ngày: " + todayDate + " và sau: " + todayTime);
      } else if (valueFreeTime.includes(freeDateTime.freeTime) === true) {
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
  const handleResetAPI = () => {
    return dispatch(getFreeTimeList(userInfo.id, formatMonth));
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
      return (
        <>
          <li
            className={`li__li${
              item.dateTime.includes(formatDate) ? " booked" : ""
            }`}
            key={index}
          >
            {item.dateTime}
          </li>
        </>
      );
    });
  };

  useEffect(() => {
    dispatch(getFreeTimeList(userInfo.id, formatMonth));
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
    }).then((result) => {
      if (result.isConfirmed) {
        return freeTime.map((item, index) => {
          return dispatch(postFreeTime(item.freeTime, item.investor));
        });
      }
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
                : "Thông tin tháng " + formatMonthYear}
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
