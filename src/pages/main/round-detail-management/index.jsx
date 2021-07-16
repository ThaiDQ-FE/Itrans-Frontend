import React from "react"
import ListDealSlider from "../../../components/list-deal-slider";
import IntroduceRound from "../../../components/introduce-round";
import "./styles.scss"
import CommentRound from "../../../components/comment-round";
import RoundDeail from "../../../components/round-detail";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLocalStorage } from "../../../assets/helper/helper";
import { getListQuestionAndAnswer } from "../../../store/action/round.action";
import { useSelector } from "react-redux";
function RoundDetailManagement() {
  const dispatch = useDispatch();
  const userLogin = getLocalStorage("userInfo");
  useEffect(() => {
    dispatch(getListQuestionAndAnswer(userLogin.gmail,1));
  })
  return (
    <div style={{ marginTop: 100, marginBottom: 100 }}>
      <RoundDeail />
      <ListDealSlider />
      <IntroduceRound />
      <CommentRound/>
    </div>
  )
}
export default RoundDetailManagement;