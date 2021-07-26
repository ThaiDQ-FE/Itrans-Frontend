import React from "react"
import ListDealSlider from "../../../components/list-deal-slider";
import IntroduceRound from "../../../components/introduce-round";
import "./styles.scss"
import CommentRound from "../../../components/comment-round";
import RoundDeail from "../../../components/round-detail";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLocalStorage } from "../../../assets/helper/helper";
import { getDealByRound, getListQuestionAndAnswer, getRoundAndOrganization } from "../../../store/action/round.action";
import { useSelector } from "react-redux";
import { getListDocumentByRoundId, getListIntroduceByRoundId } from "../../../store/action/introduce.action";
import DocumentRound from "../../../components/document-round";
function RoundDetailManagement() {
  const dispatch = useDispatch();
  const userLogin = getLocalStorage("userInfo");
  const idRound = getLocalStorage('idRound');
  useEffect(() => {
    dispatch(getListQuestionAndAnswer(userLogin.gmail,idRound));
    dispatch(getRoundAndOrganization(idRound));
    dispatch(getDealByRound(userLogin.gmail,idRound));
    dispatch(getListIntroduceByRoundId(idRound));
    dispatch(getListDocumentByRoundId(idRound));
  })
  return (
    <div style={{ marginTop: 100, marginBottom: 100 }}>
      <RoundDeail />
      <ListDealSlider />
      <hr id='style-four'/>
      <IntroduceRound />
      <DocumentRound/>
      <CommentRound/>
    </div>
  )
}
export default RoundDetailManagement;