import React from "react";
import { checkRoleUser } from "../../../assets/helper/helper";
import RoundByIdInvestor from "./round-investor";
import RoundByIdOrganization from "./round-organization";
import "./styles.scss";
function RoundById(props) {
  return (
    <>
      {checkRoleUser() === "INVESTOR" ? (
        <RoundByIdInvestor listRound={props.listRoundByIdInvestor} />
      ) : (
        <RoundByIdOrganization listRound={props.listRoundByIdOrganization} />
      )}
    </>
  );
}

export default RoundById;
