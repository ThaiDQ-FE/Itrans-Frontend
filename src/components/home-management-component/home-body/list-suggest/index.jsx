import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Tooltip, Pagination, Tag } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import Images from "../../../../assets/images/images";
import { useHistory } from "react-router-dom";
import { checkRoleUser, localStorages } from "../../../../assets/helper/helper";
function RoundSuggest(props) {
  console.log(props);
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
  let history = useHistory();
  const handleClickToDetail = () => {
    history.push("/thong-tin-chi-tiet-vong-goi-von");
  };

  const renderListPro = (item) => {
    if (item && item.length > 0) {
      return item.map((value, index) => {
        return (
          <Tag color="geekblue" key={index}>
            {value}
          </Tag>
        );
      });
    }
  };
  const renderListIndus = (item) => {
    if (item && item.length > 0) {
      return item.map((value, index) => {
        return (
          <Tag color="blue" key={index}>
            {value}
          </Tag>
        );
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
                      <Card
                        onClick={() => {
                          handleClickToDetail();
                          localStorages("idRound", value.idRound);
                        }}
                        key={index}
                        hoverable
                        className="rs__itemRound"
                      >
                        <Tag className="rs__count" color="purple">
                          Phù hợp: {value.count}/4 tiêu chí
                        </Tag>
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
                        {value.checkStage === true ? (
                          <div className="rs__stage">
                            <Tag color="magenta">{value.stage}</Tag>
                          </div>
                        ) : (
                          <></>
                        )}
                        {value.checkAmount === true ? (
                          <div className="rs__fundingAmount">
                            <Tag color="green">
                              {value.fundingAmount} {" Tỷ VNĐ"}
                            </Tag>
                          </div>
                        ) : (
                          <></>
                        )}

                        <div className="rs__indus">
                          <span>{renderListIndus(value.industries)}</span>
                        </div>
                        <div className="rs__pro">
                          <span>{renderListPro(value.provinces)}</span>
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
                    style={{ textAlign: "center", marginTop: 20 }}
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
