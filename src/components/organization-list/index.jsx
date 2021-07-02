import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, Button, Tooltip, Pagination } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import Images from "../../assets/images/images";
function OrganizationList() {
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
  return (
    <div
      className={`ol__wrapper${
        listOrganizationFilter.length > 0 ? "" : " ol__wrapperNormal"
      }`}
    >
      <div className="ol__container">
        <div
          className={`ol__listOrg${
            listOrganizationFilter.length > 0 ? "" : " ol__listOrgNormal"
          }`}
        >
          {listOrganizationFilter && listOrganizationFilter.length > 0 ? (
            listOrganizationFilter
              .slice(length.minValue, length.maxValue)
              .map((value, index) => (
                <Card key={index} hoverable className="ol__itemOrg">
                  <img alt="logo" src={value.logo} />
                  <Meta className="ol__name" title={value.name} />
                  <Tooltip title={value.industries + ""}>
                    <Meta
                      className="ol__industries"
                      description={value.industries + ""}
                    />
                  </Tooltip>
                  <Tooltip title={value.province + ""}>
                    <Meta
                      className="ol__province"
                      description={value.province + ""}
                    />
                  </Tooltip>
                  {value.status === "Chưa theo dõi" ? (
                    <Button className="ol__follow" type="primary">
                      Theo dõi
                    </Button>
                  ) : (
                    <Button className="ol__unFollow" type="primary">
                      Hủy theo dõi
                    </Button>
                  )}
                </Card>
              ))
          ) : (
            <div className="ol__noData">
              <img src={Images.NO_DATA} alt="no data" />
              <p>Không có dữ liệu</p>
            </div>
          )}
        </div>
        <div className="ol__paging">
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

export default OrganizationList;
