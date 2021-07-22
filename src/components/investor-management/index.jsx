import React, { useState } from "react";
import "./styles.scss";
import FilterInvestorComponent from "./filter-investor";
import CardInvestorComponent from "./card-investor";
function InvestorManagementComponent(props) {
  const [selectedProvince, setSelectedProvince] = useState([]);
  const [selectedP, setSelectedP] = useState([]);
  const [selectedType, setSelectedType] = useState([]);
  const [selectedT, setSelectedT] = useState([]);
  console.log(selectedProvince);
  console.log(selectedP);
  return (
    <>
      <FilterInvestorComponent
        selectedProvince={selectedProvince}
        selectedP={selectedP}
        setSelectedP={setSelectedP}
        selectedType={selectedType}
        setSelectedProvince={setSelectedProvince}
        setSelectedType={setSelectedType}
        selectedT={selectedT}
        setSelectedT={setSelectedT}
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
