import React from "react";
import "./styles.scss";
import FilterInvestorComponent from "./filter-investor";
import CardInvestorComponent from "./card-investor";
function InvestorManagementComponent() {
  return (
    <>
      <FilterInvestorComponent />
      <hr className="imc__hr" />
      <CardInvestorComponent />
    </>
  );
}

export default InvestorManagementComponent;
