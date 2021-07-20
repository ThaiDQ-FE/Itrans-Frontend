import React, { useState } from "react";
import "antd/dist/antd.css";
import "./styles.scss";
import { Input, Tooltip, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Images from "../../../assets/images/images";
import ArticleItem from "./article-item";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { deleleArticleById } from "../../../store/action/artical.action";
import { withRouter } from "react-router-dom";
function AdminManagementArticleComponent(props) {
  const dispatch = useDispatch();
  const [length, setLength] = useState({
    minValue: 0,
    maxValue: 10,
  });
  const handleChange = (value) => {
    if (value <= 1) {
      setLength({
        minValue: 0,
        maxValue: 10,
      });
    } else {
      setLength({
        minValue: length.maxValue,
        maxValue: value * 10,
      });
    }
  };
  const handleDeleteArticle = (id, name, title) => {
    console.log(title);
    Swal.fire({
      icon: "question",
      title: "Bạn muốn xóa tin tức này?",
      html: `${title} <br/>Của người dùng <b>${name}</b>`,
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
        dispatch(deleleArticleById(id, props.history));
      }
    });
  };
  const handleClickView = (id) => {
    props.history.push(`/admin/quan-ly-tin-tuc/chi-tiet/${id}`);
  };
  return (
    <div className="amac__wrapper">
      <div className="amac__container">
        <h2 className="amac__title">Quản lý tin tức</h2>
        <Input
          className="amac__search"
          size="large"
          placeholder="Tìm kiếm"
          prefix={<SearchOutlined />}
        />
      </div>
      <div className="amac__box">
        {props.list && props.list.length > 0
          ? props.list
              .slice(length.minValue, length.maxValue)
              .map((value, index) => (
                <div className="amac__articleWrappers">
                  <div
                    className="anac__articleWrapper"
                    key={index}
                    onClick={() => handleClickView(value.idArticle)}
                  >
                    <ArticleItem
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
                  <div className="adminArticle__action">
                    <Tooltip title="Xóa">
                      <img
                        src={Images.RED_CANCEL}
                        alt="delete"
                        onClick={() =>
                          handleDeleteArticle(
                            value.idArticle,
                            value.accountCreate,
                            value.title
                          )
                        }
                      />
                    </Tooltip>
                  </div>
                </div>
              ))
          : "dsadsa"}
      </div>
      <div className="amac__paging">
        {props.list.length > 10 ? (
          <Pagination
            defaultPageSize={10}
            defaultCurrent={1}
            onChange={handleChange}
            total={props.list.length}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default withRouter(AdminManagementArticleComponent);
