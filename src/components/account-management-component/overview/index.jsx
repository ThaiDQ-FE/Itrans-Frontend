import React, { useState } from "react";
import { Timeline, Popover, Skeleton, Button } from "antd";
import Swal from "sweetalert2";
import "antd/dist/antd.css";
import "./styles.scss";
import Images from "../../../assets/images/images";
import {
  authorizationAccount,
  checkIdUser,
  checkPathUrl,
  checkRoleUser,
  getLocalStorage,
  localStorages,
  pathQuanLyTaiKhoan,
  pathToChuc,
  showMessage,
} from "../../../assets/helper/helper";
import ModalMileStone from "../modal-milestone";
import moment from "moment";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  deleteMilestoneById,
  getListMilestone,
} from "../../../store/action/milestone.action";
import OverviewContent from "./overview-content";
import message from "../../../assets/message/text";
function OverviewTab(props) {
  const [milestoneModal, setMilestoneModal] = useState(false);
  const [editMilestone, setEditMilestone] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [dateError, setDateError] = useState("");
  const [date, setDate] = useState();
  const dispatch = useDispatch();
  var formatDate = moment(date).format("DD-MM-YYYY");
  const dateFormat = "DD/MM/YYYY";
  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const postMilestone = (object) => {
    const token = authorizationAccount();
    axios({
      method: "POST",
      url: "http://localhost:8080/api/v1/create-milestone",
      data: object,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 202) {
          return showMessage("error", res.data);
        } else if (res.status === 200) {
          showMessage("success", "Thêm thành tựu thành công");
          handleCloseModalMilestone();
          dispatch(getListMilestone(checkIdUser()));
        }
      })
      .catch((err) => {
        showMessage("error", message.CACTH_ERROR);
      });
  };
  const putMilestone = (object) => {
    const token = authorizationAccount();
    axios({
      method: "PUT",
      url: "http://localhost:8080/api/v1/update-milestone",
      data: object,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          showMessage("success", "Cập nhật thành tựu thành công");
          handleCloseModalMilestone();
          dispatch(getListMilestone(checkIdUser()));
        } else {
          showMessage("error", res.data);
        }
      })
      .catch((err) => {
        showMessage("error", message.CACTH_ERROR);
      });
  };
  const handleOpenModalMilestone = () => {
    setMilestoneModal(true);
  };
  const handleOpenEditMilestone = (title, dateTime, content, id) => {
    localStorages("titleMilestone", title);
    localStorages("dateTimeMilestone", dateTime);
    localStorages("contentMilestone", content);
    localStorages("idMilestone", id);
    Swal.fire({
      icon: "question",
      title: "Bạn muốn sửa thành tựu này?",
      text: dateTime + " " + title,
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
        setMilestoneModal(true);
        setEditMilestone(true);
        setForm({
          title: title,
          content: content,
        });
      } else {
        localStorage.removeItem("titleMilestone");
        localStorage.removeItem("dateTimeMilestone");
        localStorage.removeItem("contentMilestone");
        localStorage.removeItem("idMilestone");
      }
    });
  };
  const handleCloseModalMilestone = () => {
    setForm({
      title: "",
      content: "",
    });
    setDate(undefined);
    setTitleError("");
    setDateError("");
    setMilestoneModal(false);
    setEditMilestone(false);
    localStorage.removeItem("titleMilestone");
    localStorage.removeItem("dateTimeMilestone");
    localStorage.removeItem("contentMilestone");
    localStorage.removeItem("idMilestone");
  };
  const handleChangeValue = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleBlurTitle = () => {
    if (form.title !== "") {
      return setTitleError("");
    }
  };
  const handleBlurDate = () => {
    if (date !== undefined) {
      return setDateError("");
    }
  };
  const handleClickButtonThem = (e) => {
    e.preventDefault();
    if (form.title === "" && date === undefined) {
      setTitleError("Tiêu đề không được bỏ trống");
      setDateError("Ngày đạt không được bỏ trống");
      return;
    } else {
      setTitleError("");
      setDateError("");
    }
    if (form.title === "") {
      return setTitleError("Tiêu đề không được bỏ trống");
    } else {
      setTitleError("");
    }
    if (date === undefined) {
      return setDateError("Ngày đạt không được bỏ trống");
    } else {
      setDateError("");
    }
    const object = {
      content: form.content,
      date: formatDate,
      idOrganization: checkIdUser(),
      title: form.title,
    };
    Swal.fire({
      icon: "warning",
      title: "Bạn muốn thêm thành tựu này?",
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
        postMilestone(object);
      }
    });
  };
  const handleClickButtonCapNhat = (e) => {
    e.preventDefault();
    if (form.title === "") {
      return setTitleError("Tiêu đề không được bỏ trống");
    } else {
      setTitleError("");
    }
    if (date === undefined) {
      const object = {
        content: form.content,
        date: getLocalStorage("dateTimeMilestone"),
        idMilestone: getLocalStorage("idMilestone"),
        title: form.title,
      };
      Swal.fire({
        icon: "warning",
        title: "Bạn chắc chắn muốn cập nhật thành tựu này?",
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
          putMilestone(object);
        }
      });
    } else if (date !== undefined) {
      const object = {
        content: form.content,
        date: formatDate,
        idMilestone: getLocalStorage("idMilestone"),
        title: form.title,
      };
      Swal.fire({
        icon: "warning",
        title: "Bạn chắc chắn muốn cập nhật thành tựu này?",
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
          putMilestone(object);
        }
      });
    }
  };
  const handleClickDeleteTimeline = (title, dateTime, id) => {
    Swal.fire({
      icon: "warning",
      title: "Bạn muốn xóa thành tựu này?",
      text: dateTime + " " + title,
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
        dispatch(deleteMilestoneById(id));
      }
    });
  };
  const renderListMilestone = () => {
    return props.listMilestone.map((item, index) => {
      return (
        <Timeline.Item key={index} className="timeline__item" label={item.date}>
          {checkPathUrl() === "/quan-ly-tai-khoan" ? (
            <div className="timeline__action">
              <img
                src={Images.PENCIL}
                alt="edit"
                className="timeline__edit"
                onClick={() =>
                  handleOpenEditMilestone(
                    item.title,
                    item.date,
                    item.content,
                    item.id
                  )
                }
              />
              <img
                src={Images.RED_CANCEL}
                alt="edit"
                className="timeline__delete"
                onClick={() =>
                  handleClickDeleteTimeline(item.title, item.date, item.id)
                }
              />
            </div>
          ) : (
            <></>
          )}

          {item.content === "" ? (
            item.title
          ) : (
            <Popover title={null} content={item.content} placement="right">
              {item.title}
            </Popover>
          )}
        </Timeline.Item>
      );
    });
  };
  const checkAchievement = () => {
    if (props.listMilestone === "No Data") {
      if (checkPathUrl() === "/quan-ly-tai-khoan") {
        return (
          <div className="ot__noMilestone">
            <p>Bạn chưa có thành tựu. Hãy thêm thành tựu</p>
            <Button
              onClick={handleOpenModalMilestone}
              className="ot__noMiletoneButton"
              type="primary"
            >
              Thêm thành tựu
            </Button>
          </div>
        );
      } else {
        return (
          <div className="ot__noMilestone">
            <p>Tổ chức này có thành tựu nào được đăng tải</p>
          </div>
        );
      }
    } else {
      return <Timeline mode="left">{renderListMilestone()}</Timeline>;
    }
  };
  const checkPath = () => {
    const path = window.location.pathname;
    if (path === "/to-chuc/chi-tiet") {
      return (
        <div className="ot__mileStone">
          <p className="ot__mileStoneTitle">Thành tựu</p>
          {props.loading === true ? <Skeleton active /> : checkAchievement()}
        </div>
      );
    } else if (path === "/quan-ly-tai-khoan") {
      if (checkRoleUser() === "INVESTOR") {
        return <></>;
      } else {
        return (
          <div className="ot__mileStone">
            {props.listMilestone !== "No Data" ? (
              <div className="ot__plusMilestone">
                <img
                  src={Images.PLUS}
                  alt="plus milestone"
                  onClick={handleOpenModalMilestone}
                />
              </div>
            ) : (
              <></>
            )}
            <p className="ot__mileStoneTitle">Thành tựu</p>
            {props.loading === true ? <Skeleton active /> : checkAchievement()}
          </div>
        );
      }
    }
  };
  return (
    <div className="ot__wrapper">
      <ModalMileStone
        handleBlurTitle={handleBlurTitle}
        handleBlurDate={handleBlurDate}
        titleError={titleError}
        dateError={dateError}
        handleSubmit={handleClickButtonThem}
        handleUpdata={handleClickButtonCapNhat}
        dateFormat={dateFormat}
        date={date}
        setDate={setDate}
        handleChangeValue={handleChangeValue}
        milestoneModal={milestoneModal}
        closeModal={handleCloseModalMilestone}
        editMilestone={editMilestone}
      />
      <div className="ot__left">
        <div className="ot__info">
          <p className="ot__thongTin">Thông tin</p>
          {props.loading === true ? (
            <Skeleton active />
          ) : (
            <>
              <p className="ot__truSoChinh">
                <span className="ot__truSoChinhLabel">Trụ sở chính:</span>
                <span className="ot__truSoChinhText">
                  {props.detailCompany.province}
                </span>
              </p>
              <p className="ot__webSite">
                <span className="ot__webSiteLabel">Website:</span>
                <span className="ot__webSiteText">
                  {props.detailCompany.website}
                </span>
              </p>
              <p className="ot__email">
                <span className="ot__emailLabel">Email:</span>
                <span className="ot__emailText">
                  {props.detailCompany.email}
                </span>
              </p>
              {checkPathUrl() === pathQuanLyTaiKhoan() ? (
                checkRoleUser() === "INVESTOR" ? (
                  <p className="ot__investorType">
                    <span className="ot__investorTypeLabel">
                      Loại nhà đầu tư:
                    </span>
                    <span className="ot__investorTypeText">
                      {props.detailCompany.investorType}
                    </span>
                  </p>
                ) : (
                  <>
                    <p className="ot__currentStage">
                      <span className="ot__currentStageLabel">
                        Giai đoạn hiện tại:
                      </span>
                      <span className="ot__currentStageText">
                        {props.detailCompany.currentStage}
                      </span>
                    </p>
                    <p className="ot__industry">
                      <span className="ot__industryLabel">
                        Lĩnh vực kinh doanh:
                      </span>
                      <span className="ot__industryText">
                        {props.detailCompany.industry}
                      </span>
                    </p>
                  </>
                )
              ) : checkPathUrl() === pathToChuc() ? (
                <>
                  <p className="ot__currentStage">
                    <span className="ot__currentStageLabel">
                      Giai đoạn hiện tại:
                    </span>
                    <span className="ot__currentStageText">
                      {props.detailCompany.currentStage}
                    </span>
                  </p>
                  <p className="ot__industry">
                    <span className="ot__industryLabel">
                      Lĩnh vực kinh doanh:
                    </span>
                    <span className="ot__industryText">
                      {props.detailCompany.industry}
                    </span>
                  </p>
                </>
              ) : (
                <p className="ot__investorType">
                  <span className="ot__investorTypeLabel">
                    Loại nhà đầu tư:
                  </span>
                  <span className="ot__investorTypeText">
                    {props.detailCompany.investorType}
                  </span>
                </p>
              )}
            </>
          )}
        </div>
        {checkPath()}
      </div>
      <OverviewContent media={props.media} introduce={props.introduce} />
    </div>
  );
}
export default OverviewTab;
