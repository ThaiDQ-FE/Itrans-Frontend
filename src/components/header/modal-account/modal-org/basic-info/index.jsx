import React from "react";
import { Input, Spin, Tooltip, Select } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import Images from "../../../../../assets/images/images";
function ModalAccountOrganizationBasic(props) {
  return (
    <>
      <div className="maob__imgWrapper">
        <div className="maob__image">
          <img
            src={props.data.logo === "" ? Images.USER_AVATA : props.data.logo}
            alt="user"
            className={`maob__img${
              props.avataError !== "" ? " maob__userAvata" : ""
            }`}
          />
          <input
            className="maob__file"
            type={props.loading === true ? "text" : "file"}
            id="file"
            accept="image/*"
          />
          <Tooltip title={props.avataError} color="red" placement="left">
            <label htmlFor="file" className="maob__span">
              <img src={Images.CAMERA} alt="camera" className="maob__camera" />
              {props.loading === true ? (
                <Spin className="maob__teamlSpin" />
              ) : (
                <></>
              )}
            </label>
          </Tooltip>
        </div>
      </div>

      <div className="maob__info">
        <div className="maob__lineOne">
          <div className="maob__name">
            <label className="label__fontWeight">Tên tổ chức</label>
            <Input
              type="text"
              size="large"
              name="name"
              defaultValue={props.data.name}
            />
          </div>
          <div className="maob__emp">
            <label className="label__fontWeight">Số thành viên</label>
            <Input
              type="number"
              size="large"
              name="numberOfEmp"
              defaultValue={props.data.numberOfEmp}
            />
          </div>
          <div className="maob__year">
            <label className="label__fontWeight">Năm thành lập</label>
            <Input
              type="number"
              size="large"
              name="foundedYear"
              defaultValue={props.data.foundedYear}
            />
          </div>
        </div>
        <div className="maob__lineTwo">
          <div className="maob__web">
            <label className="label__fontWeight">Link website</label>
            <Input
              type="text"
              size="large"
              name="website"
              defaultValue={props.data.website}
            />
          </div>
          <div className="maob__selectIType">
            <label className="label__fontWeight">Giai đoạn hiện tại</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalAccountOrganizationBasic;
