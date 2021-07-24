import React from "react";
import "./styles.scss";
import ModalAccountInvestor from "./modal-inv";
import ModalAccountOrganization from "./modal-org";
function ModalAccountHome(props) {
  console.log(props.data);
  const checkRole = props.data.hasOwnProperty("idInvestor");
  if (checkRole === true) {
    return (
      <ModalAccountInvestor
        open={props.openEdit}
        close={props.close}
        data={props.data}
        //
        arrayProvince={props.arrayProvince}
        arayPro={props.arayPro}
        arrayRegion={props.arrayRegion}
        arrayRe={props.arrayRe}
        arrayStage={props.arrayStage}
        arrayS={props.arrayS}
        arrayIndustry={props.arrayIndustry}
        arrayIn={props.arrayIn}
        arrayInvestorType={props.arrayInvestorType}
        arrayInv={props.arrayInv}
        //
        handleChangeIType={props.handleChangeIType}
        handleChangeStage={props.handleChangeStage}
        handleChangeRegion={props.handleChangeRegion}
        handleChangeProvince={props.handleChangeProvince}
        handleChangeIndustry={props.handleChangeIndustry}
        // error
        avataError={props.avataError}
        setAvataError={props.setAvataError}
      />
    );
  } else {
    return (
      <ModalAccountOrganization
        open={props.openEdit}
        close={props.close}
        data={props.data}
        avataError={props.avataError}
        setAvataError={props.setAvataError}
        //
        handleChangeProvince={props.handleChangeProvince}
        handleChangeIndustry={props.handleChangeIndustry}
        //
        arrayIndustry={props.arrayIndustry}
        arrayIn={props.arrayIn}
        arrayProvince={props.arrayProvince}
        arayPro={props.arayPro}
      />
    );
  }
}

export default ModalAccountHome;
