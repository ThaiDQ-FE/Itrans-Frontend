import React from "react";
import { Timeline } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import Images from "../../assets/images/images";
function OverviewTab() {
  return (
    <div className="ot__wrapper">
      <div className="ot__left">
        <div className="ot__info">
          <p className="ot__thongTin">Thông tin</p>
          <p className="ot__truSoChinh">
            <span className="ot__truSoChinhLabel">Trụ sở chính:</span>
            <span className="ot__truSoChinhText">
              120 Lý chính Thắng, Quận 3, HCM
            </span>
          </p>
          <p className="ot__webSite">
            <span className="ot__webSiteLabel">Website:</span>
            <span className="ot__webSiteText">http://www.vietnamworks.com</span>
          </p>
          <p className="ot__email">
            <span className="ot__emailLabel">Email:</span>
            <span className="ot__emailText">vietnamworks@vnw.com</span>
          </p>
        </div>
        <div className="ot__mileStone">
          <p className="ot__mileStoneTitle">Thành tựu</p>
          <div className="ot__mileStoneEdit">
            <img src={Images.EDIT_MILESTONE} alt="edit milestone" />
          </div>
          <Timeline mode="left">
            <Timeline.Item label="2021">
              Công ty đầu tư số 1 Việt Nam
            </Timeline.Item>
            <Timeline.Item label="2015">Giải thưởng 2</Timeline.Item>
            <Timeline.Item label="2012">Giải thưởng 1</Timeline.Item>
            <Timeline.Item label="2010">Thành lập công ty</Timeline.Item>
          </Timeline>
        </div>
      </div>
      <div className="ot__right">
        <div className="right__image">
          <img
            src="https://vnn-imgs-f.vgcloud.vn/2019/08/29/10/wipro-consumer-care-vn-named-the-best-company-to-work-for-in-asia-for-two-consecutive-years-600x400.jpg"
            alt=""
          />
        </div>
        <div className="right__wrapper">
          <p className="right__weight first">Công ty Baby Shark</p>
          <div className="ot__rightEdit">
            <img src={Images.EDIT_MILESTONE} alt="edit blog" />
          </div>
        </div>

        <p>
          “Với mục tiêu phát triển tiên phong và bền vững, ngay từ khi mới thành
          lập, Ánh Dương Vina đã xây dựng cho doanh nghiệp tầm nhìn và sứ mệnh
          như sau:
        </p>
        <p className="right__weight">Tầm nhìn:</p>
        <p>
          Trong 5 năm tới, Ánh Dương Vina sẽ trở thành thương hiệu hàng đầu cung
          cấp dịch vụ trọn gói cho các khu công nghiệp tại Bắc Ninh.
          <br /> Trong 10 năm tới, Ánh Dương Vina sẽ là một trong 3 công ty lớn
          nhất cả nước cung cấp các dịch vụ trọn gói cho các công ty khu vực có
          vốn đầu tư nước ngoài tại Việt Nam
        </p>
        <p className="right__weight">Sứ mệnh:</p>
        <p>
          Đối với khách hàng: Ánh Dương Vina xác định cho mình sứ trở thành
          “cánh tay nối dài của khách hàng”, dịch vụ của chúng tôi giúp khách
          hàng nâng cao hiệu suất sản xuất, tiết kiệm về thời gian, chi phí. Từ
          đó, khách hàng chỉ cần tập trung vào công việc sản xuất chuyên môn,
          nâng cao doanh số sản phẩm, góp phần thúc đẩy kinh tế nước.
        </p>
        <div className="right__organization">
          <hr />
          <p className="right__organizationTitle">Công ty Baby Shark</p>
          <p className="right__organizationText">
            “Với mục tiêu phát triển tiên phong và bền vững, ngay từ khi mới
            thành lập, Ánh Dương Vina đã xây dựng cho doanh nghiệp tầm nhìn và
            sứ mệnh như sau:
          </p>
          <div className="right__organizationVideo">
            <iframe
              height="415"
              src="https://www.youtube.com/embed/moRE9smesKc"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OverviewTab;
