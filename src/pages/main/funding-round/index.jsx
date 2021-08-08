import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkEmailUser } from "../../../assets/helper/helper";
import FundingRoundManagement from "../../../components/funding-round-management";
import {
  getListIndustry,
  getListProvince,
  getListRegion,
  getListStage,
} from "../../../store/action/register.action";
import { getAllRoundActiveV2 } from "../../../store/action/round.action";
import "./styles.scss";
function FundingRound() {
  const dispatch = useDispatch();
  useEffect(() => {
    const min = NaN;
    const max = NaN;
    const listStage = [0];
    const listIndus = [0];
    const listPro = [0];
    const listRe = [0];
    dispatch(getListStage());
    dispatch(getListProvince());
    dispatch(getListRegion());
    dispatch(getListIndustry());
    dispatch(
      getAllRoundActiveV2(
        listIndus,
        checkEmailUser(),
        max,
        min,
        listPro,
        listRe,
        listStage
      )
    );
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
