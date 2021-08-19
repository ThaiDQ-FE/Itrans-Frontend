import React, { useState } from "react";
import "./styles.scss";
import Images from "../../assets/images/images";
import { Tooltip, Button } from "antd";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import ModalUpdateIntroduce from "../modal-update-introduce";
import { localStorages, getLocalStorage } from "../../assets/helper/helper";
import {
  createIntroduce,
  deleteIntroduce,
  updateIntroduce,
} from "../../store/action/introduce.action";
import ModalAddIntroduce from "../modal-add-introduce";
function IntroduceRound() {
  const { listIntroduceByRound } = useSelector((state) => state.introduce);
  const { roundAndOrganization } = useSelector((state) => state.round);
  const userInfo = getLocalStorage("userInfo");
  const dispatch = useDispatch();
  const [editIntro, setEditIntro] = useState(false);
  const [addIntro, setAddIntro] = useState(false);
  const [values, setValues] = useState({
    title: "",
    content: "",
  });
  const [valueAdd, setValueAdd] = useState({
    title: "",
    content: "",
  });
  const [id, setId] = useState({});
  const handleCloseModal = () => {
    setEditIntro(false);
    localStorage.removeItem("infoEditIntro");
  };
  const handleCloseModalAdd = () => {
    setAddIntro(false);
  };
  const handleChangeValueAdd = (event) => {
    const { name, value } = event.target;
    setValueAdd({
      ...valueAdd,
      [name]: value,
    });
  };
  const handleChangeValue = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleAddIntro = (item) => {
    Swal.fire({
      icon: "question",
      title: "Bạn muốn thêm tiêu đề - nội dung này?",
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
        setAddIntro(true);
      }
    });
  };
  const handleEditIntro = (item) => {
    localStorages("infoEditIntro", item);
    Swal.fire({
      icon: "question",
      title: "Bạn muốn chỉnh sửa tiêu đề - nội dung này?",
      text: item.title,
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
        setEditIntro(true);
        setValues({
          title: item.title,
          content: item.content,
        });
      } else {
        localStorage.removeItem("infoEditIntro");
      }
    });
  };

  const handleDeleteIntro = (idIntroduce) => {
    Swal.fire({
      icon: "warning",
      title: "Bạn muốn xóa tiêu đề - nội dung vừa chọn?",
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
        dispatch(deleteIntroduce(idIntroduce, roundAndOrganization.idRound));
      }
    });
  };
  const handleSubmitIntro = () => {
    if (getLocalStorage("infoEditIntro") !== null) {
      const object = {
        title: values.title,
        content: values.content,
      };
      Swal.fire({
        icon: "warning",
        title: "Bạn chắc chắn tiêu đề - nội dung này?",
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
          dispatch(updateIntroduce(id, object, roundAndOrganization.idRound));
          setEditIntro(false);
        }
      });
    }
  };
  const handleSubmitIntroAdd = () => {
    Swal.fire({
      icon: "warning",
      title: "Bạn chắc chắn tiêu đề - nội dung này?",
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
        dispatch(createIntroduce(valueAdd, roundAndOrganization.idRound));
        setAddIntro(false);
      }
    });
  };
  return (
    <>
      {userInfo.role === "ORGANIZATION" && (
        <div style={{ float: "right", width: 300 }}>
          <Button
            onClick={() => {
              handleAddIntro();
            }}
            type="primary"
            size="middle"
          >
            Thêm bài giới thiệu
          </Button>
        </div>
      )}
      <div className="ir__wrapper">
        <div className="ir__gioiThoi">Giới thiệu sơ lược</div>
        {listIntroduceByRound.map((value) => (
          <div className="ir__introduceWrapper">
            {userInfo.role === "ORGANIZATION" && (
              <div className="ir__action">
                <Tooltip title="Chỉnh sửa">
                  <img
                    src={Images.PENCIL}
                    onClick={() => {
                      handleEditIntro(value);
                      setId(value.idIntroduce);
                    }}
                    alt="edit"
                  />
                </Tooltip>
                <Tooltip title="Xóa">
                  <img
                    src={Images.RED_CANCEL}
                    alt="clear"
                    onClick={() => {
                      handleDeleteIntro(value.idIntroduce);
                    }}
                  />
                </Tooltip>
              </div>
            )}
            <div className="ir__tilteContent">
              <div className="ir__title">{value.title}</div>
              <div className="ir__content">{value.content}</div>
            </div>
          </div>
        ))}
      </div>
      <ModalUpdateIntroduce
        editIntro={editIntro}
        closeModal={handleCloseModal}
        onSubmit={handleSubmitIntro}
        handleChangeValue={handleChangeValue}
      />
      <ModalAddIntroduce
        addIntro={addIntro}
        closeModal={handleCloseModalAdd}
        onSubmit={handleSubmitIntroAdd}
        handleChangeValue={handleChangeValueAdd}
      />
    </>
  );
}
export default IntroduceRound;
