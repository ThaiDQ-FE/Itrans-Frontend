import React, { useState } from "react";
import { Button, Calendar } from "antd";
import "./styles.scss";
import "antd/dist/antd.css";
import { TimePicker } from "antd";
function RegisterFreeTime() {
  const today = new Date();
  const [value, onChange] = useState();
  const [dates, setDates] = useState([]);
  const format = "HH:mm";
  const onClicked = () => {
    setDates(value);
  };
  return (
    <div className="rft__wrapper">
      <div className="rft__container">
        <div className="rft__left">
          <div className="rft__calendarWrapper">
            <Calendar />
            <div className="rft__timeAndButton">
              <div className="rft__time">
                <TimePicker minuteStep={30} format={format} />
              </div>
              <div className="rft__button">
                <Button>Thêm</Button>
              </div>
            </div>
          </div>
          <div className="rft__ulList">
            <ul>
              <li>d</li>
              <li>d</li>
              <li>d</li>
              <li>d</li>
              <li>d</li>
              <li>d</li>
            </ul>
          </div>
        </div>
        <div className="rft__right">sd</div>
      </div>
    </div>
  );
}
export default RegisterFreeTime;
