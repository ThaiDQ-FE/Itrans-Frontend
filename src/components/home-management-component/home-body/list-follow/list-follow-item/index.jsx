import React from "react";
import "antd/dist/antd.css";
import "./styles.scss";
import { Skeleton, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Images from "../../../../../assets/images/images";
import {
  checkEmailUser,
  checkRoleUser,
  localStorages,
} from "../../../../../assets/helper/helper";
import { withRouter } from "react-router-dom";
import { postFollow } from "../../../../../store/action/interest.action";
function ListFollowItem(props) {
  const dispatch = useDispatch();
  const { listOrgOrInvNotFollow } = useSelector((state) => state.interest);
  const handleClickDetail = (gmail, id) => {
    if (checkRoleUser() === "INVESTOR") {
      localStorages("gmailOrganizationToDetail", gmail);
      localStorages("idOrganizationToDetail", id);
      setTimeout(() => {
        props.history.push("/to-chuc/chi-tiet");
      }, 500);
    } else {
      localStorages("gmailInvestorToDetail", gmail);
      localStorages("idInvestorToDetail", id);
      setTimeout(() => {
        props.history.push("/nha-dau-tu/chi-tiet");
      }, 500);
    }
  };
  const handleClickFollow = (gmail, name) => {
    const object = {
      follow: checkEmailUser(),
      followed: gmail,
    };
    dispatch(postFollow(object, null, name, props.history));
  };
  return (
    <div className="lfi__wrapper">
      {props.loading === true ? (
        <div className="lfi__skeleton">
          <div className="lfi__skeleOne">
            <Skeleton.Avatar active />
            <Skeleton.Input style={{ width: 200, marginLeft: 10 }} active />
          </div>
          <div className="lfi__skeleOne" style={{ marginTop: 25 }}>
            <Skeleton.Avatar active />
            <Skeleton.Input style={{ width: 200, marginLeft: 10 }} active />
          </div>
        </div>
      ) : listOrgOrInvNotFollow.length > 0 ? (
        listOrgOrInvNotFollow.map((item, index) => (
          <div className="lfi__container" key={index}>
            <div className="lfi__top">
              <div className="lfi__img">
                <img
                  src={item.logo === "" ? Images.NO_IMAGE : item.logo}
                  alt="logo"
                />
              </div>
              <div className="lfi__name">
                <span
                  className="lfi__p"
                  onClick={() => handleClickDetail(item.gmail, item.id)}
                >
                  {item.name}
                </span>
                <p className="lfi__pF">
                  {item.numberOfFollowed < 1
                    ? ""
                    : "???????c theo d??i: " + item.numberOfFollowed}
                </p>
              </div>
            </div>
            <div className="lfi__action">
              <Button
                className="lfi__button"
                type="primary"
                onClick={() => handleClickFollow(item.gmail, item.name)}
              >
                Theo d??i
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className="lfi__lackOfFollow">
          <img className="lfi__emptyBox" src={Images.EMPTY_BOX} alt="empty" />
          {checkRoleUser() === "ORGANIZATION"
            ? "Hi???n t???i b???n ???? theo d??i t???t c??? nh?? ?????u t??"
            : "Hi???n t???i b???n ???? theo d??i t???t c??? t??? ch???c"}
        </div>
      )}
    </div>
  );
}
export default withRouter(ListFollowItem);
