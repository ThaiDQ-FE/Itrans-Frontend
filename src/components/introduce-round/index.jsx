import React, { useState } from "react";
import "./styles.scss";
import Images from "../../assets/images/images";
import { Tooltip } from "antd";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import ModalUpdateIntroduce from "../modal-update-introduce";
import { localStorages,getLocalStorage } from "../../assets/helper/helper";
import { deleteIntroduce, updateIntroduce } from "../../store/action/introduce.action";
function IntroduceRound() {
  const { listIntroduceByRound } = useSelector(
    (state) => state.introduce
  );
  const { roundAndOrganization } = useSelector(
    (state) => state.round
  );
  const dispatch = useDispatch();
  const [editIntro, setEditIntro] = useState(false);
  const [values, setValues] = useState({
    title: "",
    content: "",
  });
  const [id, setId] = useState({
  });
  const handleCloseModal = () => {
    setEditIntro(false);
    localStorage.removeItem("infoEditIntro");
  };
  const handleChangeValue = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  }
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
        dispatch(deleteIntroduce(idIntroduce,roundAndOrganization.idRound));
      }
    });
  };
  const handleSubmitIntro =()=>{
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
          dispatch(updateIntroduce(id,object,roundAndOrganization.idRound))
          setEditIntro(false);
        }
      });
    }
  }
  return (
    <>
    <div style={{ marginTop: 75 }}>
      {
        listIntroduceByRound.map((value) =>

          <div className="ir__introduceWrapper" >
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
            <div className="ir__title">{value.title}</div>
            <p className="ir__content">{value.content}</p>
          </div>
        )
      }
    </div>
      <ModalUpdateIntroduce
      editIntro={editIntro}
      closeModal={handleCloseModal}
      onSubmit={handleSubmitIntro}
      handleChangeValue={handleChangeValue}
    />
    </>
  );

}
export default IntroduceRound;