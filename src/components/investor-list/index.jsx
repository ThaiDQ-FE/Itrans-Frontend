import React, { useState } from "react";
import { Card, Button, Tooltip, Pagination } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import { useSelector } from "react-redux";
import Images from "../../assets/images/images";
function InvestorList() {
  const { listInvestorFilter } = useSelector((state) => state.investor);
  const { Meta } = Card;
  const [length, setLength] = useState({
    minValue: 0,
    maxValue: 12,
  });
  const handleChange = (value) => {
    if (value <= 1) {
      setLength({
        minValue: 0,
        maxValue: 12,
      });
    } else {
      setLength({
        minValue: length.maxValue,
        maxValue: value * 12,
      });
    }
  };
  return (
    <div
      className={`il__wrapper${
        listInvestorFilter.length > 0 ? "" : " il__wrapperNormal"
      }`}
    >
      <div className="il__container">
        <div
          className={`il__listInvestor${
            listInvestorFilter.length > 0 ? "" : " il__listInvestorNormal"
          }`}
        >
          {listInvestorFilter && listInvestorFilter.length > 0 ? (
            listInvestorFilter
              .slice(length.minValue, length.maxValue)
              .map((value, index) => (
                <Card key={index} hoverable className="il__itemInvestor">
                  <img alt="logo" src={value.logo} />
                  <Meta className="il__name" title={value.nameInvestor} />
                  <Tooltip title={value.headquarter + ""}>
                    <Meta
                      className="il__headquarter"
                      description={value.headquarter + ""}
                    />
                  </Tooltip>
                  <Tooltip title={value.investorType + ""}>
                    <Meta
                      className="il__investorType"
                      description={value.investorType + ""}
                    />
                  </Tooltip>
                  {value.status === "Chưa theo dõi" ? (
                    <Button className="il__follow" type="primary">
                      Theo dõi
                    </Button>
                  ) : (
                    <Button className="il__unFollow" type="primary">
                      Hủy theo dõi
                    </Button>
                  )}
                </Card>
              ))
          ) : (
            <div className="il__noData">
              <img src={Images.NO_DATA} alt="no data" />
              <p>Không có dữ liệu</p>
            </div>
          )}
        </div>
        <div className="il__paging">
          {listInvestorFilter.length > 12 ? (
            <Pagination
              defaultCurrent={1}
              defaultPageSize={12}
              onChange={handleChange}
              total={listInvestorFilter.length}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default InvestorList;
