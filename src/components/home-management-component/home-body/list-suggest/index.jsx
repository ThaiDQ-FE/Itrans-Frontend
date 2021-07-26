import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Tooltip, Pagination } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import Images from "../../../../assets/images/images";
import { checkRoleUser } from "../../../../assets/helper/helper";
function RoundSuggest(props) {
  console.log(props.list);
  const [length, setLength] = useState({
    minValue: 0,
    maxValue: 3,
  });
  const handleChange = (value) => {
    if (value <= 1) {
      setLength({
        minValue: 0,
        maxValue: 3,
      });
    } else {
      setLength({
        minValue: length.maxValue,
        maxValue: value * 3,
      });
    }
  };
  return (
    <div className="rs__wrapper">
      {checkRoleUser() === "INVESTOR" ? (
        <>
          <h2 className="rs__title">
            {props.list.length === 0 ? "" : "Đề xuất cho bạn"}
          </h2>
          <div
            className={`rs__wrappers${
              props.list.length > 0 ? "" : " rs__wrapperNormal"
            }`}
          >
            <div className="rs__container">
              <div
                className={`rs__listRound${
                  props.list.length > 0 ? "" : " rs__listRoundNormal"
                }`}
              >
                {props.list && props.list.length > 0 ? (
                  props.list
                    .slice(length.minValue, length.maxValue)
                    .map((value, index) => (
                      <Card key={index} hoverable className="rs__itemRound">
                        <img
                          src={
                            value.thumbnail === ""
                              ? Images.NO_IMAGE
                              : value.thumbnail
                          }
                          alt="thumbnail"
                        />
                        <div className="rs__name">
                          <img
                            className="rs__nImg"
                            src={
                              value.logo === "" ? Images.NO_IMAGE : value.logo
                            }
                            alt="logos"
                          />
                          <span>{value.organization}</span>
                        </div>
                        <div className="rs__stage">
                          <span>{value.stage}</span>
                        </div>
                        <div className="rs__date">
                          <span>{value.startDate} / </span>
                          <span>{value.endDate}</span>
                        </div>
                        {value.summary === "" ? (
                          <></>
                        ) : (
                          <div className="rs__summary">
                            <span>{value.summary}</span>
                          </div>
                        )}
                      </Card>
                    ))
                ) : (
                  <></>
                )}
              </div>
              <div className="olc__paging">
                {props.list.length > 3 ? (
                  <Pagination
                    defaultCurrent={1}
                    defaultPageSize={3}
                    onChange={handleChange}
                    total={props.list.length}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default RoundSuggest;
