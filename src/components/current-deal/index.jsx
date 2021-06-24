import React from "react";
import { EditOutlined } from "@ant-design/icons";
import { Table, Input, InputNumber, Button } from "antd";
import { useEffect, useState } from "react";
import "./styles.scss";
import "antd/dist/antd.css";
import Images from "../../assets/images/images";

const { TextArea } = Input;

function CurrentDeal() {
  const [data, setData] = useState([]);
  const [dataJsonDeal, setDataJsonDeal] = useState([]);
  const [activeRecord, setActiveRecord] = useState({});
  useEffect(() => {
    const dataJson = [
      {
        idRound: 1,
        vongGoiVon: "Vòng 1",
        tenDoanhNghiep: "Baby Shark",
        giaiDoanGoiVon: "Series A",
        soTienKeuGoi: "500.000.000 VNĐ",
        phanTramCoPhan: "20%",
        ngayGoi: "20-06-2021",
        ngayKetThuc: "20-07-2021",
      },
      {
        idRound: 2,
        vongGoiVon: "Vòng 11",
        tenDoanhNghiep: "Baby Shark",
        giaiDoanGoiVon: "Series A",
        soTienKeuGoi: "500.000.000 VNĐ",
        phanTramCoPhan: "20%",
        ngayGoi: "20-06-2021",
        ngayKetThuc: "20-07-2021",
      },
    ];

    const dataJsonDeal = [
      {
        idDeal: 1,
        idRound: 1,
        deal: "Deal 1",
        tenNhaDauTu: "Tập đoàn ĐQT",
        phanTramCoPhan: "15%",
        soTienMuonDauTu: 350000000,
        ghiChu: "ĐT vô địch ",
        status: "pending",
      },
      {
        idDeal: 2,
        idRound: 2,
        deal: "Deal 2",
        tenNhaDauTu: "Tập đoàn ĐQT",
        phanTramCoPhan: "15%",
        soTienMuonDauTu: 350000000,
        ghiChu: "ĐT vô địch ",
        status: "pending",
      },
      {
        idDeal: 3,
        idRound: 2,
        deal: "Deal 3",
        tenNhaDauTu: "Tập đoàn ĐQT",
        phanTramCoPhan: "15%",
        soTienMuonDauTu: 350000000,
        ghiChu: "ĐT vô địch ",
        status: "done",
      },
    ];
    setData(dataJson);
    setDataJsonDeal(dataJsonDeal);
  }, []);

  const handleSubmit = (record) => {
    console.log(record);
    let tmpDataJsonDeal = dataJsonDeal;
    tmpDataJsonDeal = tmpDataJsonDeal.map((item) => {
      if (item.idDeal === record.idDeal) {
        return {
          ...record,
          status: "done",
        };
      }
      return item;
    });

    setDataJsonDeal(tmpDataJsonDeal);
  };

  const handleReject = (record) => {
    let tmpDataJsonDeal = dataJsonDeal;
    tmpDataJsonDeal = tmpDataJsonDeal.map((item) => {
      if (item.idDeal === record.idDeal) {
        return {
          ...record,
          status: "pending",
        };
      }
      return item;
    });

    setDataJsonDeal(tmpDataJsonDeal);
  };

  const handleCancel = () => {
    setActiveRecord({});
  };
  const expandedRowRender = (record, index) => {
    console.log(record, index);
    const columns = [
      { title: "Thỏa thuận", dataIndex: "deal", key: "deal" },
      {
        title: "Nhà đầu tư",
        dataIndex: "tenNhaDauTu",
        key: "tenNhaDauTu",
      },
      {
        title: "Phần trăm cổ phần",
        dataIndex: "phanTramCoPhan",
        key: "phanTramCoPhan",
        render: (value, record) => (
          <>
            {activeRecord.idDeal === record.idDeal ? (
              <Input
                placeholder="Phần trăm cổ phần"
                defaultValue={value}
                disabled={record.status === "done"}
              />
            ) : (
              value
            )}
          </>
        ),
      },
      {
        title: "Số tiền kêu gọi",
        dataIndex: "soTienMuonDauTu",
        key: "soTienMuonDauTu",
        render: (value, record) => (
          <>
            {activeRecord.idDeal === record.idDeal ? (
              <InputNumber
                placeholder="Số tiền đầu tư"
                defaultValue={value}
                disabled={record.status === "done"}
              />
            ) : (
              value
            )}
          </>
        ),
      },
      {
        title: "Ghi chú",
        dataIndex: "ghiChu",
        key: "ghiChu",
        render: (value, record) => (
          <>
            {activeRecord.idDeal === record.idDeal ? (
              <TextArea
                rows={2}
                defaultValue={value}
                disabled={record.status === "done"}
              />
            ) : (
              value
            )}
          </>
        ),
      },
      {
        title: "",
        dataIndex: "status",
        key: "status",
        render: (value, record) => (
          <div>
            {value === "pending" ? (
              <>
                {activeRecord.idDeal === record.idDeal ? (
                  <>
                    <Button type="primary" onClick={() => handleSubmit(record)}>
                      Chấp nhận
                    </Button>
                    <Button type="primary" onClick={handleCancel}>
                      Hủy
                    </Button>
                  </>
                ) : (
                  <EditOutlined onClick={() => setActiveRecord(record)} />
                )}
              </>
            ) : (
              <>
                <Button type="primary" disabled>
                  Đã Chấp nhận
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => handleReject(record)}
                >
                  Hủy deal
                </Button>
              </>
            )}
          </div>
        ),
      },
    ];

    const data = dataJsonDeal.filter((deal) => deal.idRound === record.idRound);

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
      title: "Tên doanh ngiệp",
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
  return (
    <div className="cd__wrapper">
      <h4>Deal hiện tại</h4>
      <div className="cd__container">
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
export default CurrentDeal;