import React from "react";
import { Modal, Button } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import { useSelector } from "react-redux";
import { getLocalStorage } from "../../assets/helper/helper";
function ModalDealDetail(props) {
  const { detailDeal } = useSelector((deal) => deal.deal);
  let tasteProvinceRegionString = "";
  if (detailDeal.tasteProvinceRegion) {
    detailDeal.tasteProvinceRegion.map((value, index) => {
      if (detailDeal.tasteProvinceRegion.length != index + 1) {
        tasteProvinceRegionString += value + ", ";
      } else {
        tasteProvinceRegionString += value;
      }
    });
  }
  const statusDeal = getLocalStorage("statusDeal");
  let investmentIndustryString = "";
  if (detailDeal.investmentIndustry) {
    detailDeal.investmentIndustry.map((value, index) => {
      if (detailDeal.investmentIndustry.length != index + 1) {
        investmentIndustryString += value + ", ";
      } else {
        investmentIndustryString += value;
      }
    });
  }

  let investmentStagesString = "";
  if (detailDeal.investmentStages) {
    detailDeal.investmentStages.map((value, index) => {
      if (detailDeal.investmentStages.length != index + 1) {
        investmentStagesString += value + ", ";
      } else {
        investmentStagesString += value;
      }
    });
  }
  let investorTypeString = "";
  if (detailDeal.investorType) {
    detailDeal.investorType.map((value, index) => {
      if (detailDeal.investorType.length != index + 1) {
        investorTypeString += value + ", ";
      } else {
        investorTypeString += value;
      }
    });
  }

  return (
    <Modal
      className="modal-deal-detail"
      maskClosable={true}
      footer={null}
      closable={true}
      destroyOnClose={true}
      visible={props.openModal}
      onCancel={props.closeModal}
    >
      <div className="mdd__info">
        <div className="mdd__nameLogo">
          <img className="mdd__logo" src={detailDeal.logo} alt="logo" />
          <div className="mdd__name">{detailDeal.nameInvestor}</div>
        </div>
        <div className="mdd__infoBasic">
          <div className="mdd__item label__fontWeightV2">
            Lo???i h??nh nh?? ?????u t??:
          </div>
          <div className="mdd__item">{investorTypeString}</div>
          <div className="mdd__item label__fontWeightV2">Giai ??o???n ?????u t??:</div>
          <div className="mdd__item">{investmentStagesString}</div>
          <div className="mdd__item label__fontWeightV2">S??? ti???n ?????u t??:</div>
          <div className="mdd__item">
            {detailDeal.minInvestment} -{" "}
            {detailDeal.maxInvestment + " (T??? VN??)"}
          </div>
          <div className="mdd__item label__fontWeightV2">L??nh v???c ?????u t??:</div>
          <div className="mdd__item">{investmentIndustryString}</div>
          <div className="mdd__item label__fontWeightV2">Khu v???c ?????u t??:</div>
          <div className="mdd__item">{tasteProvinceRegionString}</div>
        </div>
      </div>
      <div className="mdd__infoDeal">
        <span className="mdd__titleDeal">Th??ng tin v??? th???a thu???n</span>
        <div className="mdd__contentDeal">
          <div className="mdd__money">
            <span className="label__fontWeightV2">S??? ti???n ?????u t??: </span>
            <span>{detailDeal.capitalInvestment + "   T??? VN??"}</span>
          </div>
          <div className="mdd__percent">
            <span className="label__fontWeightV2">Ph???n tr??m c??? ph???n: </span>
            <span>{detailDeal.shareRequirement + "%"}</span>
          </div>
        </div>
        <div className="mdd__contentTime">
          <div className="mdd__date">
            <span className="label__fontWeightV2">Ng??y b???t ?????u: </span>
            <span>
              {detailDeal.hasOwnProperty("date")
                ? detailDeal.date.slice(0, 10)
                : ""}
            </span>
          </div>
          <div className="mdd__time">
            <span className="label__fontWeightV2">Th???i gian: </span>
            <span>
              {detailDeal.hasOwnProperty("date")
                ? detailDeal.date.slice(11, 16)
                : ""}
            </span>
          </div>
        </div>

        <div className="mdd__des">
          <span className="label__fontWeightV2">M?? t???: </span>
          <span>{detailDeal.description}</span>
        </div>
      </div>

      {statusDeal === "PENDING" && (
        <div className="mdd__active">
          <Button
            onClick={props.handleAccept}
            className="mdd__accept"
            size="large"
            type="primary"
          >
            Ch???p nh???n th????ng l?????ng
          </Button>
          <Button
            onClick={props.handleReject}
            className="mdd__deny"
            size="large"
            type="primary"
          >
            T??? ch???i th????ng l?????ng
          </Button>
        </div>
      )}
    </Modal>
  );
}

export default ModalDealDetail;
