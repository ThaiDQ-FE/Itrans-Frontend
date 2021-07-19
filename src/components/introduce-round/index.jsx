import React from "react";
import "./styles.scss";
import Images from "../../assets/images/images";
import { Tooltip } from "antd";
import { useSelector } from "react-redux";
function IntroduceRound() {
  const { listIntroduceByRound } = useSelector(
    (state) => state.introduce
  );
  console.log(listIntroduceByRound);
  return (
    <div style={{ marginTop: 75 }}>
      {
        listIntroduceByRound.map((value) =>

          <div className="ir__introduceWrapper" >
            <div className="ir__action">
              <Tooltip title="Chỉnh sửa">
                <img
                  src={Images.PENCIL}
                  alt="edit"
                />
              </Tooltip>
              <Tooltip title="Xóa">
                <img
                  src={Images.RED_CANCEL}
                  alt="clear"
                />
              </Tooltip>
            </div>
            <div className="ir__title">{value.title}</div>
            <p className="ir__content">{value.content}</p>
          </div>
        )
      }
    </div>
  );

}
export default IntroduceRound;