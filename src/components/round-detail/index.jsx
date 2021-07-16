import React from "react";
import "./styles.scss";
import Images from "../../assets/images/images";
import { Card } from "antd";
function RoundDeail() {
    return (
        <div style={{ display: 'flex' }}>
            <img style={{ width: 650, height: 450, marginLeft: 150 }} src="https://i.imgur.com/KhYwqoU.png"></img>
            <div style={{ marginLeft: 20 }} >
                <Card hoverable style={{ backgroundColor: "#F3F3F3" }}>
                    <div style={{ display: 'flex', width: 525 }}>
                        <img
                            style={{ width: 125, height: 125 }}
                            src={
                                Images.USER_AVATA
                            }
                            alt="thumbnail"
                        />

                        <div style={{ marginLeft: 30 }}>
                            <p style={{ fontWeight: 650 }}><span>Công ty baby shark </span></p>
                            <p><span>Thành lập 2019 </span>
                                <span>- Navy@gmail.com</span>
                            </p>
                            <p>100 thành viên</p>
                        </div>
                    </div>
                </Card>
                <div style={{ marginTop: 20, marginLeft: 50,fontWeight: 700 }}><p>Thông tin gọi vốn:</p></div>
                <div style={{ marginTop: 10, marginLeft: 200 }}>
                    <p><span style={{ fontWeight: 600 }}>Số tiền muốn kêu gọi: </span>
                    <span>5 tỷ</span>
                    </p>
                    <p><span style={{ fontWeight: 600 }}>Phần trăm cổ phần: </span>
                    <span>10%</span>
                    </p>
                    <p><span style={{ fontWeight: 600 }}> Ngày bắt đầu: </span>
                    <span>22/12/2020</span>
                    </p>
                    <p><span style={{ fontWeight: 600 }}>Ngày kết thúc: </span>
                    <span>22/12/2021</span>
                    </p>
                </div>

            </div>
        </div>
    );
}
export default RoundDeail;