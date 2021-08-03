import { Card, Pagination, Tag } from "antd";
import React, { useState } from "react";
import "antd/dist/antd.css";
import "./styles.scss";
import { useSelector } from "react-redux";
import { checkRoleUser, localStorages } from "../../assets/helper/helper";
import Images from "../../assets/images/images";
import { withRouter } from "react-router-dom";

function SuggestInvestor(props) {
  const { listInvestorSuggest } = useSelector((state) => state.investor);
  const { roundAndOrganization } = useSelector(
    (state) => state.round
);
  console.log(listInvestorSuggest);
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
  const renderListIndus = (value) => {
    if (value && value.length > 0) {
      return value.map((item, index) => {
        return (
          <Tag color="blue" key={index}>
            {item}
          </Tag>
        );
      });
    }
  };
  const renderListPro = (value) => {
    if (value && value.length > 0) {
      return value.map((item, index) => {
        return (
          <Tag color="geekblue" key={index}>
            {item}
          </Tag>
        );
      });
    }
  };
  const handleClickDetail = (gmail, id) => {
    localStorages("gmailInvestorToDetail", gmail);
    localStorages("idInvestorToDetail", id);
    setTimeout(() => {
      props.history.push("/nha-dau-tu/chi-tiet");
    }, 500);
  };
  return (
    <div className="si__wrapper">
      {roundAndOrganization.status !== 'PENDING' && 
      checkRoleUser() === "ORGANIZATION" ? (
        <>
          <h2 className="si__title">
            {listInvestorSuggest && listInvestorSuggest.length > 0
              ? "Đề xuất cho bạn"
              : ""}
          </h2>
          <div
            className={`si__wrappers${
              listInvestorSuggest && listInvestorSuggest.length > 0
                ? ""
                : " si__wrapperNormal"
            }`}
          >
            <div className="si__container">
              <div
                className={`si__listInves${
                  listInvestorSuggest && listInvestorSuggest.length > 0
                    ? ""
                    : " si__listInvesNormal"
                }`}
              >
                {listInvestorSuggest && listInvestorSuggest.length > 0 ? (
                  listInvestorSuggest
                    .slice(length.minValue, length.maxValue)
                    .map((value, index) => (
                      <Card key={index} className="si__itemInves">
                        <Tag className="si__count" color="purple">
                          Phù hợp: {value.count}/4 tiêu chí
                        </Tag>
                        <img
                          src={value.logo === "" ? Images.NO_IMAGE : value.logo}
                          alt="thumbnail"
                          className="si__logo"
                        />
                        <div className="si__name">
                          <span
                            onClick={() => {
                              handleClickDetail(value.mail, value.idInvestor);
                            }}
                          >
                            {value.nameInvestor}
                          </span>
                        </div>
                        {value.stage === null ? (
                          <></>
                        ) : (
                          <div className="si__stage">
                            <Tag color="magenta">{value.stage}</Tag>
                          </div>
                        )}
                        <div className="si__money">
                          <Tag color="green" className="si__minMoney">
                            {value.min + " Tỷ VNĐ"}
                          </Tag>
                          {" - "}
                          <Tag color="green">{value.max + " Tỷ VNĐ"}</Tag>
                        </div>
                        <div className="si__indus">
                          <span>{renderListIndus(value.industries)}</span>
                        </div>
                        <div className="si__pro">
                          <span>{renderListPro(value.provinces)}</span>
                        </div>
                      </Card>
                    ))
                ) : (
                  <></>
                )}
              </div>
              <div className="olc__paging">
                {listInvestorSuggest && listInvestorSuggest.length > 3 ? (
                  <Pagination
                    style={{ textAlign: "center", marginTop: 20 }}
                    defaultCurrent={1}
                    defaultPageSize={3}
                    onChange={handleChange}
                    total={listInvestorSuggest.length}
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

export default withRouter(SuggestInvestor);
