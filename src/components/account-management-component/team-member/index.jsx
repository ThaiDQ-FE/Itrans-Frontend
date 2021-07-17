import React from "react";
import { Button, Tooltip } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import Images from "../../../assets/images/images";
import TeamMemberItem from "./team-member-item";
import { useState } from "react";
import ModalTeamMember from "../modal-teamMember";
import {
  authorizationAccount,
  checkEmailUser,
  checkIdUser,
  checkPathUrl,
  checkRoleUser,
  getLocalStorage,
  localStorages,
  pathQuanLyTaiKhoan,
  pathToChuc,
  showMessage,
} from "../../../assets/helper/helper";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import {
  deleteTeamMember,
  getListTeamMember,
} from "../../../store/action/team.action";
import message from "../../../assets/message/text";
function TeamMember(props) {
  const [openModal, setOpenModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [urlAvata, setUrlAvata] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: "",
    chucVu: "",
  });
  const [linkCv, setLinkCv] = useState(null);
  const [webLinkCv, setWebLinkCv] = useState(null);
  const [nameError, setNameError] = useState("");
  const [chucVuError, setChucVuError] = useState("");
  const dispatch = useDispatch();
  const finalObject = (
    idInvestor,
    idOrganization,
    image,
    linkCv,
    name,
    position
  ) => {
    const object = {
      idInvestor: idInvestor,
      idOrganization: idOrganization,
      image: image,
      linkCv: linkCv,
      name: name,
      position: position,
    };
    return object;
  };
  const checkUrlImage = () => {
    let finalUrlAvata;
    if (urlAvata === null) {
      finalUrlAvata = "";
    } else {
      finalUrlAvata = urlAvata;
    }
    return finalUrlAvata;
  };
  const checkUrlLinkCv = () => {
    let finalUrlLinkCv;
    if (webLinkCv === null || webLinkCv === "") {
      finalUrlLinkCv = "";
    } else {
      finalUrlLinkCv = webLinkCv;
    }
    return finalUrlLinkCv;
  };
  const postTeam = (object) => {
    axios({
      method: "POST",
      url: "http://localhost:8080/api/v1/auth/team",
      data: object,
    })
      .then((res) => {
        if (res.status === 200) {
          showMessage("success", "Thêm thành viên thành công");
          dispatch(getListTeamMember(checkEmailUser(), true));
          handleCloseModal();
        } else {
          showMessage("error", "Thêm thành viên thất bại");
        }
      })
      .catch((err) => {
        showMessage("error", message.CACTH_ERROR);
      });
  };
  const putTeam = (object) => {
    axios({
      method: "PUT",
      url: `http://localhost:8080/api/v1/team?id=${
        getLocalStorage("objectTeam").idMember
      }`,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
      data: object,
    })
      .then((res) => {
        if (res.status === 200) {
          showMessage("success", "Cập nhật thông tin thành viên thành công");
          dispatch(getListTeamMember(checkEmailUser(), true));
          handleCloseModal();
        } else {
          showMessage("error", "Cập nhật thông tin thành viên thất bại");
        }
      })
      .catch((err) => {
        showMessage("error", message.CACTH_ERROR);
      });
  };
  const handleClickDelete = (id, name, vitri) => {
    Swal.fire({
      title: "Bạn chắc chắn muốn xóa thành viên này?",
      text: name + " - " + vitri,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteTeamMember(id));
      }
    });
  };
  const handleClickEdit = (item) => {
    localStorages("objectTeam", item);
    Swal.fire({
      icon: "question",
      title: "Bạn muốn sửa thông tin thành viên này?",
      text: item.name + " - " + item.position,
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
        setOpenModal(true);
        setOpenEdit(true);
        setUserInfo({
          name: item.name,
          chucVu: item.position,
        });
        setUrlAvata(item.image);
        setWebLinkCv(item.linkCv);
        setLinkCv(item.linkCv);
      } else {
        localStorage.removeItem("objectTeam");
      }
    });
  };
  const renderListTeamMember = () => {
    return props.teamMember.map((item, index) => {
      return (
        <div className="tm__box" key={index}>
          {checkPathUrl() === pathQuanLyTaiKhoan() ? (
            <div className="tm__editBox">
              <div className="tm__pencialBox">
                <Tooltip placement="top" title="Cập nhật">
                  <img
                    src={Images.PENCIL}
                    alt="edit"
                    onClick={() => {
                      handleClickEdit(item);
                    }}
                  />
                </Tooltip>
              </div>
              <div className="tm__clearBox">
                <Tooltip placement="top" title="Xóa">
                  <img
                    src={Images.RED_CANCEL}
                    alt="delete"
                    onClick={() => {
                      handleClickDelete(
                        item.idMember,
                        item.name,
                        item.position
                      );
                    }}
                  />
                </Tooltip>
              </div>
            </div>
          ) : (
            <></>
          )}

          <TeamMemberItem
            idMemeber={item.idMember}
            image={item.image}
            linkCv={item.linkCv}
            name={item.name}
            position={item.position}
          />
        </div>
      );
    });
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setUserInfo({
      name: "",
      chucVu: "",
    });
    setNameError("");
    setChucVuError("");
    setOpenModal(false);
    setUrlAvata(null);
    setLinkCv(null);
    setWebLinkCv(null);
    localStorage.removeItem("objectTeam");
    setOpenEdit(false);
  };
  const handleClickButtonThem = (e) => {
    e.preventDefault();
    if (userInfo.name === "" && userInfo.chucVu === "") {
      setNameError("Tên thành viên không được bỏ trống");
      setChucVuError("Chức vụ không được bỏ trống");
      return;
    } else {
      setNameError("");
      setChucVuError("");
    }
    if (userInfo.name === "") {
      return setNameError("Tên thành viên không được bỏ trống");
    } else {
      setNameError("");
    }
    if (userInfo.chucVu === "") {
      return setChucVuError("Chức vụ không được bỏ trống");
    } else {
      setChucVuError("");
    }
    Swal.fire({
      title: "Bạn chắc chắn muốn thêm thành viên này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (checkRoleUser() === "INVESTOR") {
          let arrayTemp = [];
          arrayTemp.push(
            finalObject(
              checkIdUser(),
              null,
              checkUrlImage(),
              checkUrlLinkCv(),
              userInfo.name,
              userInfo.chucVu
            )
          );
          postTeam(arrayTemp);
        } else {
          let arrayTemp = [];
          arrayTemp.push(
            finalObject(
              null,
              checkIdUser(),
              checkUrlImage(),
              checkUrlLinkCv(),
              userInfo.name,
              userInfo.chucVu
            )
          );
          postTeam(arrayTemp);
        }
      }
    });
  };
  const handleClickButtonUpdate = (e) => {
    e.preventDefault();
    if (userInfo.name === "" && userInfo.chucVu === "") {
      setNameError("Tên thành viên không được bỏ trống");
      setChucVuError("Chức vụ không được bỏ trống");
      return;
    } else {
      setNameError("");
      setChucVuError("");
    }
    if (userInfo.name === "") {
      return setNameError("Tên thành viên không được bỏ trống");
    } else {
      setNameError("");
    }
    if (userInfo.chucVu === "") {
      return setChucVuError("Chức vụ không được bỏ trống");
    } else {
      setChucVuError("");
    }
    Swal.fire({
      title: "Bạn chắc chắn muốn cập nhật thông tin của thành viên này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const object = {
          image: urlAvata,
          linkCv: webLinkCv,
          name: userInfo.name,
          position: userInfo.chucVu,
        };
        putTeam(object);
      }
    });
  };
  const handleBlurName = () => {
    if (userInfo.name !== "") return setNameError("");
  };
  const handleBlurChucVu = () => {
    if (userInfo.chucVu !== "") return setChucVuError("");
  };
  const handleChangeValue = (event) => {
    const { name, value } = event.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };
  const handleChangeInputLink = (event) => {
    const { value } = event.target;
    setWebLinkCv(value);
    setLinkCv(value);
  };

  const checkNoTeam = () => {
    if (checkPathUrl() === pathQuanLyTaiKhoan()) {
      return (
        <div className="tm__noTeamMember">
          <p>Hiện tại bạn không có thành viên nào</p>
          <Button type="primary" size="large" onClick={handleOpenModal}>
            Thêm thành viên
          </Button>
        </div>
      );
    } else {
      if (checkPathUrl() === pathToChuc()) {
        return (
          <div className="tm__noTeamMember">
            <p>Tổ chức này hiện tại chưa đăng tải thành viên chủ chốt</p>
          </div>
        );
      } else {
        return (
          <div className="tm__noTeamMember">
            <p>Nhà đầu tư này hiện tại chưa đăng tải thành viên chủ chốt</p>
          </div>
        );
      }
    }
  };
  const checkAddTeam = () => {
    if (checkPathUrl() === pathQuanLyTaiKhoan()) {
      return (
        <div className="tm__box tm__add" onClick={handleOpenModal}>
          <div className="tm__plusAdd">
            <img src={Images.PLUS_ADD} alt="plus-add" />
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };
  return (
    <div
      className={`tm__Wrapper${
        props.teamMember.length === 0 ? " tm__noTeamMemberWrapper" : ""
      }`}
    >
      {props.teamMember.length !== 0 ? (
        <div className="tm__displayGird">
          {checkAddTeam()}
          {renderListTeamMember()}
        </div>
      ) : (
        checkNoTeam()
      )}
      <ModalTeamMember
        openOrClose={openModal}
        closeModal={handleCloseModal}
        urlAvata={urlAvata}
        setUrlAvata={setUrlAvata}
        handleClickThem={handleClickButtonThem}
        handleBlurName={handleBlurName}
        handleBlurChucVu={handleBlurChucVu}
        handleChangeValue={handleChangeValue}
        nameError={nameError}
        chucVuError={chucVuError}
        setLinkCv={setLinkCv}
        handleChangeInputLink={handleChangeInputLink}
        setWebLinkCv={setWebLinkCv}
        webLinkCv={webLinkCv}
        linkCv={linkCv}
        openEdit={openEdit}
        handleClickUpdate={handleClickButtonUpdate}
      />
    </div>
  );
}

export default TeamMember;