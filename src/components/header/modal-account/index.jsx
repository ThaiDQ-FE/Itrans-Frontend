import React, { useState } from "react";
import { Button, Modal, Input, Tooltip, Spin, Checkbox } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./styles.scss";
import Images from "../../../assets/images/images";
import { checkRoleUser } from "../../../assets/helper/helper";
function ModalAccountHome(props) {
  const [loading, setLoading] = useState(false);

  const handleChangeCheckBox = (e) => {
    props.setCheck(!props.check);
  };
  return (
    <Modal
      className="modalah__accountHome"
      visible={props.openEdit}
      maskClosable={true}
      footer={null}
      closable={true}
      destroyOnClose={true}
      onCancel={props.close}
    >
      <h2 style={{ textAlign: "center" }}>Cập nhật thông tin tài khoản</h2>
      <div className="modalah__displayFlex">
        <div className="modalah__avata">
          <div className="modalah__TImage">
            <img
              src={props.data.logo === "" ? Images.USER_AVATA : props.data.logo}
              alt="avata"
              className={`modalah__TImageimg${
                props.avataError !== "" ? " modalah__userAvata" : ""
              }`}
            />
            <input
              className="modalah__file"
              type={loading === true ? "text" : "file"}
              id="file"
              accept="image/*"
            />
            <Tooltip title={props.avataError} color="red" placement="left">
              <label htmlFor="file" className="modalah__span">
                <img
                  src={Images.CAMERA}
                  alt="camera"
                  className="modalah__camera"
                />
                {loading === true ? (
                  <Spin className="modalah__teamlSpin" />
                ) : (
                  <></>
                )}
              </label>
            </Tooltip>
          </div>
        </div>
        <div className="modalah__info">
          <div className="modalah__nameSLY">
            <div className="modalah__name">
              <label className="modalah__fontWeight">
                {checkRoleUser() === "INVESTOR"
                  ? "Tên nhà/quỹ đầu tư"
                  : "Tên tổ chức"}
              </label>
              <Input type="text" size="large" defaultValue={props.data.name} />
            </div>
            <div className="modalah__soluongtv">
              <span className="modalah__fontWeight">Số thành viên</span>
              <Input
                type="text"
                size="large"
                defaultValue={props.data.numberOfEmp}
              />
            </div>
            <div className="modalah__namthanhlap">
              <span className="modalah__fontWeight">Năm thành lập</span>
              <Input
                type="text"
                size="large"
                defaultValue={props.data.foundedYear}
              />
            </div>
          </div>
          <div className="modalah__emailWeb">
            <div className="modalah__email">
              <span className="modalah__fontWeight">Email:</span>
              <Input
                style={{ cursor: "context-menu" }}
                type="text"
                size="large"
                defaultValue={props.data.email}
                readOnly
              />
            </div>
            <div className="modalah__website">
              <span className="modalah__fontWeight">Website:</span>
              <Input
                type="text"
                size="large"
                defaultValue={props.data.website}
              />
            </div>
          </div>
          <div style={{ textAlign: "center", marginBottom: 10 }}>
            <Checkbox onChange={handleChangeCheckBox}>Đổi mật khẩu</Checkbox>
          </div>

          <div
            className={`modalah__changePass${
              props.check === true ? " modal__openRP" : ""
            }`}
          >
            <div className="modalah__pass">
              <div className="modalah__oldpass">
                <span className="modalah__fontWeight">Mật khẩu cũ:</span>
                <Input
                  type="password"
                  size="large"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </div>
              <div className="modalah__newpass">
                <span className="modalah__fontWeight">Mật khẩu mới:</span>
                <Input.Password
                  type="password"
                  size="large"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </div>
              <div className="modalah__prepass">
                <span className="modalah__fontWeight">
                  Nhập lại mật khẩu mới:
                </span>
                <Input.Password
                  type="password"
                  size="large"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modalah__action">
        <Button type="primary" size="large" className="modalah__update">
          Cập nhật
        </Button>
      </div>
    </Modal>
  );
}

export default ModalAccountHome;
