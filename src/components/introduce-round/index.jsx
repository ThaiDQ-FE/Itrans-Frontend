import React from "react";
import "./styles.scss";
import Images from "../../assets/images/images";
import {Tooltip } from "antd";
function IntroduceRound(){
    return (
        <div style={{marginTop:75}}>
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
          <div className="ir__title">Công ty baby shark</div>
          <p className="ir__content">Với mục tiêu phát triển tiên phong và bền vững từ khi thành lập,Ánh dương vi na đã xây dựng
          cho doanh nghiệp đó tầm nhìn và sứ mệnh như sau.
          </p>
        </div>
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
          <div className="ir__title">Tầm nhìn</div>
          <p className="ir__content">Trong 5 năm tới Ánh Dương Vina sẽ trở thành thương hiệu hàng đầu cung cấp dịch vụ trọn gói cho các khu công nghiệp Bắc Ninh
          </p>
        </div>
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
          <div className="ir__title">Chiến lược</div>
          <p className="ir__content">Trong 5 năm tới Ánh Dương Vina sẽ trở thành thương hiệu hàng đầu cung cấp dịch vụ trọn gói cho các khu công nghiệp Bắc Ninh
          </p>
        </div>
        </div>
      );

}
export default IntroduceRound;