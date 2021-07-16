import React from "react";
import { Button, Modal, Input, Tooltip, Form, Space } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./styles.scss";
import Images from "../../../assets/images/images";
import { storage } from "../../../configs/firebase";
import { showMessage } from "../../../assets/helper/helper";
function ModalIntroduce(props) {
  const { TextArea } = Input;
  const renderListMedia = () => {
    return props.listMedia.map((item, index) => {
      if (item.type === "IMAGE") {
        return (
          <li key={index} className="modal__liImage">
            <Tooltip placement="top" title="Xóa">
              <img
                className="modal__clear"
                src={Images.RED_CANCEL}
                alt="clear"
                onClick={() => {
                  props.handleDelete(index);
                }}
              />
            </Tooltip>
            <img
              className="modal__iImageRender"
              src={item.linkMedia}
              alt="images"
            />
          </li>
        );
      } else {
        return (
          <li key={index} className="modal__liImage">
            <Tooltip placement="top" title="Xóa">
              <img
                className="modal__clear"
                src={Images.RED_CANCEL}
                alt="clear"
                onClick={() => {
                  props.handleDelete(index);
                }}
              />
            </Tooltip>
            <video controls className="modal__iVideoRender">
              <source src={item.linkMedia} type="video/mp4" />
            </video>
          </li>
        );
      }
    });
  };
  const handleChangeMedia = (e) => {
    if (e.target.files[0]) {
      let media = e.target.files[0];
      if (media.type.includes("image") || media.type.includes("video")) {
        const uploadMedia = storage.ref(`images/${media.name}`).put(media);
        uploadMedia.on(
          "state_changed",
          (snapshot) => {},
          (error) => {},
          () => {
            storage
              .ref("images")
              .child(media.name)
              .getDownloadURL()
              .then((url) => {
                if (url) {
                  if (media.type === "video/mp4") {
                    const object = {
                      linkMedia: url,
                      type: "VIDEO",
                    };
                    props.setListMedia([object, ...props.listMedia]);
                  } else {
                    const object = {
                      linkMedia: url,
                      type: "IMAGE",
                    };
                    props.setListMedia([object, ...props.listMedia]);
                  }
                }
              });
          }
        );
      } else {
        showMessage("error", "Vui lòng chọn Hình ảnh hoặc Video");
      }
    }
  };
  return (
    <Modal
      className="modal__introduce"
      visible={props.openModal}
      maskClosable={true}
      footer={null}
      closable={true}
      destroyOnClose={true}
      onCancel={props.closeModal}
    >
      <h3 style={{ textAlign: "center" }}>Thêm thông tin giới thiệu</h3>
      <Form className="modal__form" onFinish={props.handleOnFinish}>
        <h5>Hình ảnh-Video</h5>
        <div className="modal__iImage">
          <ul className="modal__ulImage" id="modal__iImageScroll">
            <li className="modal__liImage modal__liImageAdd">
              <div className="modal__addImage">
                <input
                  className="modal__file"
                  type="file"
                  id="file"
                  accept="image/*,video/*"
                  onChange={handleChangeMedia}
                />
                <label
                  htmlFor="file"
                  className="modal__span"
                  onChange={handleChangeMedia}
                >
                  <img
                    src={Images.PLUS_ADD}
                    alt="plus"
                    className="modal__plus"
                    onChange={handleChangeMedia}
                  />
                </label>
              </div>
            </li>
            {renderListMedia()}
          </ul>
        </div>
        <hr className="modal__imageHr" />
        <h5>Tiêu đề-Nội dung</h5>
        <div className="modal__iInwrapper">
          <div className="modal__iIntroduce">
            <Form.List name="form">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "title"]}
                        fieldKey={[fieldKey, "title"]}
                        rules={[
                          {
                            required: true,
                            message: "Tiêu đề không được bỏ trống",
                          },
                          { min: 50, message: "Độ dài tối thiểu là 50 ký tự" },
                          { max: 200, message: "Độ dài tối đa là 200 ký tự" },
                        ]}
                      >
                        <TextArea
                          placeholder="Tiêu đề"
                          style={{ resize: "none" }}
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "content"]}
                        fieldKey={[fieldKey, "content"]}
                        rules={[
                          {
                            required: true,
                            message: "Nội dung không được bỏ trống",
                          },
                          {
                            min: 200,
                            message: "Độ dài tối thiểu là 200 ký tự",
                          },
                          { max: 5000, message: "Độ dài tối đa là 5000 ký tự" },
                        ]}
                      >
                        <TextArea
                          placeholder="Nội dung"
                          style={{ resize: "none" }}
                        />
                      </Form.Item>
                      <MinusCircleOutlined
                        className="form__close"
                        onClick={() => remove(name)}
                      />
                    </Space>
                  ))}
                  <Form.Item className="modal__themTD">
                    <Button type="dashed" onClick={() => add()} block>
                      Thêm tiêu đề và nội dung
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
        </div>
        <Form.Item className="modal__iButtonThem">
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalIntroduce;
