import React from "react";
import { Modal, Button, Input, Card } from "antd";
import Slider from "react-slick";
import "antd/dist/antd.css";
import "./styles.scss";
import { useSelector } from "react-redux";
import Images from "../../assets/images/images";
import { useDispatch } from "react-redux";
import { updateAcceptDeal, updateDealAccept } from "../../store/action/deal.action";
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
    let investmentIndustryString = "";
    if (detailDeal.investmentIndustry) {
        detailDeal.investmentIndustry.map((value, index) => {
            if (detailDeal.investmentIndustry.length != (index + 1)) {
                investmentIndustryString += value + "/";
            }else {
                investmentIndustryString += value;
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
                    <img style={{ width: 40, height: 40, marginLeft: 100 }}
                        src={Images.ACCEPTED}
                        alt="thumbnail"
                    />
                    <span style={{ marginLeft: 5 }} className="span_text">{detailDeal.nameInvestor}</span>

                    <div style={{ display: 'flex' }}>
                        <div style={{ width: 225 }}>
                            <span className="span_text">Giai đoạn đầu tư: </span>
                            <span>{detailDeal.investmentStages}</span>
                        </div>
                        <span className="span_text">Số tiền đầu tư: </span>
                        <span> {detailDeal.minInvestment} - {detailDeal.maxInvestment} Tỷ </span>
                    </div>
                    <div className="lds__capital" >
                        <span className="span_text">Lĩnh vực đầu tư: </span>
                        <span>{investmentIndustryString}</span>
                    </div>
                    <div className="lds__capital" >
                        <span className="span_text">Khu vực đầu tư: </span>
                        <span>{tasteProvinceRegionString}</span>
                    </div>
                </div>
                <div style={{ marginTop: 10, textAlign: 'center' }} >
                    <span className="span_text">Thông tin về đầu tư</span>

                </div>
                <div style={{ marginTop: 10 }} >
                    <span className="span_text">Số tiền đầu tư: </span>
                    <span>{detailDeal.capitalInvestment} Tỷ</span>
                </div>
                <div style={{ marginTop: 10 }}>
                    <span className="span_text">Ngày bắt đầu: </span>
                    <span>{detailDeal.date}</span>
                </div>
                <div style={{ marginTop: 10 }} >
                    <span className="span_text">Phần trăm cổ phần: </span>
                    <span>{detailDeal.shareRequirement} % </span>
                </div>
                <div style={{ marginTop: 10 }}>
                    <span className="span_text">Mô tả: </span>
                    <span>{detailDeal.description}</span>
                </div>
                <div style={{ display: "flex", marginTop: 10 }}>
                    <div style={{ marginLeft: 'auto' }} ><Button onClick={props.handleAccept} style={{ backgroundColor: "#56db56", color: "#FFFFFF" }}>Chấp nhận </Button> </div>
                    <div style={{ paddingLeft: 5 }}><Button onClick={props.handleReject} style={{ backgroundColor: "red", color: "#FFFFFF" }}>Từ chối </Button> </div>
                </div>
            </div>
        </Modal>
    );
}

export default ModalDealDetail;