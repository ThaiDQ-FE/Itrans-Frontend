import React from "react";
import { Modal } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import FormCreateRound from "./form-round";
import CertificateRound from "./list-certificate";
import InfoInputCreateRound from "./info-round";
function ModalAddRound(props) {
  return (
    <Modal
      className="modal__addRound"
      visible={props.open}
      maskClosable={true}
      footer={null}
      closable={true}
      destroyOnClose={true}
      onCancel={props.close}
    >
      <div className="modal__addRoundWrapper">
        <InfoInputCreateRound
          dateFormat={props.dateFormat}
          thumbnail={props.thumbnail}
          setThumbnail={props.setThumbnail}
          handleChangeInfoRound={props.handleChangeInfoRound}
          startDate={props.startDate}
          endDate={props.endDate}
          setStartDate={props.setStartDate}
          setEndDate={props.setEndDate}
          startDateError={props.startDateError}
          endDateError={props.endDateError}
          fundingAmountError={props.fundingAmountError}
          shareRequirementError={props.shareRequirementError}
          summaryError={props.summaryError}
          handleBlurMoney={props.handleBlurMoney}
          handleBlurPercent={props.handleBlurPercent}
          hanldeBlurStart={props.hanldeBlurStart}
          handleBlurEnd={props.handleBlurEnd}
          handleBlurSum={props.handleBlurSum}
        />
        <div className="modal__addRoundLineThree">
          <div className="modal__labelAddRound">
            Tài liệu - Chứng chỉ (Nếu có)
          </div>
          <CertificateRound
            listCertificate={props.listCertificate}
            setListCertificate={props.setListCertificate}
            handleDelete={props.handleDelete}
          />
        </div>
        <div className="modal__addRoundLineFour">
          <label className="modal__labelAddRound">Tiêu đề - Nội dung</label>
          <FormCreateRound onSubmit={props.onSubmit} />
        </div>
      </div>
    </Modal>
  );
}

export default ModalAddRound;
