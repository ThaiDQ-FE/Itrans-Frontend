import React from "react";
import { Button, Modal, DatePicker, Input, Tooltip } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import { getLocalStorage } from "../../../assets/helper/helper";
import moment from "moment";
function ModalMileStone(props) {
  const { TextArea } = Input;
  return (
    <Modal
      className="modal__milestone"
      visible={props.milestoneModal}
      maskClosable={true}
      footer={null}
      closable={true}
      destroyOnClose={true}
      onCancel={props.closeModal}
    >
      <h3 style={{ textAlign: "center" }}>
        {props.editMilestone === false
          ? "Thêm thành tựu"
          : "Cập nhật thành tựu"}
      </h3>
      <form className="milestone__form">
        <div className="milestone__line1">
          <div className="milestone__title">
            <small>Tiêu đề</small>
            <Tooltip title={props.titleError} color="red" placement="topRight">
              {props.editMilestone === false ? (
                <Input
                  className={
                    props.titleError !== "" ? "milestone__titleError" : ""
                  }
                  type="text"
                  onChange={props.handleChangeValue}
                  name="title"
                  onBlur={props.handleBlurTitle}
                />
              ) : (
                <Input
                  className={
                    props.titleError !== "" ? "milestone__titleError" : ""
                  }
                  type="text"
                  defaultValue={getLocalStorage("titleMilestone")}
                  onChange={props.handleChangeValue}
                  name="title"
                  onBlur={props.handleBlurTitle}
                />
              )}
            </Tooltip>
          </div>
          <div className="milestone__date">
            <small>Ngày đạt</small>
            <Tooltip title={props.dateError} color="red" placement="topRight">
              {props.editMilestone === false ? (
                <DatePicker
                  className={
                    props.dateError !== "" ? "milestone__dateError" : ""
                  }
                  placeholder=""
                  allowClear={false}
                  value={props.date}
                  onChange={props.setDate}
                  format={props.dateFormat}
                  onBlur={props.handleBlurDate}
                />
              ) : (
                <DatePicker
                  className={
                    props.dateError !== "" ? "milestone__dateError" : ""
                  }
                  defaultValue={moment(
                    getLocalStorage("dateTimeMilestone"),
                    props.dateFormat
                  )}
                  allowClear={false}
                  onChange={props.setDate}
                  format={props.dateFormat}
                  onBlur={props.handleBlurDate}
                />
              )}
            </Tooltip>
          </div>
        </div>
        <div className="milestone__content">
          <small>Nội dung</small>
          {props.editMilestone === false ? (
            <TextArea
              style={{ resize: "none" }}
              rows={5}
              onChange={props.handleChangeValue}
              name="content"
            />
          ) : (
            <TextArea
              style={{ resize: "none" }}
              defaultValue={getLocalStorage("contentMilestone")}
              rows={5}
              onChange={props.handleChangeValue}
              name="content"
            />
          )}
        </div>
        <div className="milestone__button">
          {props.editMilestone === false ? (
            <Button type="primary" onClick={props.handleSubmit}>
              Thêm
            </Button>
          ) : (
            <Button type="primary" onClick={props.handleUpdata}>
              Cập nhật
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
}

export default ModalMileStone;
