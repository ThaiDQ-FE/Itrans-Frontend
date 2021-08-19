import React from "react";
import "antd/dist/antd.css";
import "./styles.scss";
import { Table, Button, Tag, Tooltip } from "antd";
import Images from "../../../../../assets/images/images";
function ANACTableDone(props) {
  const column = [
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (value) => (
        <div className="anac__logo" style={{ textAlign: "center" }}>
          {value === "ACTIVE" ? (
            <Tag className="anrc__active">Hoạt động</Tag>
          ) : (
            <Tag className="anrc__delete">Đã khóa</Tag>
          )}
        </div>
      ),
    },
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
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Tên tài khoản",
      dataIndex: "name",
      key: "name",
      width: "200px",
      render: (value) => (
        <Tooltip title={value} placement="topRight">
          <div className="anac__name">{value}</div>
        </Tooltip>
      ),
    },
    {
      title: "Mail",
      dataIndex: "gmail",
      key: "gmail",
      width: "200px",
      render: (value) => (
        <Tooltip title={value} placement="topRight">
          <div className="anac__mail">{value}</div>
        </Tooltip>
      ),
    },
    {
      title: "Ngày đăng ký",
      dataIndex: "createAt",
      key: "createAt",
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
      dataSource={props.list}
      key={props.list.gmail}
      pagination={
        props.list.length < 6
          ? false
          : {
              defaultPageSize: 6,
            }
      }
    />
  );
}

export default ANACTableDone;
