import React, { useState } from "react";
import { Card, Button, Pagination, Tag } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import Images from "../../../../assets/images/images";
function RoundByIdInvestor(props) {
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
  const renderTag = (value) => {
    if (value === "PENDING") {
      return <Tag className="rbii__pending rbii__position">Đang chờ</Tag>;
    } else if (value === "ACCEPT") {
      return <Tag className="rbii__accept rbii__position">Chấp nhận</Tag>;
    } else if (value === "DONE") {
      return <Tag className="rbii__done rbii__position">Đã xong</Tag>;
    } else if (value === "REJECT") {
      return <Tag className="rbii__reject rbii__position">Bị hủy</Tag>;
    } else if (value === "CANCEL") {
      return <Tag className="rbii__cancel rbii__position">Đã hủy</Tag>;
    }
  };
  return (
    <div
      className={`rbii__wrapper${
        props.listRound.length > 0 ? "" : " rbii__warpperNormal"
      }`}
    >
      {props.listRound.length > 0 ? (
        <div className="rbii__addNewDeal">
          <Button size="large" type="primary">
            Tạo DEAL
          </Button>
        </div>
      ) : (
        <></>
      )}

      <div className="rbii__container">
        <div
          className={`rbii__listRound${
            props.listRound.length > 0 ? "" : " rbii__listRoundNormal"
          }`}
        >
          {props.listRound && props.listRound.length > 0 ? (
            props.listRound
              .slice(length.minValue, length.maxValue)
              .map((value, index) => (
                <Card key={index} hoverable className="rbii__itemOrg">
                  {renderTag(value.status)}
                  <img
                    src={
                      value.thumbnail === "" ? Images.NO_IMAGE : value.thumbnail
                    }
                    alt="thumbnail"
                  />
                  <div className="rbii__name">
                    <span>Tổ chức: </span>
                    <span className="rbii__img">
                      <img
                        src={value.logo === "" ? Images.NO_IMAGE : value.logo}
                        alt="logo"
                      />
                    </span>
                    <span className="rbii__nameValue">
                      {value.organization}
                    </span>
                  </div>
                  <div className="ribo__stage">
                    <span>Giai đoạn: </span>
                    <span>{value.stage}</span>
                  </div>
                  <div className="rbii__startDate">
                    <span>Ngày bắt đầu: </span>
                    <span>{value.startDate}</span>
                  </div>
                  <div className="rbii__endDate">
                    <span>Ngày kết thúc: </span>
                    <span>{value.endDate}</span>
                  </div>
                  {value.summary === "" ? (
                    <></>
                  ) : (
                    <div className="rbii__summary">
                      <span>Mô tả: </span>
                      <span>{value.summary}</span>
                    </div>
                  )}
                </Card>
              ))
          ) : (
            <div className="rbii__noRound">
              <p>Hiện tại bạn không có DEAL</p>
              <Button type="primary" size="large">
                Tạo DEAL
              </Button>
            </div>
          )}
        </div>
        <div className="ol__paging">
          {props.listRound.length > 9 ? (
            <Pagination
              defaultCurrent={1}
              defaultPageSize={9}
              onChange={handleChange}
              total={props.listRound.length}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default RoundByIdInvestor;
