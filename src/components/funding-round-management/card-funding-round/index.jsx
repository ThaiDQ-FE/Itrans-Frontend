import React, { useState } from "react";
import { Card, Button, Pagination, Tag } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import { useSelector } from "react-redux";
import Images from "../../../assets/images/images";
function CardFundingRound() {
  const { listAllRoundActive } = useSelector((state) => state.round);
  const [length, setLength] = useState({
    minValue: 0,
    maxValue: 9,
  });
  const handleChange = (value) => {
    if (value <= 1) {
      setLength({
        minValue: 0,
        maxValue: 9,
      });
    } else {
      setLength({
        minValue: length.maxValue,
        maxValue: value * 9,
      });
    }
  };
  return (
    <div
      className={`cardFundingRound__wrapper${
        listAllRoundActive.length > 0 ? "" : " cardFundingRound__wrapperNormal"
      }`}
    >
      <div className="cardFundingRound__container">
        <div
          className={`cardFundingRound__listRound${
            listAllRoundActive.length > 0
              ? ""
              : " cardFundingRound__listRoundNormal"
          }`}
        >
          {listAllRoundActive && listAllRoundActive.length > 0 ? (
            listAllRoundActive
              .slice(length.minValue, length.maxValue)
              .map((value, index) => (
                <Card
                  key={index}
                  hoverable
                  className="cardFundingRound__itemOrg"
                >
                  <img
                    src={
                      value.thumbnail === "" ? Images.NO_IMAGE : value.thumbnail
                    }
                    alt="thumbnail"
                  />
                  <div className="cardFundingRound__name">
                    <img
                      className="cardFundingRound__nImg"
                      src={value.logo === "" ? Images.NO_IMAGE : value.logo}
                      alt="logos"
                    />
                    <span>{value.organization}</span>
                  </div>
                  <div className="cardFundingRound__stage">
                    <span>{value.stage}</span>
                  </div>
                  <div className="cardFundingRound__date">
                    <span>{value.startDate} / </span>
                    <span>{value.endDate}</span>
                  </div>
                  {value.summary === "" ? (
                    <></>
                  ) : (
                    <div className="cardFundingRound__summary">
                      <span>{value.summary}</span>
                    </div>
                  )}
                </Card>
              ))
          ) : (
            <div className="cardFundingRound__noRound">
              <p>Không có dữ liệu</p>
              <img src={Images.NO_DATA} alt="no data" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardFundingRound;