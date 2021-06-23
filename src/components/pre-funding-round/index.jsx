import React, { useEffect, useState } from "react";
import { Table, Input, InputNumber, Button } from "antd";
import "./styles.scss";
import "antd/dist/antd.css";
function PreviousFundingRound() {
  const { TextArea } = Input;
  const [dataRound, setDataRound] = useState([]);
  const [dataDeal, setDataDeal] = useState([]);
  useEffect(() => {
    const dataRound = [
      {
        idRound: 2,
        vongGoiVon: "vòng 1",
        tenDoanhNghiep: "Baby Shark",
        giaiDoanGoiVon: "Series B",
        soTienKeuGoi: "500.000.000",
        phanTramCoPhan: "20%",
        ghiChu: "description",
        ngayGoi: "21-06-2021",
        ngayKetThuc: "21-07-2021",
        status: "active",
      },
      {
        idRound: 1,
        vongGoiVon: "vòng 1",
        tenDoanhNghiep: "Baby Shark",
        giaiDoanGoiVon: "Series B",
        soTienKeuGoi: "600.000.000",
        phanTramCoPhan: "20%",
        ghiChu: "description",
        ngayGoi: "15-06-2021",
        ngayKetThuc: "15-07-2021",
        status: "done",
      },
    ];
    const dataDeal = [
      {
        idDeal: 1,
        idRound: 1,
        thoaThuan: "Deal 1",
        soTienMuonDauTu: "100.000.000",
        phanTramCoPhan: "5%",
        ngayDangDeal: "23-06-2021",
        tenNhaDauTu: "abc",
        ghiChu: "description",
        status: "accept",
      },
      {
        idDeal: 2,
        idRound: 1,
        thoaThuan: "Deal 2",
        soTienMuonDauTu: "300.000.000",
        phanTramCoPhan: "20%",
        ngayDangDeal: "26-06-2021",
        tenNhaDauTu: "abc",
        ghiChu: "description",
        status: "pending",
      },
      ,
      {
        idDeal: 3,
        idRound: 1,
        thoaThuan: "Deal 3",
        soTienMuonDauTu: "450.000.000",
        phanTramCoPhan: "20%",
        ngayDangDeal: "29-06-2021",
        tenNhaDauTu: "abc",
        ghiChu: "description",
        status: "accept",
      },
    ];
    setDataDeal(dataDeal);
    setDataRound(dataRound);
  }, []);
  const expandedRowRender = (record, index) => {
    const columns = [
      { title: "Thỏa thuận", dataIndex: "thoaThuan", key: "thoaThuan" },
      { title: "Tên nhà đầu tư", dataIndex: "tenNhaDauTu", key: "tenNhaDauTu" },
      {
        title: "Phần trăm cổ phần",
        dataIndex: "phanTramCoPhan",
        key: "phanTramCoPhan",
      },
      {
        title: "Số tiền muốn đầu tư",
        dataIndex: "soTienMuonDauTu",
        key: "soTienMuonDauTu",
      },
      {
        title: "Ngày đăng",
        dataIndex: "ngayDangDeal",
        key: "ngayDangDeal",
      },
      {
        title: "Ghi chú",
        dataIndex: "ghiChu",
        key: "ghiChu",
      },
    ];
    const data = dataDeal.filter(
      (deal) => deal.idRound === record.idRound && deal.status === "accept"
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
    { title: "Vòng gọi vốn", dataIndex: "vongGoiVon", key: "vongGoiVon" },
    {
      title: "Tên doanh nghiệp",
      dataIndex: "tenDoanhNghiep",
      key: "tenDoanhNghiep",
    },
    {
      title: "Giai đoạn gọi vốn",
      dataIndex: "giaiDoanGoiVon",
      key: "giaiDoanGoiVon",
    },
    {
      title: "Số tiền kêu gọi",
      dataIndex: "soTienKeuGoi",
      key: "soTienKeuGoi",
    },
    {
      title: "Phần trăm cổ phần",
      dataIndex: "phanTramCoPhan",
      key: "phanTramCoPhan",
    },
    { title: "Ghi chú", dataIndex: "ghiChu", key: "ghiChu" },
    { title: "Ngày gọi", dataIndex: "ngayGoi", key: "ngayGoi" },
    { title: "Ngày kết thúc", dataIndex: "ngayKetThuc", key: "ngayKetThuc" },
  ];
  const data = dataRound.filter((round) => round.status === "done");
  return (
    <div className="rfr__wrapper">
      <div className="rfc__container">
        <Table
          className="components-table-demo-nested"
          columns={columns}
          expandable={{ expandedRowRender }}
          dataSource={data}
          rowKey="idRound"
        />
      </div>
    </div>
  );
}
export default PreviousFundingRound;
