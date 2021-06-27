import React, { useState } from "react";
import { Table, Button, Tooltip, Input, DatePicker } from "antd";
import "./styles.scss";
import "antd/dist/antd.css";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import Images from "../../assets/images/images";
import {
  authorizationAccount,
  checkEmailUser,
  checkIdUser,
  showMessage,
} from "../../assets/helper/helper";
import moment from "moment";
import {
  getListRoundActiveByIdOrganization,
  updateStatusRound,
} from "../../store/action/round.action";
import ModalCreateRound from "../modal-create-round";
import axios from "axios";
function CurrentFundingRound() {
  const { TextArea } = Input;
  // declare dispatch
  const dispatch = useDispatch();
  // get data from store
  const { listRoundActive } = useSelector((state) => state.round);
  const { listDeal } = useSelector((state) => state.deal);
  const { loading } = useSelector((state) => state.loading);
  // declare state
  const [STKGE, setSTKGE] = useState("");
  const [PTCPE, setPTCPE] = useState("");
  const [startDateE, setStartDateE] = useState("");
  const [endDateE, setEndDateE] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [edit, setEdit] = useState(false);
  const [startDateEdit, setStartDateEdit] = useState();
  const [endDateEdit, setEndDateEdit] = useState();
  const [dataRound, setDataRound] = useState({
    soTienKeuGoi: "",
    phanTramCoPhan: "",
    moTa: "",
    ngayGoi: "",
    ngayKetThuc: "",
  });
  const [form, setForm] = useState({
    soTienKeuGoi: "",
    phanTramCoPhan: "",
    moTa: "",
  });
  const [openModal, setOpenModal] = useState(false);
  // get data from store
  const id = checkIdUser();
  const token = authorizationAccount();
  // format date
  var formatStartDate = moment(startDate).format("DD-MM-YYYY");
  var formatEndDate = moment(endDate).format("DD-MM-YYYY");
  const dateFormat = "DD/MM/YYYY";
  // declare rule
  const test = "ở đây chúng ta sẽ định nghĩa rule";
  // check type of round
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
  // call api create round
  const postRound = (
    mail,
    fundingAmount,
    shareRequirement,
    description,
    startDate,
    endDate
  ) => {
    axios({
      method: "POST",
      url: "http://localhost:8080/api/v1/round",
      data: {
        mail,
        fundingAmount,
        shareRequirement,
        description,
        startDate,
        endDate,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 202) {
          showMessage("error", res.data);
        } else if (res.status === 201) {
          Swal.fire({
            icon: "success",
            title: res.data,
            heightAuto: true,
            timerProgressBar: false,
            showConfirmButton: true,
            confirmButtonText: "Đồng ý",
            confirmButtonColor: "#ff8412",
          }).then(async (result) => {
            if (result.isConfirmed) {
              setOpenModal(false);
              dispatch(getListRoundActiveByIdOrganization(id));
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // declare sub-table
  const expandedRowRender = (record, index) => {
    const columns = [
      {
        title: "Tên nhà đầu tư",
        dataIndex: "investor",
        key: "investor",
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
        title: "Số tiền muốn đầu tư",
        dataIndex: "capitalInvestment",
        key: "capitalInvestment",
        width: "180px",
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
        title: "Ngày đăng",
        dataIndex: "date",
        key: "date",
        width: "180px",
        render: (value) => (
          <div className="cfr__inputStartDate">
            <Input className="cfr__input" defaultValue={value} readOnly />
          </div>
        ),
      },
      {
        title: "Ghi chú",
        dataIndex: "description",
        key: "description",
        width: "200px",
        render: (value) => (
          <Tooltip placement="top" title={value}>
            <p className="cfr__des">{value}</p>
          </Tooltip>
        ),
      },
      {
        title: "",
        dataIndex: "status",
        key: "status",
        width: "50px",
        render: (value, round) => (
          <div className="subround__action">
            {value === "PENDING" ? (
              <>
                <div className="subround__accept">
                  <Tooltip placement="top" title="Chấp nhận">
                    <img
                      src={Images.CHECKED_REGISTER}
                      alt="chap nhan"
                      onClick={() => handleAcceptDeal(round)}
                    />
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
        locale={{ emptyText: "Không có dữ liệu" }}
      />
    );
  };
  // accept deal
  const handleAcceptDeal = (round) => {
    console.log(round);
    Swal.fire({
      icon: "warning",
      title: "Chấp nhận deal của nhà đầu tư " + round.investor,
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
      }
    });
  };
  // icon power
  const handlePowerOffRound = (round) => {
    Swal.fire({
      icon: "warning",
      title: "Bạn muốn kết thúc vòng gọi vốn hiện tại?",
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
        const object = { id: round.idRound, status: "Kết thúc" };
        dispatch(updateStatusRound(object));
      }
    });
  };
  // icon edit
  const handleEditRound = (round) => {
    const data = listDeal.filter(
      (deal) => deal.idRound === round.idRound && deal.status !== "REJECT"
    );
    if (data.length !== 0) {
      showMessage("error", "Hiện tại không thể chỉnh sửa vòng gọi vốn!");
    } else {
      setDataRound({
        ...dataRound,
        soTienKeuGoi: round.fundingAmount,
        phanTramCoPhan: round.shareRequirement,
        moTa: round.description,
        ngayGoi: round.startDate,
        ngayKetThuc: round.endDate,
      });
      setEdit(true);
    }
  };
  // icon trash
  const handleDeleteRound = (round) => {
    const data = listDeal.filter(
      (deal) => deal.idRound === round.idRound && deal.status !== "REJECT"
    );
    if (data.length !== 0) {
      showMessage("error", "Hiện tại không thể xóa vòng gọi vốn!");
    } else {
      Swal.fire({
        icon: "warning",
        title: "Bạn muốn hủy vòng gọi vốn hiện tại?",
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
    }
  };
  // open modal create
  const handleCreateRound = () => {
    setOpenModal(true);
  };
  // close modal create
  const handleCloseModal = () => {
    setOpenModal(false);
    setPTCPE("");
    setSTKGE("");
    setStartDateE("");
    setEndDateE("");
    setStartDate("");
    setEndDate("");
  };

  const handleCreateRoundForm = (e) => {
    e.preventDefault();
    handleSTKGBlur();
    handlePTCPBlur();
    handleBlurStartDate();
    handleBlurEndDate();
    if (
      STKGE === "" &&
      PTCPE === "" &&
      startDateE === "" &&
      endDateE === "" &&
      form.soTienKeuGoi !== "" &&
      form.phanTramCoPhan !== ""
    ) {
      postRound(
        checkEmailUser(),
        parseInt(form.soTienKeuGoi),
        parseInt(form.phanTramCoPhan),
        form.moTa,
        formatStartDate,
        formatEndDate
      );
    }
  };
  const handleChangeValue = (event) => {
    const { value, name } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleSTKGBlur = () => {
    let convertInt = parseInt(form.soTienKeuGoi);
    if (isNaN(convertInt)) {
      return setSTKGE("Số tiền kêu gọi không được trống");
    } else if (convertInt < 1) {
      return setSTKGE("Số tiền kêu gọi phải >= 1.000.000 VNĐ");
    } else {
      return setSTKGE("");
    }
  };
  const handlePTCPBlur = () => {
    let convertInt = parseInt(form.phanTramCoPhan);
    if (isNaN(convertInt)) {
      return setPTCPE("Phần trăm cổ phần không được trống");
    } else if (convertInt < 1 || convertInt > 100) {
      return setPTCPE("Phần trăm cổ phần phải từ [1-100]");
    } else {
      return setPTCPE("");
    }
  };
  const handleBlurStartDate = () => {
    if (startDate === null || startDate === undefined) {
      return setStartDateE("Ngày gọi vốn không được bỏ trống");
    } else {
      return setStartDateE("");
    }
  };
  const handleBlurEndDate = () => {
    if (endDate === null || endDate === undefined) {
      return setEndDateE("Ngày kết thúc không được bỏ trống");
    } else {
      return setEndDateE("");
    }
  };
  const handleCancelEdit = () => {
    setEdit(false);
  };
  console.log(dataRound);
  const handleChangeEdit = (event) => {
    const { value, name } = event.target;
    setDataRound({
      ...dataRound,
      [name]: value,
    });
  };
  const handleSaveRound = () => {
    console.log(startDateEdit);
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
      render: (value, round) => (
        <div className="cfr__inputStkg">
          {edit === true ? (
            <Input
              type="number"
              defaultValue={value}
              onChange={handleChangeEdit}
              name="soTienKeuGoi"
            />
          ) : (
            <>
              <span>{value}</span>
              <Input
                className="cfr__stkgDefault"
                addonAfter=".000.000 VNĐ"
                readOnly
              />
            </>
          )}
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
          {edit === true ? (
            <Input
              type="number"
              defaultValue={value}
              onChange={handleChangeEdit}
              name="phanTramCoPhan"
            />
          ) : (
            <>
              <span>{value}</span>
              <Input className="cfr__ptcpDefault" addonAfter="%" readOnly />
            </>
          )}
        </div>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (value) => (
        <>
          {edit === true ? (
            <TextArea
              rows={1}
              defaultValue={value}
              className="round__textArea"
              onChange={handleChangeEdit}
              name="moTa"
            />
          ) : (
            <Tooltip placement="top" title={value}>
              <p className="cfr__des">{value}</p>
            </Tooltip>
          )}
        </>
      ),
    },
    {
      title: "Ngày gọi",
      dataIndex: "startDate",
      key: "startDate",
      width: `${edit === true ? "150px" : "115px"}`,
      render: (value) => (
        <>
          {edit === true ? (
            <DatePicker
              defaultValue={moment(value, dateFormat)}
              format={dateFormat}
              onChange={setStartDateEdit}
            />
          ) : (
            <div className="cfr__inputStartDate">
              <Input className="cfr__input" defaultValue={value} readOnly />
            </div>
          )}
        </>
      ),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      width: `${edit === true ? "150px" : "125px"}`,
      render: (value) => (
        <>
          {edit === true ? (
            <DatePicker
              defaultValue={moment(value, dateFormat)}
              format={dateFormat}
            />
          ) : (
            <div className="cfr__inputEndDate">
              <Input className="cfr__input" defaultValue={value} readOnly />
            </div>
          )}
        </>
      ),
    },
    {
      title: "",
      dataIndex: "status",
      key: "status",
      width: "50px",
      render: (value, round) => (
        <div className="round__qlvgvAction">
          {edit === false ? (
            <>
              <div className="round__power">
                <Tooltip placement="top" title="Kết thúc">
                  <img
                    src={Images.POWER}
                    alt="power"
                    onClick={() => handlePowerOffRound(round)}
                  />
                </Tooltip>
              </div>
              <div className="round__edit">
                <Tooltip placement="top" title="Chỉnh sửa">
                  <img
                    src={Images.PENCIL}
                    alt="edit"
                    onClick={() => handleEditRound(round)}
                  />
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
            </>
          ) : (
            <>
              <div className="round__save">
                <Tooltip placement="top" title="Lưu">
                  <img src={Images.SAVE} alt="save" onClick={handleSaveRound} />
                </Tooltip>
              </div>
              <div className="round__cancel">
                <Tooltip placement="top" title="Hủy">
                  <img
                    src={Images.RED_CANCEL}
                    alt="trash"
                    onClick={handleCancelEdit}
                  />
                </Tooltip>
              </div>
            </>
          )}
        </div>
      ),
    },
  ];
  return (
    <div className="cfr__wrapper">
      <ModalCreateRound
        openModal={openModal}
        closeModal={handleCloseModal}
        handleSTKGBlur={handleSTKGBlur}
        handleChangeValue={handleChangeValue}
        STKGE={STKGE}
        handlePTCPBlur={handlePTCPBlur}
        PTCPE={PTCPE}
        startDate={startDate}
        setStartDate={setStartDate}
        handleBlurStartDate={handleBlurStartDate}
        dateFormat={dateFormat}
        startDateE={startDateE}
        endDate={endDate}
        setEndDate={setEndDate}
        handleBlurEndDate={handleBlurEndDate}
        endDateE={endDateE}
        test={test}
        handleCreateRoundForm={handleCreateRoundForm}
      />
      <h3 style={{ marginBottom: 20 }}>VÒNG GỌI VỐN HIỆN TẠI</h3>
      <Button
        size="large"
        onClick={handleCreateRound}
        className="cfr__tvgv"
        type="primary"
      >
        Tạo vòng gọi vốn
      </Button>
      <div className="cfr__container">
        <Table
          loading={loading}
          className="components-table-demo-nested"
          columns={columns}
          expandable={{ expandedRowRender }}
          dataSource={checkRound()}
          rowKey="idRound"
          pagination={false}
          bordered
          locale={{ emptyText: "Không có dữ liệu" }}
        />
      </div>
    </div>
  );
}
export default CurrentFundingRound;
