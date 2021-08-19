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
import {
  updateRound,
  updateStatusRound,
  updateStatusRoundDetail,
} from "../../store/action/round.action";
function RoundDeail() {
  const dispatch = useDispatch();
  const [dataDeal, setDataDeal] = useState({
    soTienDauTu: "",
    phanTramCoPhan: "",
    moTa: "",
  });

  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();
  const [form, setForm] = useState({
    fundingAmount: "",
    shareRequirement: "",
    contentSumary: "",
  });
  var formatDateStart = moment(dateStart).format("DD-MM-YYYY");
  var formatDateEnd = moment(dateEnd).format("DD-MM-YYYY");
  const dateFormat = "DD/MM/YYYY";
  const [urModal, setUrModal] = useState(false);
  const handleCloseModalUr = () => {
    setForm({
      fundingAmount: "",
      shareRequirement: "",
      sumary: "",
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
        thumbnail: roundAndOrganization.logo,
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
        thumbnail: roundAndOrganization.logo,
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
    } else if (dateEnd === undefined && dateStart !== undefined) {
      const object = {
        endDate: getLocalStorage("dateEnd"),
        fundingAmount: form.fundingAmount,
        id: roundAndOrganization.idRound,
        mail: userInfo.gmail,
        shareRequirement: form.shareRequirement,
        startDate: formatDateStart,
        summary: form.contentSumary,
        thumbnail: roundAndOrganization.logo,
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
        thumbnail: roundAndOrganization.logo,
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
  };
  const handleClick = () => {
    setOpenModal(true);
  };
  const handleClickEnd = () => {
    const obj = {
      id: roundAndOrganization.idRound,
      status: "Kết thúc",
    };
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
        dispatch(updateStatusRoundDetail(obj, roundAndOrganization.idRound));
      }
    });
  };
  const handleCreateDealForm = () => {
    const dealNew = {
      round: roundAndOrganization.idRound,
      mail: userInfo.gmail,
      capitalInvestment: dataDeal.soTienDauTu,
      shareRequirement: dataDeal.phanTramCoPhan,
      description: dataDeal.moTa,
    };
    Swal.fire({
      icon: "warning",
      title: "Bạn có chắc mô tả thỏa thuận đúng?",
      heightAuto: true,
      timerProgressBar: false,
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: "Hủy",
      confirmButtonText: "Đồng ý",
      confirmButtonColor: "#1890ff",
      cancelButtonColor: "red",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(createDeal(dealNew, roundAndOrganization.gmail));
        setOpenModal(false);
      }
    });
  };
  const { roundAndOrganization } = useSelector((state) => state.round);
  const { listDealByRound } = useSelector((state) => state.round);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <div className="roundDetail__wrapper">
      <img
        className="roundDetail__img"
        src={roundAndOrganization.thumbnail}
        alt="round-detail-img"
      ></img>
      <div className="roundDetail__info">
        <div className="roundDetail__infomation">
          <img
            className="roundDetail__logo"
            src={
              roundAndOrganization.logo === ""
                ? Images.NO_IMAGE
                : roundAndOrganization.logo
            }
            alt=""
          />
          <div className="roundDetail__ownerInfo">
            <span className="roundDetail__owner">
              {roundAndOrganization.nameOrg}
            </span>
            <div className="roundDetail__gmailYear">
              <div className="roundDetail__gmail">
                <img
                  className="icon__Image"
                  src={Images.WEBSITE}
                  alt="website"
                />
                <span>{roundAndOrganization.linkWeb}</span>
              </div>
              <div className="roundDetail__year">
                <img
                  className="icon__Image"
                  src={Images.CALENDAR}
                  alt="calendar"
                />
                <span>{roundAndOrganization.foundedYear}</span>
              </div>
            </div>
            <div className="roundDetail__empStage">
              <div className="roundDetail__emp">
                <img
                  className="icon__Image"
                  src={Images.EMPLOYEES}
                  alt="emplouee"
                />
                <span>{roundAndOrganization.numberOfEmp + " thành viên"}</span>
              </div>
              <div className="roundDetail__stage">
                <img className="icon__Image" src={Images.STAGE} alt="stage" />
                <span>{roundAndOrganization.stage}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="rd__content">
          <span className="rd__title">Thông tin vòng gọi vốn</span>
          <div className="rd__moneyPercent">
            <div className="rd__fundingMoney">
              <span className="label__fontWeightV2">Số tiền kêu gọi: </span>
              <span>{roundAndOrganization.fundingAmount + " Tỷ VNĐ"}</span>
            </div>
            <div className="rd__percent">
              <span className="label__fontWeightV2">Phần trăm cổ phần: </span>
              <span>{roundAndOrganization.shareRequirement + "%"}</span>
            </div>
          </div>
          <div className="rd__startEnd">
            <div className="rd__startDate">
              <span className="label__fontWeightV2">Ngày bắt đầu: </span>
              <span>{roundAndOrganization.startDate}</span>
            </div>
            <div className="rd__endDate">
              <span className="label__fontWeightV2">Ngày kết thúc: </span>
              <span>{roundAndOrganization.endDate}</span>
            </div>
          </div>
          <div className="rd__summary">
            <span className="label__fontWeightV2">Mô tả sơ lược: </span>
            <span>{roundAndOrganization.summary}</span>
          </div>
          {userInfo.role === "ORGANIZATION" && (
            <img
              className="rd__editInfo"
              src={Images.PENCIL}
              alt="edit"
              onClick={handleOpenModalUr}
            />
          )}
          {userInfo.role == "INVESTOR" && (
            <div className="rd__joinRound">
              {listDealByRound == "No Data" &&
                roundAndOrganization.status !== "EXPIRATION" && (
                  <Button
                    className="rd__joinButton"
                    onClick={handleClick}
                    type="primary"
                    size="large"
                  >
                    Tham gia{" "}
                  </Button>
                )}
            </div>
          )}
          {userInfo.role == "ORGANIZATION" &&
            listDealByRound.length === 0 &&
            roundAndOrganization.status !== "EXPIRATION" &&
            roundAndOrganization.status !== "PENDING" && (
              <div className="rd__endRound">
                <Button
                  className="rd__buttonEndRound"
                  size="large"
                  onClick={handleClickEnd}
                  type="primary"
                >
                  Kết thúc vòng gọi vốn
                </Button>
              </div>
            )}
        </div>

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
