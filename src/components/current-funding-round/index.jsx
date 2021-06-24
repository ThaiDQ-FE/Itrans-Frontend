import React, { useState } from "react";
import { Table, Button, Tooltip, Modal, Input, DatePicker } from "antd";
import "./styles.scss";
import Swal from "sweetalert2";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";
import Images from "../../assets/images/images";
import { showMessage } from "../../assets/helper/helper";
function CurrentFundingRound() {
  const { TextArea } = Input;
  const { listRoundActive } = useSelector((state) => state.round);
  const { listDeal } = useSelector((state) => state.deal);
  const dateFormat = "DD/MM/YYYY";
  const test = "ở đây chúng ta sẽ định nghĩa rule";
  const checkRound = () => {
    let round;
    if (typeof listRoundActive === "string") {
      round = [];
      return round;
    } else {
      round = [listRoundActive];
      return round;
    }
  };
  const [openModal, setOpenModal] = useState(false);
  const expandedRowRender = (record, index) => {
    const columns = [
      {
        title: "Tên nhà đầu tư",
        dataIndex: "investor",
        key: "investor",
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
      {
        title: "",
        dataIndex: "status",
        key: "status",
        render: (value, record) => (
          <div className="subround__action">
            {value === "PENDING" ? (
              <>
                <div className="subround__accept">
                  <Tooltip placement="top" title="Chấp nhận">
                    <img src={Images.CHECKED_REGISTER} alt="chap nhan" />
                  </Tooltip>
                </div>
                <div className="subround__reject">
                  <Tooltip placement="top" title="Từ chối">
                    <img src={Images.RED_CANCEL} alt="tu choi" />
                  </Tooltip>
                </div>
              </>
            ) : (
              <>
                <div className="subround__reject">
                  <Tooltip placement="top" title="Từ chối">
                    <img src={Images.RED_CANCEL} alt="tu choi" />
                  </Tooltip>
                </div>
              </>
            )}
          </div>
        ),
      },
    ];
    const data = listDeal.filter(
      (deal) => deal.idRound === record.idRound && deal.status !== "REJECT"
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
  const handleSubmitEnd = (round) => {
    Swal.fire({
      icon: "warning",
      title: "Bạn muốn kết thúc vòng gọi vốn hiện tại?",
      heightAuto: true,
      timerProgressBar: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
    });
  };
  const handleCancelRound = (round) => {
    console.log(round);
    const data = listDeal.filter(
      (deal) => deal.idRound === round.idRound && deal.status !== "REJECT"
    );
    if (data.length !== 0) {
      showMessage("error", "Không thể hủy vòng gọi vốn hiện tại!");
    }
  };
  const handleCreateRound = () => {
    if (typeof listRoundActive === "object") {
      return showMessage("error", "Hiện tại không thể tạo vòng gọi vốn!");
    } else {
      return setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    return setOpenModal(false);
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
    {
      title: "Ghi chú",
      dataIndex: "description",
      key: "description",
      width: "125px",
    },
    {
      title: "Ngày gọi",
      dataIndex: "startDate",
      key: "startDate",
      width: "115px",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      width: "125px",
    },
    {
      title: "",
      dataIndex: "status",
      key: "status",
      width: "50px",
      render: (value, round) => (
        <div className="round__qlvgvAction">
          <Button type="primary" onClick={() => handleSubmitEnd(round)}>
            Kết thúc
          </Button>
          <Button
            className="round__btnHuy"
            type="primary"
            danger
            onClick={() => handleCancelRound(round)}
          >
            Hủy
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div className="cfr__wrapper">
      <Modal
        className="cfr__modal"
        title="Basic Modal"
        visible={openModal}
        maskClosable={false}
        footer={null}
        closable={false}
      >
        <div className="cfr__closeModal">
          <img
            onClick={handleCloseModal}
            src={Images.CANCEL}
            alt="close modal"
          />
        </div>
        <h3 style={{ textAlign: "center" }}>Tạo vòng gọi vốn</h3>
        <form className="cfr__form">
          <div className="cfr__lineOne">
            <Input
              size="large"
              className="cfr__formSTKG"
              addonAfter=".000.000 VNĐ"
              placeholder="Số tiền kêu gọi"
            />
            <Input
              size="large"
              type="number"
              className="cfr__formPTCP"
              addonAfter="%"
              placeholder="Phần trăm cổ phần"
            />
          </div>
          <div className="cfr__lineArea">
            <TextArea
              className="cfr__formMT"
              size="large"
              rows={5}
              placeholder="Mô tả"
            />
          </div>
          <div className="cfr__datePicker">
            <DatePicker
              className="cfr__dpngv"
              dropdownClassName="cfr__dpngvdrop"
              placeholder="Ngày gọi vốn"
              size="large"
              format={dateFormat}
            />
            <DatePicker
              className="cfr__dpnkt"
              dropdownClassName="cfr__dpnktdrop"
              placeholder="Ngày kết thúc"
              size="large"
              format={dateFormat}
            />
            <div className="cfr__warningSign">
              <Tooltip placement="topRight" title={test}>
                <img src={Images.WARNING} alt="warning" />
              </Tooltip>
            </div>
          </div>
          <div className="cfr__submitForm">
            <Button className="cfr__sfTao" type="primary">
              Đồng ý
            </Button>
          </div>
        </form>
      </Modal>
      <h3 style={{ marginBottom: 20 }}>VÒNG GỌI VỐN HIỆN TẠI</h3>
      <Button onClick={handleCreateRound} className="cfr__tvgv" type="primary">
        Tạo vòng gọi vốn
      </Button>
      <div className="cfr__container">
        <Table
          className="components-table-demo-nested"
          columns={columns}
          expandable={{ expandedRowRender }}
          dataSource={checkRound()}
          rowKey="idRound"
          pagination={false}
        />
      </div>
    </div>
  );
}
export default CurrentFundingRound;
