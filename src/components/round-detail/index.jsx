import React,{useState} from "react";
import "./styles.scss";
import Images from "../../assets/images/images";
import { Card, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import ModalConfirmDeal from "../modal-confirm-deal";
import Swal from "sweetalert2";
import { createDeal } from "../../store/action/deal.action";
function RoundDeail() {
    const dispatch = useDispatch();
    const [dataDeal, setDataDeal] = useState({
        soTienDauTu: "",
        phanTramCoPhan: "",
        moTa: ""
    });
    const [openModal, setOpenModal] = useState(false);
    const handleChangeEdit = (event) => {
        const { value, name } = event.target;
        setDataDeal({
          ...dataDeal,
          [name]: value,
        });
      };
    const handleCloseModal = () => {
        setOpenModal(false);
    }
    const handleClick = ()=>{
        setOpenModal(true);
    }
    const handleCreateDealForm = () => {
        const dealNew = {
            round: roundAndOrganization.idRound,
            mail:userInfo.gmail,
            capitalInvestment: dataDeal.soTienDauTu,
            shareRequirement: dataDeal.phanTramCoPhan,
            description:dataDeal.moTa
        }
        console.log(dealNew);
        Swal.fire({
            icon: "warning",
            title: "Bạn có chắc mô tả thỏa thuận đúng?",
            heightAuto: true,
            timerProgressBar: false,
            showConfirmButton: true,
            showCancelButton: true,
            cancelButtonText: "Hủy",
            cancelButtonColor: "gray",
            confirmButtonText: "Đồng ý",
            confirmButtonColor: "#112D4E",
        }).then(async (result) => {
            if (result.isConfirmed) {
                dispatch(createDeal(dealNew));
                setOpenModal(false);
            }
        });

    }
    const { roundAndOrganization } = useSelector(
        (state) => state.round
    );
    const { listDealByRound } = useSelector(
        (state) => state.round
    );
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    return (
        <div style={{ display: 'flex' }}>
            <img style={{ width: 650, height: 450, marginLeft: 150 }} src="https://i.imgur.com/KhYwqoU.png"></img>
            <div style={{ marginLeft: 20 }} >
                <Card hoverable style={{ backgroundColor: "#F3F3F3" }}>
                    <div style={{ display: 'flex', width: 525 }}>
                        <img
                            style={{ width: 125, height: 125 }}
                            src={
                                Images.USER_AVATA
                            }
                            alt="thumbnail"
                        />

                        <div style={{ marginLeft: 30 }}>
                            <p style={{ fontWeight: 650 }}>
                                <span>
                                    {roundAndOrganization.nameOrg}
                                </span>
                            </p>
                            <p>
                                <span style={{ display: 'inline-block', width: 150 }}>
                                    <img
                                        style={{ width: 18, height: 18, marginRight: 5 }}
                                        src={Images.GMAILROUND}
                                        alt="thumbnail"
                                    /> {roundAndOrganization.gmail}
                                </span>
                                <span style={{ marginLeft: 50 }} >
                                    <img
                                        style={{ width: 18, height: 18, marginRight: 5 }}
                                        src={Images.TIMETABLE}
                                        alt="thumbnail"
                                    />{roundAndOrganization.foundedYear}
                                </span>
                            </p>
                            <p><span style={{ display: 'inline-block', width: 150 }}>
                                <img
                                    style={{ width: 18, height: 18, marginRight: 5 }}
                                    src={Images.NUMBER_EMPLOYESS}
                                    alt="thumbnail"
                                />{roundAndOrganization.numberOfEmp} thành viên</span>
                                <span style={{ marginLeft: 50 }} >
                                    <img
                                        style={{ width: 18, height: 18, marginRight: 5 }}
                                        src={Images.STAGE}
                                        alt="thumbnail"
                                    />{roundAndOrganization.stage}
                                </span>
                            </p>
                            <p>
                                {roundAndOrganization.summary}
                            </p>
                        </div>
                    </div>
                </Card>
                <div style={{ marginTop: 20, marginLeft: 50, fontWeight: 700 }}><p>Thông tin gọi vốn:</p></div>
                <div style={{ marginTop: 10, marginLeft: 200 }}>
                    <p><span style={{ fontWeight: 600 }}>Số tiền muốn kêu gọi: </span>
                        <span>{roundAndOrganization.fundingAmount} tỷ</span>
                    </p>
                    <p><span style={{ fontWeight: 600 }}>Phần trăm cổ phần: </span>
                        <span>{roundAndOrganization.shareRequirement}%</span>
                    </p>
                    <p><span style={{ fontWeight: 600 }}> Ngày bắt đầu: </span>
                        <span>{roundAndOrganization.startDate}</span>
                    </p>
                    <p><span style={{ fontWeight: 600 }}>Ngày kết thúc: </span>
                        <span>{roundAndOrganization.endDate}</span>
                    </p>
                </div>
                {(userInfo.role == "INVESTOR") &&
                    <div style={{ float: 'right' }}>
                        {(listDealByRound == "No Data") && <Button onClick={handleClick} style={{ backgroundColor: "#0f327d", color: "#FFFFFF" }}>Tham gia </Button>}
                        <Button style={{ backgroundColor: "#778899", color: "#FFFFFF" }}>Theo dõi </Button>
                    </div>
                }
                <ModalConfirmDeal
                    openModal={openModal}
                    closeModal={handleCloseModal}
                    handleChangeValue={handleChangeEdit}
                    handleCreateDealForm={handleCreateDealForm}
                />
            </div>
        </div>
    );
}
export default RoundDeail;