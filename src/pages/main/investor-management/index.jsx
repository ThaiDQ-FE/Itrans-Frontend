import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  checkEmailUser,
  checkRoleUser,
  getLocalStorage,
} from "../../../assets/helper/helper";
import message from "../../../assets/message/text";
import InvestorManagementComponent from "../../../components/investor-management";
import { getInvestorFilter } from "../../../store/action/investor.action";
import {
  getListInvestorType,
  getListProvince,
} from "../../../store/action/register.action";

import NotAuth from "../../error/auth";
import "./styles.scss";
function InvestorManagement() {
  const dispatch = useDispatch();
  useEffect(() => {
    const arrayType = [0];
    const arrayProvince = [0];
    dispatch(
      getInvestorFilter(arrayProvince, arrayType, checkEmailUser(), true)
    );
    dispatch(getListInvestorType());
    dispatch(getListProvince());
  }, []);
  if (getLocalStorage("userInfo") === null) {
    return <NotAuth />;
  } else if (checkRoleUser() === "ADMIN" || checkRoleUser() === "INVESTOR") {
    return <NotAuth />;
  } else {
    return (
      <div className="im__wrapper">
        <div className="im__banner">
          <div className="im__title">{message.IM_TITLE}</div>
          <div className="im__slogan">
            {message.IM_SLOGAN} "{message.IM_QUOTE}" {message.IM_SLOGAN_TAIL}
          </div>
        </div>
        <InvestorManagementComponent />
      </div>
    );
  }
}

export default InvestorManagement;
