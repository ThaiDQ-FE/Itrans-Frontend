import React, { useState } from "react";
import { Button, Pagination, Tooltip } from "antd";
import ArticlesItem from "./article-item";
import "./styles.scss";
import "antd/dist/antd.css";
import {
  authorizationAccount,
  checkEmailUser,
  checkPathUrl,
  pathNhaDauTu,
  pathQuanLyTaiKhoan,
  sessionTimeOut,
  showMessage,
} from "../../../assets/helper/helper";
import ModalCreateNews from "../modal-create-news";
import {
  checkHash,
  checkSummary,
  checkThumbnail,
  checkTitle,
} from "../../../validate/create/news";
import Swal from "sweetalert2";
import axios from "axios";
import { defaultUrlAPI } from "../../../configs/url";
import { useDispatch } from "react-redux";
import {
  deleleArticleById,
  getListArticleByGmail,
} from "../../../store/action/artical.action";
import { withRouter } from "react-router";
import Images from "../../../assets/images/images";
function NewsTab(props) {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [infoNews, setInfoNews] = useState({
    title: "",
    description: "",
  });
  const [idArticle, setIdArticle] = useState("");
  const [content, setContent] = useState("");
  const [arrayIndustries, setArrayIndustries] = useState([]);
  const [thumbnail, setThumbnail] = useState("");
  // error
  const [titleError, setTitleError] = useState("");
  const [sumError, setSumError] = useState("");
  const [thumbnailError, setThumbnailError] = useState("");
  const [hashTagError, setHashTagError] = useState("");
  const [length, setLength] = useState({
    minValue: 0,
    maxValue: 5,
  });
  const handleChange = (value) => {
    if (value <= 1) {
      setLength({
        minValue: 0,
        maxValue: 5,
      });
    } else {
      setLength({
        minValue: length.maxValue,
        maxValue: value * 5,
      });
    }
  };
  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
    setOpenModalUpdate(false);
    setThumbnail("");
    setInfoNews({
      title: "",
      description: "",
    });
    setArrayIndustries([]);
    setContent("");
    setIdArticle("");
    //error
    setTitleError("");
    setSumError("");
    setThumbnailError("");
    setHashTagError("");
  };
  const handleChangeInfo = (event) => {
    const { name, value } = event.target;
    setInfoNews({
      ...infoNews,
      [name]: value,
    });
  };
  const handleChangeValue = (value) => {
    if (arrayIndustries.length > 5) {
      setHashTagError("Chỉ được chọn tối đa 5 ngành nghề");
    } else {
      setHashTagError("");
    }
    setArrayIndustries(value);
  };
  const handleChangeContent = (e) => {};
  const handleBlurHash = () => {
    checkHash(arrayIndustries, setHashTagError);
  };
  const handleBlurTitle = () => {
    checkTitle(infoNews.title, setTitleError);
  };
  const handleBlurSum = () => {
    checkSummary(infoNews.description, setSumError);
  };
  const handleCreate = () => {
    checkTitle(infoNews.title, setTitleError);
    checkHash(arrayIndustries, setHashTagError);
    checkSummary(infoNews.description, setSumError);
    checkThumbnail(thumbnail, setThumbnailError);
    if (infoNews.title !== "") {
      if (
        titleError === "" &&
        hashTagError === "" &&
        sumError === "" &&
        thumbnailError === ""
      ) {
        if (content === "") {
          return showMessage("error", "Nội dung không được bỏ trống");
        } else if (openModal === true && openModalUpdate === true) {
          Swal.fire({
            icon: "question",
            title: "Bạn muốn cập nhật tin tức này?",
            heightAuto: true,
            timerProgressBar: false,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy",
            confirmButtonColor: "#1890ff",
            cancelButtonColor: "red",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              const object = {
                content: content,
                description: infoNews.description,
                idArticle: idArticle,
                idIndustries: arrayIndustries,
                linkThumbnail: thumbnail,
                title: infoNews.title,
              };
              updateArticle(object, props.history);
            }
          });
        } else {
          Swal.fire({
            icon: "question",
            title: "Bạn muốn tạo tin tức này?",
            heightAuto: true,
            timerProgressBar: false,
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy",
            confirmButtonColor: "#1890ff",
            cancelButtonColor: "red",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              const object = {
                content: content,
                description: infoNews.description,
                gmail: checkEmailUser(),
                idIndustries: arrayIndustries,
                linkThumbnail: thumbnail,
                title: infoNews.title,
              };
              createArticle(object, props.history);
            }
          });
        }
      }
    }
  };

  const createArticle = (object, history) => {
    axios({
      method: "POST",
      url: defaultUrlAPI() + "article",
      data: object,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          showMessage("success", "Tạo tin tức thành công");
          setTimeout(() => {
            handleClose();
            dispatch(getListArticleByGmail(checkEmailUser(), true));
          }, 2000);
        } else {
          showMessage("error", "Tạo tin tức thất bại");
        }
      })
      .catch((err) => {
        sessionTimeOut(err, history);
      });
  };
  const updateArticle = (object, history) => {
    axios({
      method: "PUT",
      url: defaultUrlAPI() + "article",
      data: object,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          showMessage("success", "Cập nhật tin tức thành công");
          setTimeout(() => {
            handleClose();
            dispatch(getListArticleByGmail(checkEmailUser(), true));
          }, 2000);
        } else {
          showMessage("error", "Cập nhật tin tức thất bại");
        }
      })
      .catch((err) => {
        sessionTimeOut(err, history);
      });
  };
  const handleDeleteArticle = (id, title) => {
    Swal.fire({
      icon: "question",
      title: "Bạn muốn xóa tin tức này?",
      html: `<b>${title}</b>`,
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
        dispatch(deleleArticleById(id, props.history));
      }
    });
    console.log(id, title);
  };
  const handleEditArticle = (value) => {
    console.log(value);
    setInfoNews({
      title: value.title,
      description: value.description,
    });
    setThumbnail(value.thumbnail);
    for (let i = 0; i < value.articleIndustries.length; i++) {
      arrayIndustries.push(value.articleIndustries[i].idIndustry);
    }
    setContent(value.content);
    setIdArticle(value.idArticle);
    Swal.fire({
      icon: "question",
      title: "Bạn muốn sửa tin tức này?",
      html: `<b>${value.title}</b>`,
      heightAuto: true,
      timerProgressBar: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#1890ff",
      cancelButtonColor: "red",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        setOpenModalUpdate(true);
        setOpenModal(true);
      } else {
        setInfoNews({
          title: "",
          description: "",
        });
        setThumbnail("");
        setArrayIndustries([]);
        setContent("");
        setIdArticle("");
      }
    });
  };
  const handleClickArticle = (id) => {
    props.history.push(`/tin-tuc/chi-tiet/${id}`);
  };
  return (
    <div
      className={`nt__wrapper${
        props.article.length === 0
          ? " nt__noArticleWrapper"
          : props.article.length === 1
          ? " nt__oneArticleWrapper"
          : ""
      }`}
    >
      {props.article.length !== 0 ? (
        checkPathUrl() === pathQuanLyTaiKhoan() ? (
          <Button
            size="large"
            className="nt__createArticle"
            type="primary"
            onClick={handleOpen}
          >
            Tạo bài đăng
          </Button>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
      {props.article && props.article.length > 0 ? (
        props.article
          .slice(length.minValue, length.maxValue)
          .map((value, index) => (
            <div className="nt__articleWrappers">
              <div
                className="nt__articleWrapper"
                key={index}
                onClick={() => handleClickArticle(value.idArticle)}
              >
                <ArticlesItem
                  id={value.idArticle}
                  owner={value.accountCreate}
                  listIndustries={value.articleIndustries}
                  createAt={value.createAt}
                  description={value.description}
                  logo={value.logo}
                  thumbnail={value.thumbnail}
                  title={value.title}
                />
              </div>
              {checkPathUrl() === pathQuanLyTaiKhoan() ? (
                <div className="nt__articleAction">
                  <Tooltip title="Chỉnh sửa">
                    <img
                      className="nt__articleEdit"
                      src={Images.PENCIL}
                      alt="edit"
                      onClick={() => handleEditArticle(value)}
                    />
                  </Tooltip>
                  <Tooltip title="Xóa">
                    <img
                      className="nt__articleDelete"
                      src={Images.RED_CANCEL}
                      alt="delete"
                      onClick={() =>
                        handleDeleteArticle(value.idArticle, value.title)
                      }
                    />
                  </Tooltip>
                </div>
              ) : (
                <></>
              )}
            </div>
          ))
      ) : checkPathUrl() === pathQuanLyTaiKhoan() ? (
        <div className="nt__noArticle">
          <p>Hiện tại bạn không có tin tức nào được đăng tải</p>
          <Button type="primary" size="large" onClick={handleOpen}>
            Tạo bài đăng
          </Button>
        </div>
      ) : (
        <div className="nt__noArticle">
          <p>
            {checkPathUrl() === pathNhaDauTu()
              ? "Nhà đầu tư này "
              : "Tổ chức này "}{" "}
            không có tin tức nào được đăng tải
          </p>
        </div>
      )}
      <div style={{ textAlign: "center", marginTop: 50, marginBottom: 60 }}>
        {props.article.length > 5 ? (
          <Pagination
            defaultPageSize={5}
            defaultCurrent={1}
            onChange={handleChange}
            total={props.article.length}
          />
        ) : (
          <></>
        )}
      </div>
      <ModalCreateNews
        open={openModal}
        openUpdate={openModalUpdate}
        close={handleClose}
        thumbnail={thumbnail}
        content={content}
        infoNews={infoNews}
        arrayIndustries={arrayIndustries}
        setThumbnail={setThumbnail}
        handleChangeInfo={handleChangeInfo}
        handleChangeValue={handleChangeValue}
        industry={props.industry}
        thumbnailError={thumbnailError}
        titleError={titleError}
        sumError={sumError}
        setThumbnailError={setThumbnailError}
        handleCreate={handleCreate}
        handleBlurTitle={handleBlurTitle}
        handleBlurSum={handleBlurSum}
        hashTagError={hashTagError}
        handleBlurHash={handleBlurHash}
        setContent={setContent}
        handleChangeContent={handleChangeContent}
      />
    </div>
  );
}

export default withRouter(NewsTab);
