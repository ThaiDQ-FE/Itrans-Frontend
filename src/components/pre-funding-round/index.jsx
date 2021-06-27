import React from "react";
import { Table, Input, InputNumber, Button } from "antd";
import "./styles.scss";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";
import Images from "../../assets/images/images";
function PreviousFundingRound() {
  const { listRoundPass } = useSelector((state) => state.round);
  const {listDeal} = useSelector(state => state.deal)
  const checkRound = () => {
    let round;
    if (typeof listRoundPass === "string") {
      round = [];
      return round;
    } else if (typeof listRoundPass === "object") {
      if(listRoundPass.length !== 1){
        round = listRoundPass;
        return round;
      }else{
        round = [listRoundPass];
        return round;
      }
    }
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
        title: "Số tiền muốn đầu tư (triệu VNĐ)",
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
    ];
    const data = listDeal.filter(
      (deal) => deal.idRound === record.idRound && deal.status === "ACCEPT"
    );
    
    return (
      <Table
        columns={columns}
        dataSource={data}
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
    { title: "Ngày gọi", dataIndex: "startDate", key: "startDate",
    width:"125px" },
    { title: "Ngày kết thúc", dataIndex: "endDate", key: "endDate",
    width:"125px" },
  ];
  return (
    <div className="pfr__wrapper">
      <h3 style={{marginBottom: 20}}>VÒNG GỌI VỐN TRƯỚC ĐÓ</h3>
      <div className="pfr__container">
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
export default PreviousFundingRound;
