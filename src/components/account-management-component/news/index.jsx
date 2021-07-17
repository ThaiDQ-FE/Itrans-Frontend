import React, { useState } from "react";
import { Button } from "antd";
import ArticlesItem from "./article-item";
import "./styles.scss";
import "antd/dist/antd.css";
import {
  authorizationAccount,
  checkEmailUser,
  checkPathUrl,
  pathNhaDauTu,
  pathQuanLyTaiKhoan,
  showMessage,
} from "../../../assets/helper/helper";
import ModalCreateNews from "../modal-create-news";
import {
  checkHash,
  checkSummary,
  checkThumbnail,
  checkTitle,
} from "../../../validate/create-news/news";
import Swal from "sweetalert2";
import axios from "axios";
import { defaultUrlAPI } from "../../../configs/url";
import { useDispatch } from "react-redux";
import { getListArticleByGmail } from "../../../store/action/artical.action";
import message from "../../../assets/message/text";
import { withRouter } from "react-router";
function NewsTab(props) {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [infoNews, setInfoNews] = useState({
    title: "",
    description: "",
  });
  const [content, setContent] = useState("");
  const [arrayIndustries, setArrayIndustries] = useState([]);
  const [thumbnail, setThumbnail] = useState("");
  // error
  const [titleError, setTitleError] = useState("");
  const [sumError, setSumError] = useState("");
  const [thumbnailError, setThumbnailError] = useState("");
  const [hashTagError, setHashTagError] = useState("");
  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
    setThumbnail("");
    setInfoNews({
      title: "",
      description: "",
    });
    setArrayIndustries([]);
    setContent("");
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
    if (arrayIndustries.length > 3) {
      setHashTagError("Chỉ được chọn tối đa 3 hashtag");
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
        } else {
          Swal.fire({
            icon: "question",
            title: "Bạn muốn tạo Tin tức này?",
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
              const object = {
                content: content,
                description: infoNews.description,
                gmail: checkEmailUser(),
                idIndustries: arrayIndustries,
                linkThumbnail: thumbnail,
                title: infoNews.title,
              };
              createArticle(object);
            }
          });
        }
      }
    }
  };

  const createArticle = (object) => {
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
        console.log(err);
        showMessage("error", message.CACTH_ERROR);
      });
  };
  const handleClickArticle = (id) => {
    props.history.push(`/tin-tuc/chi-tiet/${id}`);
  };
  const renderListArticle = () => {
    return props.article.map((item, index) => {
      return (
        <div
          className="nt__articleWrapper"
          key={index}
          onClick={() => handleClickArticle(item.idArticle)}
        >
          <ArticlesItem
            id={item.idArticle}
            owner={item.accountCreate}
            listIndustries={item.articleIndustries}
            createAt={item.createAt}
            description={item.description}
            logo={item.logo}
            thumbnail={item.thumbnail}
            title={item.title}
          />
        </div>
      );
    });
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

      {props.article.length !== 0 ? (
        renderListArticle()
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
      <ModalCreateNews
        open={openModal}
        close={handleClose}
        thumbnail={thumbnail}
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
        content={content}
        setContent={setContent}
        handleChangeContent={handleChangeContent}
      />
    </div>
  );
}

export default withRouter(NewsTab);