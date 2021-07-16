import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkEmailUser, getLocalStorage } from "../../../assets/helper/helper";
import FundingRoundManagement from "../../../components/funding-round-management";
import { getListStage } from "../../../store/action/register.action";
import { getAllRoundsActive } from "../../../store/action/round.action";
import "./styles.scss";
function FundingRound() {
  const dispatch = useDispatch();
  useEffect(() => {
    const userLogin = getLocalStorage("userInfo");
    const arrayStage = [0];
    const min = NaN;
    const max = NaN;
    dispatch(getListStage());
    if (userLogin === null) {
      dispatch(getAllRoundsActive(` `, max, min, arrayStage));
    } else if (userLogin !== null) {
      dispatch(getAllRoundsActive(checkEmailUser(), max, min, arrayStage));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="fr__wrapper">
      <h1 className="fr__title">Vòng gọi vốn</h1>
      <FundingRoundManagement />
    </div>
  );
}
export default FundingRound;
