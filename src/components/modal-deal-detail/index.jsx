import React from "react";
import { Modal, Button, Input, Card } from "antd";
import Slider from "react-slick";
import "antd/dist/antd.css";
import "./styles.scss";
import { useSelector } from "react-redux";
import Images from "../../assets/images/images";
import { useDispatch } from "react-redux";
import { updateAcceptDeal, updateDealAccept } from "../../store/action/deal.action";
import { getLocalStorage } from "../../assets/helper/helper";
function ModalDealDetail(props) {
    const { TextArea } = Input;
    const { detailDeal } = useSelector((deal) => deal.deal);
    let tasteProvinceRegionString = "";
    if (detailDeal.tasteProvinceRegion) {
        detailDeal.tasteProvinceRegion.map((value, index) => {
            if (detailDeal.tasteProvinceRegion.length != (index + 1)) {
                tasteProvinceRegionString += value + ", ";
            }else {
                tasteProvinceRegionString += value;
            }
        })
    }
    const statusDeal = getLocalStorage("statusDeal");
    let investmentIndustryString = "";
    if (detailDeal.investmentIndustry) {
        detailDeal.investmentIndustry.map((value, index) => {
            if (detailDeal.investmentIndustry.length != (index + 1)) {
                investmentIndustryString += value + "/ ";
            }else {
                investmentIndustryString += value;
            }
        })
    }

    let investmentStagesString = "";
    if (detailDeal.investmentStages) {
        detailDeal.investmentStages.map((value, index) => {
            if (detailDeal.investmentStages.length != (index + 1)) {
                investmentStagesString += value + ", ";
            }else {
                investmentStagesString += value;
            }
        })
    }
    let investorTypeString = "";
    if (detailDeal.investorType) {
        detailDeal.investorType.map((value, index) => {
            if (detailDeal.investorType.length != (index + 1)) {
                investorTypeString += value + ", ";
            }else {
                investorTypeString += value;
            }
        })
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
            <div>
                <div id="test">
                    <img style={{ width: 30, height: 30, marginLeft: 100 }}
                        src={detailDeal.logo}
                        alt="thumbnail"
                    />
                    <span style={{ marginLeft: 10, paddingTop:5 }} className="span_text">{detailDeal.nameInvestor}</span>

                    <div style={{ display: 'flex',marginBottom: 5 }}>
                        <div>
                            <span className="span_text">Giai đoạn đầu tư: </span>
                            <span>{investmentStagesString}</span>
                        </div>
                    </div>
                    <div className="lds__capital" style={{ marginBottom: 5 }} >
                    <span className="span_text">Số tiền đầu tư: </span>
                        <span> {detailDeal.minInvestment} - {detailDeal.maxInvestment} Tỷ (VND) </span>
                    </div>
                    <div className="lds__capital" style={{ marginBottom: 5 }} >
                        <span className="span_text">Lĩnh vực đầu tư: </span>
                        <span>{investmentIndustryString}</span>
                    </div>
                    <div className="lds__capital" style={{ marginBottom: 5 }}>
                        <span className="span_text">Khu vực đầu tư: </span>
                        <span>{tasteProvinceRegionString}</span>
                    </div>
                    <div className="lds__capital" style={{ marginBottom: 5 }}>
                        <span className="span_text">Hình thức đầu tư: </span>
                        <span>{investorTypeString}</span>
                    </div>
                </div>
                <div style={{ marginTop: 10, textAlign: 'center' }} >
                    <span className="span_text">Thông tin về đầu tư</span>

                </div>
                <div style={{ marginTop: 10 }} >
                    <span style={{ display:'inline-block',width: 250}} ><b>Số tiền đầu tư:</b> {detailDeal.capitalInvestment} Tỷ (VND)</span>
                   
                    <span className="span_text">Phần trăm cổ phần: </span>
                    <span>{detailDeal.shareRequirement} % </span>
                </div>
                <div style={{ marginTop: 5 }}>
                    <span className="span_text">Ngày bắt đầu: </span>
                    <span>{detailDeal.date}</span>
                </div>
                <div style={{ marginTop: 5 }}>
                    <span className="span_text">Mô tả: </span>
                    <span>{detailDeal.description}</span>
                </div>
                {statusDeal === "PENDING" &&
                <div style={{ display: "flex", marginTop: 10 }}>
                    <div style={{ marginLeft: 'auto' }} ><Button onClick={props.handleAccept} style={{ backgroundColor: "#56db56", color: "#FFFFFF" }}>Chấp nhận </Button> </div>
                    <div style={{ paddingLeft: 5 }}><Button onClick={props.handleReject} style={{ backgroundColor: "red", color: "#FFFFFF" }}>Từ chối </Button> </div>
                </div>
                }
            </div>
        </Modal>
    );
}

export default ModalDealDetail;