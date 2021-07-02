import React, { useEffect } from "react";
import { Table, Button, Tooltip, Input, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  authorizationAccount,
  checkEmailUser,
  convertNumber,
  countDecimals,
  getLocalStorage,
  localStorages,
  showMessage,
} from "../../assets/helper/helper";
import ModalCreateDeal from "../modal-create-deal";
import "./styles.scss";
import "antd/dist/antd.css";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { getAllRoundsActive } from "../../store/action/round.action";
function FundingRoundComponent(props) {
  const { listAllRoundActive } = useSelector((state) => state.round);
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const token = authorizationAccount();
  const arrayStage = [0];
  const min = NaN;
  const max = NaN;
  const [data, setData] = useState({
    soTienMuonDauTu: "",
    phanTramCoPhan: "",
    moTa: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = (round) => {
    localStorages("nameOrg", round.organization);
    localStorages("stageOrg", round.organizationStage);
    localStorages("fundingAmount", round.fundingAmount);
    localStorages("shareReq", round.shareRequirement);
    localStorages("des", round.description);
    localStorages("roundId", round.idRound);
    Swal.fire({
      icon: "warning",
      title: "Bạn muốn tạo deal cho tổ chức " + round.organization,
      heightAuto: true,
      timerProgressBar: false,
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: "Hủy",
      cancelButtonColor: "red",
      confirmButtonText: "Đồng ý",
      confirmButtonColor: "#1890ff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setOpenModal(true);
      } else {
        localStorage.removeItem("nameOrg");
        localStorage.removeItem("stageOrg");
        localStorage.removeItem("fundingAmount");
        localStorage.removeItem("shareReq");
        localStorage.removeItem("des");
        localStorage.removeItem("roundId");
      }
    });
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setData({
      soTienMuonDauTu: "",
      phanTramCoPhan: "",
      moTa: "",
    });
  };
  const handleChangeData = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const postDeal = (object) => {
    axios({
      method: "POST",
      url: "http://localhost:8080/api/v1/deal",
      data: object,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 202) {
          showMessage("error", res.data);
        } else if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: res.data,
            heightAuto: true,
            timerProgressBar: false,
            showConfirmButton: true,
            confirmButtonText: "Đồng ý",
            confirmButtonColor: "#1890ff",
          }).then(async (result) => {
            if (result.isConfirmed) {
              setOpenModal(false);
              localStorage.removeItem("nameOrg");
              localStorage.removeItem("stageOrg");
              localStorage.removeItem("fundingAmount");
              localStorage.removeItem("shareReq");
              localStorage.removeItem("des");
              localStorage.removeItem("roundId");
              dispatch(
                getAllRoundsActive(checkEmailUser(), max, min, arrayStage)
              );
            }
          });
        }
      })
      .catch((err) => {});
  };
  const handleClickButton = () => {
    const parseSTMDT = parseInt(data.soTienMuonDauTu);
    const parsePTCP = parseFloat(data.phanTramCoPhan);
    if (data.soTienMuonDauTu === "") {
      return showMessage("error", "Số tiền muốn đầu tư không được bỏ trống");
    } else if (parseSTMDT % 1 !== 0) {
      return showMessage(
        "error",
        "Số tiền muốn đầu tư phải là số nguyên dương"
      );
    } else if (data.phanTramCoPhan === "") {
      return showMessage("error", "Phần trăm cổ phần không được bỏ trống");
    } else if (parseSTMDT < 1) {
      return showMessage(
        "error",
        "Số tiền muốn đầu tư tối thiểu là 1,000,000 VNĐ"
      );
    } else if (parsePTCP < 0.1 || parsePTCP > 100) {
      return showMessage(
        "error",
        "Phần trăm cố phần phải nằm trong khoảng [0.1 - 100]"
      );
    } else if (countDecimals(parsePTCP) > 2) {
      return showMessage(
        "error",
        "Phần trăm cổ phần phải đúng định dạng [VD: 25.25]"
      );
    } else {
      Swal.fire({
        icon: "warning",
        title: "Bạn chắc chắn muốn tạo DEAL ?",
        heightAuto: true,
        timerProgressBar: false,
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonText: "Hủy",
        cancelButtonColor: "red",
        confirmButtonText: "Đồng ý",
        confirmButtonColor: "#1890ff",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const object = {
            capitalInvestment: parseSTMDT,
            description: data.moTa,
            mail: checkEmailUser(),
            round: getLocalStorage("roundId"),
            shareRequirement: parsePTCP,
          };
          postDeal(object);
        }
      });
    }
  };
  const columns = [
    {
      title: "Tên tổ chức",
      dataIndex: "organization",
      key: "organization",
      width: "160px",
      render: (value, round) => (
        <div className="vgv__tenToChuc">
          <div className="vgv__thumbnail">
            <img src={round.logo} alt="logo" />
          </div>
          <p className="vgv__pTenToChuc">{value}</p>
        </div>
      ),
    },
    {
      title: "Giai đoạn gọi vốn",
      dataIndex: "organizationStage",
      key: "organizationStage",
      width: "160px",
    },
    {
      title: "Số tiền kêu gọi",
      dataIndex: "fundingAmount",
      key: "fundingAmount",
      width: "160px",
      render: (value) => (
        <div className="vgv__inputSTKG">
          <span>{value > 1000 ? convertNumber(value) : value}</span>
          <Input className="vgv__STKG" addonAfter=",000,000 VNĐ" readOnly />
        </div>
      ),
    },
    {
      title: "Phần trăm cổ phần",
      dataIndex: "shareRequirement",
      key: "shareRequirement",
      width: "180px",
      render: (value) => (
        <div className="vgv__inputPTCP">
          <span>{value}</span>
          <Input className="vgv__PTCP" addonAfter="%" readOnly />
        </div>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (value) => (
        <Tooltip placement="top" title={value}>
          <p className="vgv__moTa">{value}</p>
        </Tooltip>
      ),
    },
    {
      title: "Ngày gọi",
      dataIndex: "startDate",
      key: "startDate",
      width: "125px",
      render: (value) => (
        <div className="vgv__inputStartDate">
          <span>{value}</span>
        </div>
      ),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      width: "125px",
      render: (value) => (
        <div className="vgv__inputEndDate">
          <span>{value}</span>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "existDeal",
      key: "existDeal",
      width: "50px",
      render: (value, round) => (
        <div className="vgv__action">
          {value === false ? (
            <div className="vgv__create">
              <Button type="primary" onClick={() => handleOpenModal(round)}>
                Tạo Deal
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
      ),
    },
  ];
  return (
    <div className="frc__wrapper">
      <div className="frc__container">
        <ModalCreateDeal
          openModal={openModal}
          closeModal={handleCloseModal}
          handleChangeData={handleChangeData}
          handleClickButton={handleClickButton}
        />
        <div className="frc__table">
          <Table
            loading={loading}
            className="vgv__table"
            columns={columns}
            dataSource={listAllRoundActive}
            pagination={listAllRoundActive.length > 15 ? true : false}
            rowKey={(round) => round.idRound}
            bordered
            locale={{ emptyText: "Không có dữ liệu" }}
          />
        </div>
      </div>
    </div>
  );
}
export default FundingRoundComponent;
