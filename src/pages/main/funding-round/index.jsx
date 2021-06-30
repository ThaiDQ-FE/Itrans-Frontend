import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getLocalStorage } from "../../../assets/helper/helper";
import FilterFundingRound from "../../../components/filter-funding-round";
import FundingRoundComponent from "../../../components/funding-round";
import { getAllRoundByEmail } from "../../../store/action/round.action";
import "./styles.scss";
function FundingRound() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(false);
  useEffect(() => {
    const userLogin = getLocalStorage("userInfo");
    if (userLogin === null) {
      return dispatch(getAllRoundByEmail(`""`, 0));
    } else if (userLogin !== null) {
      return dispatch(getAllRoundByEmail(userLogin.gmail, 0));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="fr__wrapper">
      <h1 className="fr__title">Vòng gọi vốn</h1>
      <FilterFundingRound filter={filter} setFilter={setFilter} />
      <FundingRoundComponent filter={filter} />
    </div>
  );
}
export default FundingRound;
