import React from "react";
import { Button, Modal, Input, Tooltip, Form, Space } from "antd";
import "antd/dist/antd.css";
import "./styles.scss";
import Images from "../../../assets/images/images";
import { storage } from "../../../configs/firebase";
import { showMessage } from "../../../assets/helper/helper";
function ModalAddMedia(props) {
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
      className="modal__addMedia"
      visible={props.addMoreMedia}
      maskClosable={true}
      footer={null}
      closable={true}
      destroyOnClose={true}
      onCancel={props.closeModal}
    >
      <h3 style={{ textAlign: "center" }}>Thêm hình ảnh/video</h3>
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
      <div className="modal__addMediaAction">
        <Button type="primary" onClick={props.onSubmit}>
          Thêm
        </Button>
      </div>
    </Modal>
  );
}

export default ModalAddMedia;
