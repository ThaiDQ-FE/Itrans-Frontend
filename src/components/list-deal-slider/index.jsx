import React, { useState } from "react";
import "./styles.scss";
import Slider from "react-slick";
import Images from "../../assets/images/images";
import Swal from "sweetalert2";
import ModalDealDetail from "../modal-deal-detail";
import { Card, Modal, Tag, Tooltip } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  deleteDealInRound,
  getDetailDeal,
  updateAcceptDeal,
  updateDealInRound,
  updateRejectDeal,
} from "../../store/action/deal.action";
import ModalUpdateDeal from "../modal-update-deal";
import { getLocalStorage, localStorages } from "../../assets/helper/helper";

function ListDealSlider() {
  const { listDealByRound } = useSelector((state) => state.round);
  const { detailDeal } = useSelector((deal) => deal.deal);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const dispatch = useDispatch();
  var settings = {
    dots: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    customPaging: function (i) {
      return <p></p>;
    },
  };
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [dataDeal, setDataDeal] = useState({
    soTienDauTu: "",
    phanTramCoPhan: "",
    moTa: "",
  });
  const handleChangeValueUpdate = (event) => {
    const { value, name } = event.target;
    setDataDeal({
      ...dataDeal,
      [name]: value,
    });
  };
  const handleCloseModalUpdate = () => {
    setOpenModalUpdate(false);
    localStorage.removeItem("listDealByRound");
  };
  const handleUpdateDealForm = () => {
    if (getLocalStorage("listDealByRound") !== null) {
      const object = {
        capitalInvestment: dataDeal.soTienDauTu,
        description: dataDeal.moTa,
        idDeal: listDealByRound.idDeal,
        shareRequirement: dataDeal.phanTramCoPhan,
      };
      Swal.fire({
        icon: "warning",
        title: "Bạn chắc chắn thỏa thuận này?",
        heightAuto: true,
        timerProgressBar: false,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        confirmButtonColor: "#1890ff",
        cancelButtonColor: "red",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(updateDealInRound(object));
          setOpenModalUpdate(false);
        }
      });
    }
  };

  const handleDeletetDeal = () => {
    Swal.fire({
      icon: "warning",
      title: "Bạn muốn xóa thỏa thuận vừa chọn?",
      heightAuto: true,
      timerProgressBar: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#1890ff",
      cancelButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteDealInRound(listDealByRound.idDeal));
      }
    });
  };
  const handleEditDeal = () => {
    localStorages("listDealByRound", listDealByRound);
    Swal.fire({
      icon: "question",
      title: "Bạn muốn chỉnh sửa thỏa thuận này?",
      heightAuto: true,
      timerProgressBar: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#1890ff",
      cancelButtonColor: "red",
    }).then((result) => {
      if (result.isConfirmed) {
        setOpenModalUpdate(true);
        setDataDeal({
          soTienDauTu: listDealByRound.capitalInvestment,
          moTa: listDealByRound.description,
          phanTramCoPhan: listDealByRound.shareRequirement,
        });
      } else {
        localStorage.removeItem("listDealByRound");
      }
    });
  };
  const handleChange = (e) => {
    setOpenModal(true);
  };
  const handleCancel = () => {
    setOpenModal(false);
  };
  const handleAccept = () => {
    Swal.fire({
      icon: "warning",
      title: "Bạn muốn chấp thỏa thuận hiện tại?",
      heightAuto: true,
      timerProgressBar: false,
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: "Hủy",
      cancelButtonColor: "gray",
      confirmButtonText: "Đồng ý",
      confirmButtonColor: "#112D4E",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(updateAcceptDeal(detailDeal.idDeal));
        setOpenModal(false);
      }
    });
  };
  const handleReject = () => {
    Swal.fire({
      icon: "warning",
      title: "Bạn muốn từ chối thỏa thuận hiện tại?",
      heightAuto: true,
      timerProgressBar: false,
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: "Hủy",
      cancelButtonColor: "gray",
      confirmButtonText: "Đồng ý",
      confirmButtonColor: "#112D4E",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(updateRejectDeal(detailDeal.idDeal));
        setOpenModal(false);
      }
    });
  };
  const renderTag = (value) => {
    if (value === "ACCEPT") {
      return <Tag id="lds_accept">Đồng ý</Tag>;
    } else if (value === "PENDING") {
      return <Tag id="lds_pending">Đang chờ</Tag>;
    } else if (value === "REJECT") {
      return <Tag id="lds_reject">Từ chối</Tag>;
    } else if (value === "DONE") {
      return <Tag id="lds_done">Đã thỏa thuận</Tag>;
    } else if (value === "CANCEL") {
      return <Tag id="lds_cancel">Không thỏa thuận</Tag>;
    }
  };
  return (
    <>
      <ModalDealDetail
        openModal={openModal}
        closeModal={handleCancel}
        handleAccept={handleAccept}
        handleReject={handleReject}
      />
      <ModalUpdateDeal
        openModalUpdate={openModalUpdate}
        closeModalUpdate={handleCloseModalUpdate}
        handleChangeValueUpdate={handleChangeValueUpdate}
        handleUpdateDealForm={handleUpdateDealForm}
      />
      {userInfo.role == "ORGANIZATION"
        ? listDealByRound.length !== 0 && (
            <div className="lds__mid">
              <div style={{ fontWeight: 700 }}>
                <p>Thông tin những yêu cầu muốn đầu tư: </p>
              </div>
              <Slider {...settings}>
                {listDealByRound.map((value) => (
                  <div
                    className="lds__container"
                    onClick={() => {
                      dispatch(getDetailDeal(value.idDeal));
                      localStorages("statusDeal", value.statusDeal);
                    }}
                  >
                    <div className="lds__listRound">
                      <Card
                        hoverable
                        className="lds__itemInves"
                        onClick={handleChange}
                      >
                        {renderTag(value.statusDeal)}
                        <img
                          src="https://i.imgur.com/KhYwqoU.png"
                          alt="thumbnail"
                        />
                        <div className="lds__name">
                          <span className="span_text">
                            {" "}
                            {value.nameInvestor}
                          </span>
                        </div>
                        <div className="lds__capital">
                          <span className="span_text">Số tiền đầu tư:</span>
                          <span> {value.capitalInvestment} Tỷ</span>
                        </div>
                        <div className="lds__share">
                          <span className="span_text">Phần trăm cổ phần: </span>
                          <span>{value.shareRequirement} %</span>
                        </div>
                        <div className="rbii__startDate">
                          <span className="span_text">Ngày tạo: </span>
                          <span>{value.date}</span>
                        </div>
                      </Card>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          )
        : listDealByRound != "No Data" && (
            <div style={{ width: 1250, marginLeft: 150, marginTop: 25 }}>
              <p>
                <span className="span_text" style={{ fontSize: 20 }}>
                  Thông tin thỏa thuận{" "}
                </span>
              </p>

              <div
                className="lds_textDeal"
                style={{ border: "groove 1px", paddingLeft: 10, padding: 10 }}
              >
                <div className="lds__introduceWrapper">
                  <div className="lds__action">
                    <Tooltip title="Chỉnh sửa">
                      <img
                        src={Images.PENCIL}
                        alt="edit"
                        onClick={() => {
                          handleEditDeal();
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="Xóa">
                      <img
                        src={Images.RED_CANCEL}
                        alt="clear"
                        onClick={() => {
                          handleDeletetDeal();
                        }}
                      />
                    </Tooltip>
                  </div>
                </div>
                <p>
                  <span className="span_text">Số tiền đầu tư: </span>
                  <span>{listDealByRound.capitalInvestment} Tỷ</span>
                  <span style={{ marginLeft: 150 }} className="span_text">
                    Phần trăm cổ phần:{" "}
                  </span>
                  <span>{listDealByRound.shareRequirement}%</span>
                  <span style={{ marginLeft: 150 }} className="span_text">
                    Ngày tạo:{" "}
                  </span>
                  <span>{listDealByRound.date}</span>
                </p>
                <p>
                  <span className="span_text">Mô tả: </span>
                  <span>
                    Trong 5 năm tới, Ánh Dương Vina sẽ trở thành thương hiệu
                    hàng đầu cung cấp dịch vụ trọn gói cho các khu công nghiệp
                    tại Bắc Ninh.Trong 5 năm tới, Ánh Dương Vina sẽ trở thành
                    thương hiệu hàng đầu cung cấp dịch vụ trọn gói cho các khu
                    công nghiệp tại Bắc Ninh.
                  </span>
                </p>
              </div>
            </div>
          )}
    </>
  );
}
export default ListDealSlider;
