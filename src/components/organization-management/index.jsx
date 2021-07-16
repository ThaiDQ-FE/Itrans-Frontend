import React from "react";
import "./styles.scss";
import FilterOrganizationComponent from "./filter-organization";
import OrganizationListComponent from "./card-organization";
function OrganizationManagementComponent() {
  return (
    <>
      <FilterOrganizationComponent />
      <hr className="omc__hr" />
      <OrganizationListComponent />
    </>
  );
}

export default OrganizationManagementComponent;
