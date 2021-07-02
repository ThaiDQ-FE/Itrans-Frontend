import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import message from "../../../assets/message/text";
import { getOrganizationFilter } from "../../../store/action/organization.action";
import OrganizationList from "../../../components/organization-list";
import FilterOrganization from "../../../components/filter-organization";
import "./styles.scss";
import { getLocalStorage } from "../../../assets/helper/helper";
import {
  getListIndustry,
  getListProvince,
  getListRegion,
  getListStage,
} from "../../../store/action/register.action";
function OrganizationManagement() {
  const dispatch = useDispatch();
  useEffect(() => {
    const arrayIndustry = [0];
    const arrayProvince = [0];
    const arrayRegion = [0];
    const arrayStage = [0];
    const userLogin = getLocalStorage("userInfo");
    if (userLogin === null) {
      dispatch(
        getOrganizationFilter(
          arrayIndustry,
          arrayProvince,
          arrayRegion,
          arrayStage,
          `""`
        )
      );
    } else if (userLogin !== null) {
      dispatch(
        getOrganizationFilter(
          arrayIndustry,
          arrayProvince,
          arrayRegion,
          arrayStage,
          userLogin.gmail
        )
      );
    }
    dispatch(getListStage());
    dispatch(getListProvince());
    dispatch(getListRegion());
    dispatch(getListIndustry());
  }, []);
  return (
    <div className="om__wrapper">
      <div className="om__banner">
        <div className="om__title">{message.OM_TITLE}</div>
        <div className="om__slogan">
          "{message.OM_SLOGAN}" {message.OM_SLOGAN_TAIL}
        </div>
      </div>
      <FilterOrganization />
      <hr className="om__hr" />
      <OrganizationList />
    </div>
  );
}

export default OrganizationManagement;
