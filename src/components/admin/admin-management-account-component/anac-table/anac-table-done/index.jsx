import React from "react";
import "antd/dist/antd.css";
import "./styles.scss";
import { Table, Button } from "antd";
import Images from "../../../../../assets/images/images";
function ANACTableDone() {
  const data = [];
  for (let i = 0; i < 50; i++) {
    data.push({
      key: i,
      logo: "",
      loaiHinh: "Tổ chức 1" + i,
      tenTaiKhoan: "Đặng Quốc Thái",
      gmail: "dangquocthai07061998@gmail.com",
      ngayDangKy: "01-01-2021",
    });
  }
  const column = [
    {
      title: "Ảnh",
      dataIndex: "logo",
      key: "logo",
      render: (value) => (
        <div className="anac__logo" style={{ textAlign: "center" }}>
          <img src={value === "" ? Images.NO_IMAGE : value} alt="logo" />
        </div>
      ),
    },
    {
      title: "Loại hình",
      dataIndex: "loaiHinh",
      key: "loaiHinh",
    },
    {
      title: "Tên tài khoản",
      dataIndex: "tenTaiKhoan",
      key: "tenTaiKhoan",
    },
    {
      title: "Gmail",
      dataIndex: "gmail",
      key: "gmail",
    },
    {
      title: "Ngày đăng ký",
      dataIndex: "ngayDangKy",
      key: "ngayDangKy",
      render: (value) => (
        <p style={{ textAlign: "center", margin: 0 }}>{value}</p>
      ),
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (round) => (
        <div className="anac__button" style={{ textAlign: "center" }}>
          <Button type="primary">Chi tiết</Button>
        </div>
      ),
    },
  ];
  return (
    <Table
      columns={column}
      dataSource={data}
      key={data.key}
      pagination={
        data.length < 6
          ? false
          : {
              defaultPageSize: 6,
            }
      }
    />
  );
}

export default ANACTableDone;
