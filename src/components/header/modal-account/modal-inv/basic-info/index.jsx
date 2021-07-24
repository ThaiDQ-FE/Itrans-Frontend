import { Input, Spin, Tooltip, Select } from "antd";
import React, { useEffect } from "react";
import Images from "../../../../../assets/images/images";
import "antd/dist/antd.css";
import "./styles.scss";
import { useSelector } from "react-redux";
function ModalAccountInvestorBasic(props) {
  const { Option } = Select;
  return (
    <>
      <div className="maib__imgWrapper">
        <div className="maib__image">
          <img
            src={props.data.logo === "" ? Images.USER_AVATA : props.data.logo}
            alt="user"
            className={`maib__img${
              props.avataError !== "" ? " maib__userAvata" : ""
            }`}
          />
          <input
            className="maib__file"
            type={props.loading === true ? "text" : "file"}
            id="file"
            accept="image/*"
          />
          <Tooltip title={props.avataError} color="red" placement="left">
            <label htmlFor="file" className="maib__span">
              <img src={Images.CAMERA} alt="camera" className="maib__camera" />
              {props.loading === true ? (
                <Spin className="maib__teamlSpin" />
              ) : (
                <></>
              )}
            </label>
          </Tooltip>
        </div>
      </div>

      <div className="maib__info">
        <div className="maib__lineOne">
          <div className="maib__name">
            <label className="label__fontWeight">Tên nhà/quỹ đầu tư</label>
            <Input
              type="text"
              size="large"
              name="name"
              defaultValue={props.data.name}
            />
          </div>
          <div className="maib__emp">
            <label className="label__fontWeight">Số thành viên</label>
            <Input
              type="number"
              size="large"
              name="numberOfEmp"
              defaultValue={props.data.numberOfEmp}
            />
          </div>
          <div className="maib__year">
            <label className="label__fontWeight">Năm thành lập</label>
            <Input
              type="number"
              size="large"
              name="foundedYear"
              defaultValue={props.data.foundedYear}
            />
          </div>
        </div>
        <div className="maib__lineTwo">
          <div className="maib__web">
            <label className="label__fontWeight">Link website</label>
            <Input
              type="text"
              size="large"
              name="website"
              defaultValue={props.data.website}
            />
          </div>
          <div className="maib__selectIType">
            <label className="label__fontWeight">Trụ sở chính</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalAccountInvestorBasic;
