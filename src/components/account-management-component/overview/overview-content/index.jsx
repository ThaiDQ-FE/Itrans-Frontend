import React, { useState } from "react";
import "./styles.scss";
import { Button, Tooltip } from "antd";
import "antd/dist/antd.css";
import Swal from "sweetalert2";
import Slider from "react-slick";
import ModalIntroduce from "../../modal-introduce";
import ModalAddMedia from "../../modal-add-media";
import ModalAddIntro from "../../modal-add-intro";
import ModalEditIntro from "../../modal-edit-intro";
import {
  authorizationAccount,
  checkEmailUser,
  getLocalStorage,
  localStorages,
  showMessage,
} from "../../../../assets/helper/helper";
import axios from "axios";
import message from "../../../../assets/message/text";
import { useDispatch } from "react-redux";
import {
  deleteMedia,
  getListMediaById,
} from "../../../../store/action/media.action";
import {
  deleteIntroduceById,
  getListIntroduceByGmail,
} from "../../../../store/action/introduce.action";
import Images from "../../../../assets/images/images";
function OverviewContent(props) {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [addMoreMedia, setAddMoreMedia] = useState(false);
  const [addMoreIntro, setAddMoreIntro] = useState(false);
  const [listMedia, setListMedia] = useState([]);
  const [editIntro, setEditIntro] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [values, setValues] = useState({
    title: "",
    content: "",
  });
  // delete media
  const handleDeleteMediaItem = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Bạn muốn xóa hình ảnh - video này?",
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
        dispatch(deleteMedia(id));
      }
    });
  };
  // delete intro
  const handleDeleteIntro = (id) => {
    console.log(id);
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
        dispatch(deleteIntroduceById(id));
      }
    });
  };
  // edit intro
  const handleEditIntro = (item) => {
    localStorages("infoIntro", item);
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
        localStorage.removeItem("infoIntro");
      }
    });
  };
  // blur title
  const handleBlurTitle = () => {
    if (
      values.title.length !== "" &&
      values.title.length >= 50 &&
      values.title.length <= 200
    ) {
      return setTitleError("");
    }
  };
  // blur content
  const handleBlurContent = () => {
    if (
      values.content.length !== "" &&
      values.content.length >= 200 &&
      values.content.length <= 5000
    ) {
      return setContentError("");
    }
  };
  // change value
  const handleChangeValue = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const renderListMedia = () => {
    if (props.media.length === 0) {
      return (
        <div className="oc__noMediaRender">
          <h4>Hiện tại không có hình ảnh - video đang được hiển thị</h4>
          <Button type="primary" size="large" onClick={handleOpenModalAdd}>
            Thêm ảnh/video
          </Button>
        </div>
      );
    }
    if (props.media.length === 1) {
      return props.media.map((item) => {
        if (item.type === "IMAGE") {
          return (
            <div className="right__image" key={item.id}>
              <div className="oc__actionAPI">
                <Tooltip placement="top" title="Xóa">
                  <img
                    className="oc__deleteMedia"
                    src={Images.RED_CANCEL}
                    alt="clear"
                    onClick={() => {
                      handleDeleteMediaItem(item.id);
                    }}
                  />
                </Tooltip>
                <Tooltip placement="top" title="Thêm">
                  <img
                    className="oc__createMedia"
                    src={Images.PLUS}
                    alt="add"
                    onClick={handleOpenModalAdd}
                  />
                </Tooltip>
              </div>

              <img src={item.linkMedia} alt={item.linkMedia} />
            </div>
          );
        } else {
          return (
            <div className="right__image" key={item.id}>
              <div className="oc__actionAPI">
                <Tooltip placement="top" title="Xóa">
                  <img
                    className="oc__deleteMedia"
                    src={Images.RED_CANCEL}
                    alt="clear"
                    onClick={() => {
                      handleDeleteMediaItem(item.id);
                    }}
                  />
                </Tooltip>
                <Tooltip placement="top" title="Thêm">
                  <img
                    className="oc__createMedia"
                    src={Images.PLUS}
                    alt="add"
                    onClick={handleOpenModalAdd}
                  />
                </Tooltip>
              </div>
              <video controls className="modal__ocRender">
                <source src={item.linkMedia} type="video/mp4" />
              </video>
            </div>
          );
        }
      });
    }
    if (props.media.length >= 2) {
      return props.media.map((item) => {
        return (
          <div
            className="media__slick"
            key={item.id}
            style={{ position: "relative" }}
          >
            <div className="oc__actionAPI">
              <Tooltip placement="top" title="Xóa">
                <img
                  className="oc__deleteMedia"
                  src={Images.RED_CANCEL}
                  alt="clear"
                  onClick={() => {
                    handleDeleteMediaItem(item.id);
                  }}
                />
              </Tooltip>
              <Tooltip placement="top" title="Thêm">
                <img
                  className="oc__createMedia"
                  src={Images.PLUS}
                  alt="add"
                  onClick={handleOpenModalAdd}
                />
              </Tooltip>
            </div>

            {item.type === "IMAGE" ? (
              <img src={item.linkMedia} alt={item.linkMedia} />
            ) : (
              <video controls className="modal__ocRender">
                <source src={item.linkMedia} type="video/mp4" />
              </video>
            )}
          </div>
        );
      });
    }
  };
  const renderListIntroduce = () => {
    return props.introduce.map((item) => {
      return (
        <div className="ot__introduceWrapper" key={item.idIntroduce}>
          <div className="otOc__action">
            <Tooltip title="Chỉnh sửa">
              <img
                src={Images.PENCIL}
                alt="edit"
                onClick={() => {
                  handleEditIntro(item);
                }}
              />
            </Tooltip>
            <Tooltip title="Xóa">
              <img
                src={Images.RED_CANCEL}
                alt="clear"
                onClick={() => {
                  handleDeleteIntro(item.idIntroduce);
                }}
              />
            </Tooltip>
          </div>
          <div className="ot__title">{item.title}</div>
          <p className="ot__content">{item.content}</p>
        </div>
      );
    });
  };
  // open modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  // open modal add
  const handleOpenModalAdd = () => {
    setAddMoreMedia(true);
  };
  // open modal intro
  const handleOpenModalIntro = () => {
    setAddMoreIntro(true);
  };
  // close modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setAddMoreMedia(false);
    setAddMoreIntro(false);
    setEditIntro(false);
    setListMedia([]);
    localStorage.removeItem("infoIntro");
  };
  // delete item
  const handleDeleteItem = (index) => {
    let tempListMedia = [...listMedia];
    tempListMedia.splice(index, 1);
    setListMedia(tempListMedia);
  };
  // create introduce
  const postIntroduce = (media, gmail, intro) => {
    const token = authorizationAccount();
    axios({
      method: "POST",
      url: `http://localhost:8080/api/v1/media?gmail=${gmail}`,
      data: media,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          axios({
            method: "POST",
            url: `http://localhost:8080/api/v1/introduces?gmail=${gmail}`,
            data: intro,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => {
              if (res.status === 200) {
                showMessage("success", "Thêm thông tin giới thiệu thành công");
                handleCloseModal();
                dispatch(getListMediaById(checkEmailUser()));
                dispatch(getListIntroduceByGmail(checkEmailUser()));
              } else {
                showMessage("error", "Thêm thông tin giới thiệu thất bại");
              }
            })
            .catch((err) => {
              showMessage("error", message.CACTH_ERROR);
            });
        } else {
          showMessage("error", "Thêm hình ảnh - video thất bại");
        }
      })
      .catch((err) => {
        showMessage("error", message.CACTH_ERROR);
      });
  };
  // create media
  const postMedia = (media, gmail) => {
    const token = authorizationAccount();
    axios({
      method: "POST",
      url: `http://localhost:8080/api/v1/media?gmail=${gmail}`,
      data: media,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          showMessage("success", "Thêm hình ảnh - video thành công");
          handleCloseModal();
          dispatch(getListMediaById(checkEmailUser()));
        } else {
          showMessage("error", "Thêm hình ảnh - video thất bại");
        }
      })
      .catch((err) => {
        showMessage("error", message.CACTH_ERROR);
      });
  };
  // create intro
  const postIntro = (intro, gmail) => {
    const token = authorizationAccount();
    axios({
      method: "POST",
      url: `http://localhost:8080/api/v1/introduces?gmail=${gmail}`,
      data: intro,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          showMessage("success", "Thêm thông tin giới thiệu thành công");
          handleCloseModal();
          dispatch(getListIntroduceByGmail(checkEmailUser()));
        } else {
          showMessage("error", "Thêm thông tin giới thiệu thất bại");
        }
      })
      .catch((err) => {
        showMessage("error", message.CACTH_ERROR);
      });
  };
  // update intro
  const putIntro = (object, id) => {
    const token = authorizationAccount();
    axios({
      method: "PUT",
      url: `http://localhost:8080/api/v1/introduce?idIntroduce=${id}`,
      data: object,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          showMessage("success", "Cập nhật tiêu đề - nội dung thành công");
          handleCloseModal();
          dispatch(getListIntroduceByGmail(checkEmailUser()));
        } else {
          showMessage("error", "Thêm thông tin giới thiệu thất bại");
        }
      })
      .catch((err) => {
        showMessage("error", message.CACTH_ERROR);
      });
  };
  // submit
  const handleOnFinish = (values) => {
    if (
      listMedia.length === 0 &&
      (values.form === undefined || values.form.length === 0)
    ) {
      return showMessage("warning", "Hãy thêm thông tin giới thiệu");
    }
    if (listMedia.length === 0) {
      return showMessage("warning", "Cần tối thiểu 1 hình ảnh hoặc video");
    }
    if (values.form === undefined || values.form.length === 0) {
      return showMessage("warning", "Cần tối thiểu 1 tiêu đề và nội dung");
    }
    Swal.fire({
      icon: "question",
      title: "Bạn muốn thêm những thông tin trên?",
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
        postIntroduce(listMedia, checkEmailUser(), values.form);
      }
    });
  };
  // submit media modal
  const handleSubmitMediaModal = () => {
    if (listMedia.length === 0) {
      return showMessage("warning", "Cần tối thiểu 1 hình ảnh hoặc video");
    }
    Swal.fire({
      icon: "question",
      title: "Bạn muốn thêm những hình ảnh - video đã chọn ?",
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
        postMedia(listMedia, checkEmailUser());
      }
    });
  };
  // submit intro modal
  const handleSubmitIntroModal = (values) => {
    if (values.form === undefined || values.form.length === 0) {
      return showMessage("warning", "Cần tối thiểu 1 tiêu đề và nội dung");
    }
    Swal.fire({
      icon: "question",
      title: "Bạn muốn thêm tiêu đề và nội dung phía trên ?",
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
        postIntro(values.form, checkEmailUser());
      }
    });
  };
  // submit edit intro
  const handleSubmitEditIntro = () => {
    if (values.title === "" && values.content === "") {
      setTitleError("Tiêu đề không được bỏ trống");
      setContentError("Nội dung không được bỏ trống");
      return;
    } else {
      setTitleError("");
      setContentError("");
    }
    if (values.title === "") {
      setTitleError("Tiêu đề không được bỏ trống");
      return;
    } else {
      setTitleError("");
    }
    if (values.content === "") {
      setContentError("Nội dung không được bỏ trống");
      return;
    } else {
      setContentError("");
    }
    if (values.title.length < 50) {
      setTitleError("Tiêu đề tối thiểu 50 ký tự");
      return;
    } else {
      setTitleError("");
    }
    if (values.title.length > 200) {
      setTitleError("Tiêu đề tối đa 200 ký tự");
      return;
    } else {
      setTitleError("");
    }
    if (values.content.length < 200) {
      setTitleError("Nội dung tối thiểu 200 ký tự");
      return;
    } else {
      setContentError("");
    }
    if (values.title.length > 200) {
      setTitleError("Nội dung tối đa 5000 ký tự");
      return;
    } else {
      setContentError("");
    }

    if (getLocalStorage("infoIntro") !== null) {
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
          putIntro(object, getLocalStorage("infoIntro").idIntroduce);
        }
      });
    }
  };
  return (
    <>
      {props.media.length === 0 && props.introduce.length === 0 ? (
        <div className="ot__rightNoData">
          <div className="ot__rightNoDataWrapper">
            <p>Bạn chưa có thông tin giới thiệu. Hãy tạo ngay nào</p>
            <Button type="primary" size="large" onClick={handleOpenModal}>
              Tạo thông tin giới thiệu
            </Button>
          </div>
        </div>
      ) : (
        <div className="ot__right">
          {props.media.length >= 2 ? (
            <Slider dots={true} slidesToScroll={1} slidesToShow={1}>
              {renderListMedia()}
            </Slider>
          ) : (
            renderListMedia()
          )}
          <div className="ot__introduce">
            {props.introduce.length === 0 ? (
              <div className="oc__noIntroduceRender">
                <h4>Hiện tại không có tiêu đề - nội dung</h4>
                <Button
                  type="primary"
                  size="large"
                  onClick={handleOpenModalIntro}
                >
                  Thêm tiêu đề - nội dung
                </Button>
              </div>
            ) : (
              <>
                <Tooltip placement="right" title="Thêm tiêu đề - nội dung">
                  <img
                    className="ot__ocAddIntro"
                    src={Images.PLUS}
                    alt="add"
                    onClick={handleOpenModalIntro}
                  />
                </Tooltip>
                {renderListIntroduce()}
              </>
            )}
          </div>
        </div>
      )}
      <ModalIntroduce
        openModal={openModal}
        closeModal={handleCloseModal}
        listMedia={listMedia}
        setListMedia={setListMedia}
        handleDelete={handleDeleteItem}
        handleOnFinish={handleOnFinish}
      />
      <ModalAddMedia
        addMoreMedia={addMoreMedia}
        closeModal={handleCloseModal}
        listMedia={listMedia}
        setListMedia={setListMedia}
        handleDelete={handleDeleteItem}
        onSubmit={handleSubmitMediaModal}
      />
      <ModalAddIntro
        addMoreIntro={addMoreIntro}
        closeModal={handleCloseModal}
        onSubmit={handleSubmitIntroModal}
      />
      <ModalEditIntro
        editIntro={editIntro}
        closeModal={handleCloseModal}
        onSubmit={handleSubmitEditIntro}
        titleError={titleError}
        contentError={contentError}
        handleBlurContent={handleBlurContent}
        handleBlurTitle={handleBlurTitle}
        handleChangeValue={handleChangeValue}
      />
    </>
  );
}

export default OverviewContent;
