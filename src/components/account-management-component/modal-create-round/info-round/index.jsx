import React from "react";
import { Input, Tooltip, DatePicker } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import Images from "../../../../assets/images/images";
import { showMessage } from "../../../../assets/helper/helper";
import { storage } from "../../../../configs/firebase";
function InfoInputCreateRound(props) {
  const { TextArea } = Input;
  const handleChangeThumbnail = (e) => {
    let thumbnail = e.target.files[0];
    if (e.target.files[0]) {
      if (thumbnail.type.includes("image")) {
        const uploadThmbnail = storage
          .ref(`images/${thumbnail.name}`)
          .put(thumbnail);
        uploadThmbnail.on(
          "state_changed",
          (snapshot) => {},
          (error) => {},
          () => {
            storage
              .ref("images")
              .child(thumbnail.name)
              .getDownloadURL()
              .then((url) => {
                props.setThumbnail(url);
              });
          }
        );
      } else {
        showMessage("error", "Vui lòng chọn hình ảnh");
      }
    }
  };
  return (
    <>
      <div className="modal__addRoundLineOne">
        <div className="modal__inputMoney">
          <label className="modal__labelAddRound">Số tiền kêu gọi</label>
          <Tooltip
            title={props.fundingAmountError}
            placement="topRight"
            color="red"
          >
            <Input
              className={props.fundingAmountError !== "" ? "error__input" : ""}
              type="number"
              addonAfter="Tỷ VNĐ"
              name="fundingAmount"
              onChange={props.handleChangeInfoRound}
              onBlur={props.handleBlurMoney}
            />
          </Tooltip>
        </div>
        <div className="modal__inputPercent">
          <label className="modal__labelAddRound">Phần trăm cổ phần</label>
          <Tooltip
            title={props.shareRequirementError}
            placement="topRight"
            color="red"
          >
            <Input
              className={
                props.shareRequirementError !== "" ? "error__input" : ""
              }
              type="number"
              addonAfter="%"
              name="shareRequirement"
              onChange={props.handleChangeInfoRound}
              onBlur={props.handleBlurPercent}
            />
          </Tooltip>
        </div>
        <div className="modal__inputStart">
          <label className="modal__labelAddRound">Ngày bắt đầu</label>
          <Tooltip
            title={props.startDateError}
            placement="topRight"
            color="red"
          >
            <DatePicker
              className={props.startDateError !== "" ? "error__input" : ""}
              value={props.startDate}
              onChange={props.setStartDate}
              size="middle"
              style={{ width: "100%" }}
              placeholder=""
              allowClear={false}
              format={props.dateFormat}
              onBlur={props.hanldeBlurStart}
            />
          </Tooltip>
        </div>
        <div className="modal__inputEnd">
          <label className="modal__labelAddRound">Ngày kết thúc</label>
          <Tooltip title={props.endDateError} placement="topRight" color="red">
            <DatePicker
              className={props.endDateError !== "" ? "error__input" : ""}
              value={props.endDate}
              onChange={props.setEndDate}
              size="middle"
              style={{ width: "100%" }}
              placeholder=""
              allowClear={false}
              format={props.dateFormat}
              onBlur={props.handleBlurEnd}
            />
          </Tooltip>
        </div>
      </div>
      <div className="modal__addRoundLineTwo">
        <div className="modal__inputSummary">
          <label className="modal__labelAddRound">Mô tả sơ lược</label>
          <Tooltip title={props.summaryError} placement="topRight" color="red">
            <TextArea
              className={props.summaryError !== "" ? "error__input" : ""}
              rows={5}
              style={{ resize: "none" }}
              name="summary"
              onChange={props.handleChangeInfoRound}
              onBlur={props.handleBlurSum}
            />
          </Tooltip>
        </div>
        <div className="modal__inputThumbnail">
          <label className="modal__labelAddRound">Ảnh mô tả</label>
          <div className="modal__inputThumbnailContainer">
            <img
              src={props.thumbnail === "" ? Images.NO_IMAGE : props.thumbnail}
              alt="user"
              className="modal__crIMG"
            />
            <input
              className="modal__crFILE"
              type="file"
              id="file"
              accept="image/*"
              onChange={handleChangeThumbnail}
            />
            <label
              htmlFor="file"
              className="modal__crLABEL"
              onChange={handleChangeThumbnail}
            >
              <img
                src={Images.CAMERA}
                alt="camera"
                className="modal__crCAMERA"
                onChange={handleChangeThumbnail}
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default InfoInputCreateRound;
