import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, Button, Tooltip, Pagination } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import { withRouter } from "react-router-dom";
import Images from "../../../assets/images/images";
import { localStorages } from "../../../assets/helper/helper";
function OrganizationListComponent({ history }) {
  const { listOrganizationFilter } = useSelector((state) => state.organization);
  const { Meta } = Card;
  const [length, setLength] = useState({
    minValue: 0,
    maxValue: 8,
  });
  const handleChange = (value) => {
    if (value <= 1) {
      setLength({
        minValue: 0,
        maxValue: 8,
      });
    } else {
      setLength({
        minValue: length.maxValue,
        maxValue: value * 8,
      });
    }
  };
  const handleClickToDetail = (gmail, id) => {
    localStorages("gmailOrganizationToDetail", gmail);
    localStorages("idOrganizationToDetail", id);
    setTimeout(() => {
      history.push("/to-chuc/chi-tiet");
    }, 500);
  };
  return (
    <div
      className={`olc__wrapper${
        listOrganizationFilter.length > 0 ? "" : " olc__wrapperNormal"
      }`}
    >
      <div className="olc__container">
        <div
          className={`olc__listOrg${
            listOrganizationFilter.length > 0 ? "" : " olc__listOrgNormal"
          }`}
        >
          {listOrganizationFilter && listOrganizationFilter.length > 0 ? (
            listOrganizationFilter
              .slice(length.minValue, length.maxValue)
              .map((value, index) => (
                <Card
                  key={index}
                  hoverable
                  className="olc__itemOrg"
                  onClick={() => {
                    handleClickToDetail(
                      value.gmailOrganization,
                      value.idOrganization
                    );
                  }}
                >
                  <img
                    alt="logo"
                    src={value.logo === "" ? Images.NO_IMAGE : value.logo}
                  />
                  <div className="olc__name">
                    <span>{value.name}</span>
                  </div>
                  <div className="olc__stage">
                    <span>{value.stage}</span>
                  </div>
                  <div className="olc__industries">
                    <span>{value.industries + ""}</span>
                  </div>
                  <div className="olc__province">
                    <span>{value.province + ""}</span>
                  </div>
                  {value.status === "Chưa theo dõi" ? (
                    <Button className="olc__follow" type="primary">
                      Theo dõi
                    </Button>
                  ) : (
                    <Button className="olc__unFollow" type="primary">
                      Hủy theo dõi
                    </Button>
                  )}
                </Card>
              ))
          ) : (
            <div className="olc__noData">
              <img src={Images.NO_DATA} alt="no data" />
              <p>Không có dữ liệu</p>
            </div>
          )}
        </div>
        <div className="olc__paging">
          {listOrganizationFilter.length > 8 ? (
            <Pagination
              defaultCurrent={1}
              defaultPageSize={8}
              onChange={handleChange}
              total={listOrganizationFilter.length}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(OrganizationListComponent);
