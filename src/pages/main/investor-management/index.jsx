import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLocalStorage } from "../../../assets/helper/helper";
import message from "../../../assets/message/text";
import FilterInvestor from "../../../components/filter-investor";
import InvestorList from "../../../components/investor-list";
import { getInvestorFilter } from "../../../store/action/investor.action";
import {
  getListInvestorType,
  getListProvince,
} from "../../../store/action/register.action";
import "./styles.scss";
function InvestorManagement() {
  const dispatch = useDispatch();
  useEffect(() => {
    const arrayType = [0];
    const arrayProvince = [0];
    const userLogin = getLocalStorage("userInfo");
    if (userLogin === null) {
      dispatch(getInvestorFilter(arrayProvince, arrayType, ` `));
    } else if (userLogin !== null) {
      dispatch(getInvestorFilter(arrayProvince, arrayType, userLogin.gmail));
    }
    dispatch(getListProvince());
    dispatch(getListInvestorType());
  }, []);
  return (
    <div className="im__wrapper">
      <div className="im__banner">
        <div className="im__title">{message.IM_TITLE}</div>
        <div className="im__slogan">
          {message.IM_SLOGAN} "{message.IM_QUOTE}" {message.IM_SLOGAN_TAIL}
        </div>
      </div>
      <FilterInvestor />
      <hr className="im__hr" />
      <InvestorList />
    </div>
  );
}

export default InvestorManagement;
