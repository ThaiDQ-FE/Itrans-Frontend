import React, { useState } from "react";
import { Table, Button, Tooltip, Input } from "antd";
import "./styles.scss";
import "antd/dist/antd.css";
import Swal from "sweetalert2";
import Images from "../../assets/images/images";
import { useDispatch, useSelector } from "react-redux";
import { updateStatusRound } from "../../store/action/round.action";
function PendingFundingRound() {
  const { listRoundPending } = useSelector((state) => state.round);
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const checkRound = () => {
    let round;
    if (typeof listRoundPending === "string") {
      round = [];
      return round;
    } else {
      round = [listRoundPending];
      return round;
    }
  };
  const handleDeleteRound = (round) => {
    Swal.fire({
      icon: "warning",
      title: "Bạn muốn hủy vòng gọi vốn này?",
      heightAuto: true,
      timerProgressBar: false,
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: "Hủy",
      cancelButtonColor: "red",
      confirmButtonText: "Đồng ý",
      confirmButtonColor: "#ff8412",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const object = { id: round.idRound, status: "Hủy" };
        dispatch(updateStatusRound(object));
      }
    });
  };
  const columns = [
    {
      title: "Tên doanh nghiệp",
      dataIndex: "organization",
      key: "organization",
      width: "150px",
      render: (value, round) => (
        <div className="round__tenDoanhNghiep">
          <div className="round__thumbnail">
            <img src={round.logo} alt="logo" />
          </div>
          <p className="round__pTenDoanhNghiep">{value}</p>
        </div>
      ),
    },
    {
      title: "Giai đoạn gọi vốn",
      dataIndex: "stage",
      key: "stage",
      width: "150px",
    },
    {
      title: "Số tiền kêu gọi",
      dataIndex: "fundingAmount",
      key: "fundingAmount",
      width: "160px",
      render: (value) => (
        <div className="cfr__inputStkg">
          <Input
            className="cfr__stkg"
            addonAfter=".000.000 VNĐ"
            defaultValue={value}
            readOnly
          />
        </div>
      ),
    },
    {
      title: "Phần trăm cổ phần",
      dataIndex: "shareRequirement",
      key: "shareRequirement",
      width: "160px",
      render: (value) => (
        <div className="cfr__inputPtcp">
          <Input
            className="cfr__ptcp"
            addonAfter="%"
            defaultValue={value}
            readOnly
          />
        </div>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (value) => (
        <Tooltip placement="top" title={value}>
          <p className="cfr__des">{value}</p>
        </Tooltip>
      ),
    },
    {
      title: "Ngày gọi",
      dataIndex: "startDate",
      key: "startDate",
      width: "115px",
      render: (value) => (
        <div className="cfr__inputStartDate">
          <Input className="cfr__input" defaultValue={value} readOnly />
        </div>
      ),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      width: "125px",
      render: (value) => (
        <div className="cfr__inputEndDate">
          <Input className="cfr__input" defaultValue={value} readOnly />
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "status",
      key: "status",
      width: "50px",
      render: (value, round) => (
        <div className="round__qlvgvAction">
          <div className="round__edit">
            <Tooltip placement="top" title="Chỉnh sửa">
              <img src={Images.PENCIL} alt="edit" />
            </Tooltip>
          </div>
          <div className="round__trash">
            <Tooltip placement="top" title="Xóa">
              <img
                src={Images.TRASH}
                alt="trash"
                onClick={() => handleDeleteRound(round)}
              />
            </Tooltip>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="pfr__wrapper">
      <h3 style={{ marginBottom: 20 }}>VÒNG GỌI VỐN ĐANG CHỜ</h3>
      <div className="pfr__container">
        <Table
          loading={loading}
          className="components-table-demo-nested"
          columns={columns}
          dataSource={checkRound()}
          rowKey="idRound"
          pagination={false}
          bordered
          locale={{
            emptyText: <span>Không có dữ liệu</span>,
          }}
        />
      </div>
    </div>
  );
}
export default PendingFundingRound;
