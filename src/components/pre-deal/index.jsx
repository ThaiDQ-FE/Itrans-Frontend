import React from "react";
import { Table } from "antd";
import "./styles.scss";
import "antd/dist/antd.css";
function PreviousDeal() {
  const expandedRowRender = () => {
    const columns = [
      { title: "Deal", dataIndex: "deal", key: "deal" },
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
      { title: "Ghi chú", dataIndex: "ghiChu", key: "ghiChu" },
    ];

    const data = [];
    for (let i = 1; i <= 3; ++i) {
      data.push({
        key: i,
        deal: "Deal " + i,
        tenNhaDauTu: "Tập đoàn ĐQT",
        phanTramCoPhan: "15%",
        soTienMuonDauTu: "350.000.000 VND",
        ghiChu: "ĐT vô địch .............................................",
      });
    }
    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        showHeader={false}
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
    { title: "Ngày gọi", dataIndex: "ngayGoi", key: "ngayGoi" },
    { title: "Ngày kết thúc", dataIndex: "ngayKetThuc", key: "ngayKetThuc" },
  ];

  const data = [];
  for (let i = 1; i <= 5; i++) {
    data.push({
      key: i,
      vongGoiVon: "Vòng 1",
      tenDoanhNghiep: "Baby Shark",
      giaiDoanGoiVon: "Series A",
      soTienKeuGoi: "500.000.000 VNĐ",
      phanTramCoPhan: "20%",
      ngayGoi: "20-06-2021",
      ngayKetThuc: "20-07-2021",
    });
  }
  return (
    <div className="pd__wrapper">
      <h4>Deal trước đó</h4>
      <div className="pd__container">
        <Table
          className="components-table-demo-nested"
          columns={columns}
          expandable={{ expandedRowRender }}
          dataSource={data}
          pagination={false}
        />
      </div>
    </div>
  );
}
export default PreviousDeal;
