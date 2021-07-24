import React, { useState } from "react";
import "./styles.scss";
import Images from "../../assets/images/images";
import { Card, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import ModalConfirmDeal from "../modal-confirm-deal";
import Swal from "sweetalert2";
import moment from "moment";
import { createDeal } from "../../store/action/deal.action";
import ModalUpdateRound from "../modal-update-round";
import { getLocalStorage, localStorages } from "../../assets/helper/helper";
import { updateRound, updateStatusRound, updateStatusRoundDetail } from "../../store/action/round.action";
function RoundDeail() {
    const dispatch = useDispatch();
    const [dataDeal, setDataDeal] = useState({
        soTienDauTu: "",
        phanTramCoPhan: "",
        moTa: ""
    });

    const [dateStart, setDateStart] = useState();
    const [dateEnd, setDateEnd] = useState();
    const [form, setForm] = useState({
        fundingAmount: "",
        shareRequirement: "",
        contentSumary: ""
    });
    var formatDateStart = moment(dateStart).format("DD-MM-YYYY");
    var formatDateEnd = moment(dateEnd).format("DD-MM-YYYY");
    const dateFormat = "DD/MM/YYYY";
    const [urModal, setUrModal] = useState(false);
    const handleCloseModalUr = () => {
        setForm({
            fundingAmount: "",
            shareRequirement: "",
            sumary: ""
        });
        setDateStart(undefined);
        setDateEnd(undefined);
        setUrModal(false);
        localStorage.removeItem("fundingAmount");
        localStorage.removeItem("shareRequirement");
        localStorage.removeItem("contentSumary");
        localStorage.removeItem("dateStart");
        localStorage.removeItem("dateEnd");

    };
    const handleChangeValue = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value,
        });
    };
    const handleClickButtonCapNhat = (e) => {
        e.preventDefault();
        if (dateStart === undefined && dateEnd !== undefined) {
            const object = {
                endDate: formatDateEnd,
                fundingAmount: form.fundingAmount,
                id: roundAndOrganization.idRound,
                mail: userInfo.gmail,
                shareRequirement: form.shareRequirement,
                startDate: getLocalStorage("dateStart"),
                summary: form.contentSumary,
                thumbnail: "abc"
            };
            Swal.fire({
                icon: "warning",
                title: "Bạn chắc chắn muốn cập nhật vòng gọi vốn?",
                heightAuto: true,
                timerProgressBar: false,
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "Đồng ý",
                cancelButtonText: "Hủy",
                confirmButtonColor: "#1890ff",
                cancelButtonColor: "red",
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(updateRound(object));
                    setUrModal(false);
                }
            });
        } else if (dateStart === undefined && dateEnd === undefined) {
            const object = {
                endDate: getLocalStorage("dateEnd"),
                fundingAmount: form.fundingAmount,
                id: roundAndOrganization.idRound,
                mail: userInfo.gmail,
                shareRequirement: form.shareRequirement,
                startDate: getLocalStorage("dateStart"),
                summary: form.contentSumary,
                thumbnail: "abc"
            };
            console.log('e')
            Swal.fire({
                icon: "warning",
                title: "Bạn chắc chắn muốn cập nhật vòng gọi vốn?",
                heightAuto: true,
                timerProgressBar: false,
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "Đồng ý",
                cancelButtonText: "Hủy",
                confirmButtonColor: "#1890ff",
                cancelButtonColor: "red",
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(updateRound(object));
                    setUrModal(false);
                }
            });
        } else if (dateEnd === undefined && dateStart !== undefined) {
            const object = {
                endDate: getLocalStorage("dateEnd"),
                fundingAmount: form.fundingAmount,
                id: roundAndOrganization.idRound,
                mail: userInfo.gmail,
                shareRequirement: form.shareRequirement,
                startDate: formatDateStart,
                summary: form.contentSumary,
                thumbnail: "abc"
            };
            Swal.fire({
                icon: "warning",
                title: "Bạn chắc chắn muốn cập nhật vòng gọi vốn?",
                heightAuto: true,
                timerProgressBar: false,
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "Đồng ý",
                cancelButtonText: "Hủy",
                confirmButtonColor: "#1890ff",
                cancelButtonColor: "red",
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(updateRound(object));
                    setUrModal(false);

                }
            });
        } else if (dateStart !== undefined && dateEnd !== undefined) {
            const object = {
                endDate: formatDateEnd,
                fundingAmount: form.fundingAmount,
                id: roundAndOrganization.idRound,
                mail: userInfo.gmail,
                shareRequirement: form.shareRequirement,
                startDate: formatDateStart,
                summary: form.contentSumary,
                thumbnail: "abc"
            };
            Swal.fire({
                icon: "warning",
                title: "Bạn chắc chắn muốn cập nhật vòng gọi vốn?",
                heightAuto: true,
                timerProgressBar: false,
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "Đồng ý",
                cancelButtonText: "Hủy",
                confirmButtonColor: "#1890ff",
                cancelButtonColor: "red",
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(updateRound(object));
                    setUrModal(false);
                }
            });
        }
    };
    const handleOpenModalUr = () => {
        localStorages("fundingAmount", roundAndOrganization.fundingAmount);
        localStorages("dateStart", roundAndOrganization.startDate);
        localStorages("shareRequirement", roundAndOrganization.shareRequirement);
        localStorages("dateEnd", roundAndOrganization.endDate);
        localStorages("contentSumary", roundAndOrganization.summary);
        form.fundingAmount = roundAndOrganization.fundingAmount;
        form.dateStart = roundAndOrganization.startDate;
        form.shareRequirement = roundAndOrganization.shareRequirement;
        form.dateEnd = roundAndOrganization.endDate;
        form.contentSumary = roundAndOrganization.summary;
        setUrModal(true);
    };
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
    const handleClick = () => {
        setOpenModal(true);
    }
    const handleClickEnd = () => {
        const obj = {
            id: roundAndOrganization.idRound,
            status: "Kết thúc"
        }
        Swal.fire({
            icon: "warning",
            title: "Bạn có chắc kết thúc vòng gọi vốn?",
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
                dispatch(updateStatusRoundDetail(obj, roundAndOrganization.idRound))
            }
        });
    }
    const handleCreateDealForm = () => {
        const dealNew = {
            round: roundAndOrganization.idRound,
            mail: userInfo.gmail,
            capitalInvestment: dataDeal.soTienDauTu,
            shareRequirement: dataDeal.phanTramCoPhan,
            description: dataDeal.moTa
        }
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

                        </div>
                    </div>
                </Card>
                <div className="rd__content">
                    {userInfo.role === "ORGANIZATION" && <div className="rd__action">
                        <img
                            src={Images.PENCIL}
                            alt="edit"
                            onClick={handleOpenModalUr}
                        />
                    </div>
                    }
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
                        <p>
                            {roundAndOrganization.summary}
                        </p>
                    </div>
                    {(userInfo.role == "INVESTOR") &&
                        <div style={{ float: 'right' }}>
                            {(listDealByRound == "No Data" && roundAndOrganization.status !== "EXPIRATION") && <Button onClick={handleClick} style={{ backgroundColor: "#0f327d", color: "#FFFFFF" }}>Tham gia </Button>}
                            <Button style={{ backgroundColor: "#778899", color: "#FFFFFF" }}>Theo dõi </Button>
                        </div>
                    }
                </div>
                {((userInfo.role == "ORGANIZATION") && (listDealByRound.length === 0) && (roundAndOrganization.status !== 'EXPIRATION')) &&
                    <div style={{ float: 'right' }}>
                        <Button size="middle" onClick={handleClickEnd} style={{ backgroundColor: "#778899", color: "#FFFFFF" }}>Kết thúc vòng gọi vốn</Button>
                    </div>}
                <ModalConfirmDeal
                    openModal={openModal}
                    closeModal={handleCloseModal}
                    handleChangeValue={handleChangeEdit}
                    handleCreateDealForm={handleCreateDealForm}
                />

                <ModalUpdateRound
                    handleUpdate={handleClickButtonCapNhat}
                    dateFormat={dateFormat}
                    setDateStart={setDateStart}
                    setDateEnd={setDateEnd}
                    handleChangeValue={handleChangeValue}
                    urModal={urModal}
                    closeModal={handleCloseModalUr}
                />
            </div>
        </div>
    );
}
export default RoundDeail;