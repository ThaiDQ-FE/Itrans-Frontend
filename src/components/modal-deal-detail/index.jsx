import React from "react";
import { Modal, Button, Input, Card } from "antd";
import Slider from "react-slick";
import "antd/dist/antd.css";
import "./styles.scss";
function ModalDealDetail(props) {
    const { TextArea } = Input;
    return (
        <Modal
            className="modal-deal-detail"
            visible={props.openModal}
            footer={null}
            closable={false}
            destroyOnClose={true}
            onCancel={props.closeModal}
        >
            <div>
                <img style={{width:400, height:250}}
                    src="https://i.imgur.com/KhYwqoU.png"
                    alt="thumbnail"
                />

                <div style={{fontSize:20}} className="lds__capital">
                    <span>Nhà đầu tư navy</span>
                </div>
                <div style={{marginTop:10}} className="lds__share">
                    <span className="span_text">Khu vực muốn đầu tư: </span>
                    <span>Long An</span>
                </div>
                <div style={{marginTop:10}} className="rbii__startDate">
                    <span className="span_text">Giai đoạn đầu tư: </span>
                    <span>Preseed</span>
                </div>
                <div style={{marginTop:10}} className="rbii__startDate">
                    <span className="span_text">Số tiền đầu tư: </span>
                    <span>5 Tỉ</span>
                </div>
                <div style={{marginTop:10}} className="rbii__startDate">
                    <span className="span_text">Ngày bắt đầu: </span>
                    <span>22/12/2021</span>
                </div>
                <div style={{marginTop:10}} className="rbii__startDate">
                    <span className="span_text">Mô tả: </span>
                    <span>Với mục tiêu phát triển tiên phong và bền vững từ khi thành lập,Ánh dương vi na đã xây dựng
          cho doanh nghiệp đó tầm nhìn và sứ mệnh như sau</span>
                </div>
                <div style={{textAlign:"end"}}><Button onClick={props.handleCancel} style={{backgroundColor:"#FF7D04", color:"#FFFFFF"}}>Hủy </Button> </div>
            </div>
        </Modal>
    );
}

export default ModalDealDetail;