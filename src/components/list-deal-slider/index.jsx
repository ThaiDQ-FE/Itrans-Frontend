import React,{useState} from "react"
import "./styles.scss"
import Slider from "react-slick";
import Images from "../../assets/images/images";
import Swal from "sweetalert2";
import ModalDealDetail from "../modal-deal-detail";
import { Card, Modal } from "antd";

function ListDealSlider() {
    var settings = {
        dots: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        customPaging: function (i) {
            return (
                <a>{i + 1}</a>
            );
        }
    };
    const [openModal, setOpenModal] = useState(false);
    const handleChange = () => {
        console.log('e');
        setOpenModal(true);
    }
    const handleCancel = ()=>{
        setOpenModal(false);
    }
    return (
        <>
            <ModalDealDetail
            openModal={openModal}
            handleCancel={handleCancel}
            />
            <div className="lds__mid">
                <div style={{ fontWeight: 700 }}><p>Thông tin những yêu cầu muốn đầu tư: </p></div>
                <Slider {...settings}>

                    <div className="lds__container">
                        <div
                            className="lds__listRound"
                        >
                            <Card hoverable className="lds__itemInves" onClick={handleChange}>
                                <img
                                    src="https://i.imgur.com/KhYwqoU.png"
                                    alt="thumbnail"
                                />

                                <div className="lds__capital">
                                    <span className="span_text">Số tiền đầu tư:</span>
                                    <span> 1tỷ</span>
                                </div>
                                <div className="lds__share">
                                    <span className="span_text">Phần trăm cổ phần: </span>
                                    <span>10</span>
                                </div>
                                <div className="rbii__startDate">
                                    <span className="span_text">Ngày kết thúc: </span>
                                    <span>22/12/2021</span>
                                </div>
                            </Card>
                        </div>
                    </div>
                    <div className="lds__container">
                        <div
                            className="lds__listRound"
                        >
                            <Card hoverable className="lds__itemInves" onClick={handleChange}>
                                <img
                                    src="https://i.imgur.com/KhYwqoU.png"
                                    alt="thumbnail"
                                />

                                <div className="lds__capital">
                                    <span className="span_text">Số tiền đầu tư:</span>
                                    <span> 2tỷ</span>
                                </div>
                                <div className="lds__share">
                                    <span className="span_text">Phần trăm cổ phần: </span>
                                    <span>20</span>
                                </div>
                                <div className="rbii__startDate">
                                    <span className="span_text">Ngày kết thúc: </span>
                                    <span>22/12/2022</span>
                                </div>
                            </Card>
                        </div>
                    </div>
                    <div className="lds__container">
                        <div
                            className="lds__listRound"
                        >
                            <Card hoverable className="lds__itemInves" onClick={handleChange}>
                                <img
                                    src="https://i.imgur.com/KhYwqoU.png"
                                    alt="thumbnail"
                                />

                                <div className="lds__capital">
                                    <span className="span_text">Số tiền đầu tư:</span>
                                    <span> 3tỷ</span>
                                </div>
                                <div className="lds__share">
                                    <span className="span_text">Phần trăm cổ phần: </span>
                                    <span>30</span>
                                </div>
                                <div className="rbii__startDate">
                                    <span className="span_text">Ngày kết thúc: </span>
                                    <span>22/12/2023</span>
                                </div>
                            </Card>
                        </div>
                    </div>
                    <div className="lds__container">
                        <div
                            className="lds__listRound"
                        >
                            <Card hoverable className="lds__itemInves" onClick={handleChange}>
                                <img
                                    src="https://i.imgur.com/KhYwqoU.png"
                                    alt="thumbnail"
                                />

                                <div className="lds__capital">
                                    <span className="span_text">Số tiền đầu tư:</span>
                                    <span> 4tỷ</span>
                                </div>
                                <div className="lds__share">
                                    <span className="span_text">Phần trăm cổ phần: </span>
                                    <span>40</span>
                                </div>
                                <div className="rbii__startDate">
                                    <span className="span_text">Ngày kết thúc: </span>
                                    <span>22/12/2024</span>
                                </div>
                            </Card>
                        </div>
                    </div>
                    <div className="lds__container">
                        <div
                            className="lds__listRound"
                        >
                            <Card hoverable className="lds__itemInves" onClick={handleChange}>
                                <img
                                    src="https://i.imgur.com/KhYwqoU.png"
                                    alt="thumbnail"
                                />

                                <div className="lds__capital">
                                    <span className="span_text">Số tiền đầu tư:</span>
                                    <span> 5tỷ</span>
                                </div>
                                <div className="lds__share">
                                    <span className="span_text">Phần trăm cổ phần: </span>
                                    <span>50</span>
                                </div>
                                <div className="rbii__startDate">
                                    <span className="span_text">Ngày kết thúc: </span>
                                    <span>22/12/2025</span>
                                </div>
                            </Card>
                        </div>
                    </div>
                    <div className="lds__container">
                        <div
                            className="lds__listRound"
                        >
                            <Card hoverable className="lds__itemInves" onClick={handleChange}>
                                <img
                                    src="https://i.imgur.com/KhYwqoU.png"
                                    alt="thumbnail"
                                />

                                <div className="lds__capital">
                                    <span className="span_text">Số tiền đầu tư:</span>
                                    <span> 6tỷ</span>
                                </div>
                                <div className="lds__share">
                                    <span className="span_text">Phần trăm cổ phần: </span>
                                    <span>60</span>
                                </div>
                                <div className="rbii__startDate">
                                    <span className="span_text">Ngày kết thúc: </span>
                                    <span>22/12/2026</span>
                                </div>
                            </Card>
                        </div>
                    </div>
                </Slider>
            </div>
        </>
    );
}
export default ListDealSlider;