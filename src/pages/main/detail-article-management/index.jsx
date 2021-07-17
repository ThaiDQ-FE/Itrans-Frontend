import React from "react";
import DetailArticleComponent from "../../../components/detail-articles-management-component";
import "./styles.scss";
import { withRouter } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailArticlesByID } from "../../../store/action/artical.action";
function DetailArticlesManagement(props) {
  const { detailArticle } = useSelector((state) => state.article);
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    const {
      params: { id },
    } = props.match;
    dispatch(getDetailArticlesByID(id));
  }, []);
  return (
    <div className="detailArticlesManagement">
      <DetailArticleComponent article={detailArticle} loading={loading} />
    </div>
  );
}

export default withRouter(DetailArticlesManagement);
