import React, { useState } from "react";
import { Card, Button, Pagination, Tag } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import Images from "../../../../assets/images/images";
function RoundByIdOrganization(props) {
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
    if (value === "ACTIVE") {
      return <Tag className="rbio__active rbio__position">Hiện tại</Tag>;
    } else if (value === "PENDING") {
      return <Tag className="rbio__pending rbio__position">Đang chờ</Tag>;
    } else if (value === "EXPIRATION") {
      return <Tag className="rbio__expiration rbio__position">Hết hạn</Tag>;
    }
  };
  return (
    <div
      className={`rbio__wrapper${
        props.listRound.length > 0 ? "" : " rbio__warpperNormal"
      }`}
    >
      {props.listRound.length > 0 ? (
        <div className="rbio__addNewRound">
          <Button size="large" type="primary">
            Tạo vòng gọi vốn
          </Button>
        </div>
      ) : (
        <></>
      )}

      <div className="rbio__container">
        <div
          className={`rbio__listRound${
            props.listRound.length > 0 ? "" : " rbio__listRoundNormal"
          }`}
        >
          {props.listRound && props.listRound.length > 0 ? (
            props.listRound
              .slice(length.minValue, length.maxValue)
              .map((value, index) => (
                <Card key={index} hoverable className="rbio__itemOrg">
                  {renderTag(value.status)}
                  <img
                    src={
                      value.thumbnail === "" ? Images.NO_IMAGE : value.thumbnail
                    }
                    alt="thumbnail"
                  />
                  <div className="ribo__stage">
                    <span>Giai đoạn: </span>
                    <span>{value.stage}</span>
                  </div>
                  <div className="rbio__startDate">
                    <span>Ngày bắt đầu: </span>
                    <span>{value.startDate}</span>
                  </div>
                  <div className="rbio__endDate">
                    <span>Ngày kết thúc: </span>
                    <span>{value.endDate}</span>
                  </div>
                  {value.summary === "" ? (
                    <></>
                  ) : (
                    <div className="rbio__summary">
                      <span>Mô tả: </span>
                      <span>{value.summary}</span>
                    </div>
                  )}
                </Card>
              ))
          ) : (
            <div className="rbio__noRound">
              <p>Hiện tại bạn không có vòng gọi vốn</p>
              <Button type="primary" size="large">
                Tạo vòng gọi vốn
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

export default RoundByIdOrganization;
