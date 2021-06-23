import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkIdUser } from "../../../assets/helper/helper";
import CurrentFundingRound from "../../../components/current-funding-round";
import PreviousFundingRound from "../../../components/pre-funding-round";
import { getListRoundActiveByIdOrganization } from "../../../store/action/round.action";
import "./styles.scss";
function FundraisingManagement() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListRoundActiveByIdOrganization(checkIdUser()));
  }, []);
  return (
    <div className="fundm__wrapper">
      <h1 className="fundm__title">Quản lý vòng gọi vốn</h1>
      <CurrentFundingRound />
      <PreviousFundingRound />
    </div>
  );
}
export default FundraisingManagement;
