import React, { useState } from "react";
import "./styles.scss";
import FilterInvestorComponent from "./filter-investor";
import CardInvestorComponent from "./card-investor";
function InvestorManagementComponent(props) {
  const [selectedProvince, setSelectedProvince] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  return (
    <>
      <FilterInvestorComponent
        selectedProvince={selectedProvince}
        selectedType={selectedType}
        setSelectedProvince={setSelectedProvince}
        setSelectedType={setSelectedType}
      />
      <hr className="imc__hr" />
      <CardInvestorComponent
        selectedProvince={selectedProvince}
        selectedType={selectedType}
      />
    </>
  );
}

export default InvestorManagementComponent;
