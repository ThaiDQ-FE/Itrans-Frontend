import React, { useEffect, useState } from "react";
import { Table, Input, InputNumber, Button } from "antd";
import "./styles.scss";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import { getListDeal } from "../../store/action/deal.action";
function CurrentFundingRound() {
  const { TextArea } = Input;
  const { listRoundActive } = useSelector((state) => state.round);
  const {listDeal} = useSelector(state => state.deal)
  const checkRound = () => {
    let round;
    if (Object.keys(listRoundActive).length === 0) {
      round = [];
      return round;
    } else {
      round = [listRoundActive];
      return round;
    }
  };
  const hihi = (record) => {
    console.log(record);
  };
  const expandedRowRender = (record, index) => {
    const columns = [
      { title: "Tên nhà đầu tư", dataIndex: "investor", key: "investor",render: (value,round)=>(
        <div className="round__tenDoanhNghiep">
          <div className="round__thumbnail">
            <img src={round.logo} alt="logo" />
          </div>
          <p className="round__pTenDoanhNghiep">{value}</p>
        </div>
      ) },
      {
        title: "Phần trăm cổ phần",
        dataIndex: "shareRequirement",
        key: "shareRequirement",
      },
      {
        title: "Số tiền muốn đầu tư",
        dataIndex: "capitalInvestment",
        key: "capitalInvestment",
      },
      {
        title: "Ngày đăng",
        dataIndex: "date",
        key: "date",
      },
      {
        title: "Ghi chú",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "",
        dataIndex: "status",
        key: "status",
        render: (value, record) => (
          <div>
            {value === "pending" ? (
              <>
                <Button type="primary">Chấp nhận</Button>
                <Button
                  onClick={() => {
                    hihi(record);
                  }}
                  type="primary"
                  danger
                >
                  Hủy deal
                </Button>
              </>
            ) : (
              <>
                <Button type="primary" disabled>
                  Đã Chấp nhận
                </Button>
                <Button
                  onClick={() => {
                    hihi(record);
                  }}
                  type="primary"
                  danger
                >
                  Hủy deal
                </Button>
              </>
            )}
          </div>
        ),
      },
    ];
    // const data = dataDeal.filter(
    //   (deal) => deal.idRound === record.idRound && deal.status !== "delete"
    // );
    return (
      <Table
        columns={columns}
        dataSource={listDeal}
        pagination={false}
        rowKey="idDeal"
      />
    );
  };
  const columns = [
    {
      title: "Tên doanh nghiệp",
      dataIndex: "organization",
      key: "organization",
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
    },
    {
      title: "Số tiền kêu gọi",
      dataIndex: "fundingAmount",
      key: "fundingAmount",
    },
    {
      title: "Phần trăm cổ phần",
      dataIndex: "shareRequirement",
      key: "shareRequirement",
    },
    { title: "Ghi chú", dataIndex: "description", key: "description" },
    { title: "Ngày gọi", dataIndex: "startDate", key: "startDate" },
    { title: "Ngày kết thúc", dataIndex: "endDate", key: "endDate" },
    {
      title: "",
      dataIndex: "status",
      key: "status",
      render: (value) => (
        <div>
          {value === "active" ? <Button type="primary">Đóng</Button> : <></>}
        </div>
      ),
    },
  ];
  // const data = dataRound.filter((round) => round.status === "active");
  const a = [{}];
  return (
    <div className="rfr__wrapper">
      <div className="rfc__container">
        <Table
          className="components-table-demo-nested"
          columns={columns}
          expandable={{ expandedRowRender }}
          dataSource={checkRound()}
          rowKey="idRound"
        />
      </div>
    </div>
  );
}
export default CurrentFundingRound;
