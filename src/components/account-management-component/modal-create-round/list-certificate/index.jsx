import { Tooltip } from "antd";
import React from "react";
import { showMessage } from "../../../../assets/helper/helper";
import Images from "../../../../assets/images/images";
import { storage } from "../../../../configs/firebase";
import "./styles.scss";
function CertificateRound(props) {
  const handleChangeFile = (e) => {
    let fileD = e.target.files[0];
    if (fileD) {
      if (
        fileD.type.includes(
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) ||
        fileD.type.includes("application/pdf") ||
        fileD.type.includes(
          "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        ) ||
        fileD.type.includes(
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        )
      ) {
        const uploadFile = storage.ref(`images/${fileD.name}`).put(fileD);
        uploadFile.on(
          "state_changed",
          (snapshot) => {},
          (error) => {},
          () => {
            storage
              .ref("images")
              .child(fileD.name)
              .getDownloadURL()
              .then((url) => {
                const object = {
                  name: fileD.name,
                  linkResource: url,
                };
                props.setListCertificate([object, ...props.listCertificate]);
              });
          }
        );
      } else {
        showMessage("error", "Vui lòng chọn PDF, WORD,EXCEL,PPT");
      }
    }
  };
  const renderListCertificate = () => {
    return props.listCertificate.map((item, index) => {
      return (
        <li key={index} className="modal__certificateLi">
          <img
            className="modal__certificateLiX"
            src={Images.RED_CANCEL}
            alt="delete"
            onClick={() => {
              props.handleDelete(index);
            }}
          />
          <Tooltip title={item.name} placement="topRight">
            <a href={item.linkResource}>{item.name}</a>
          </Tooltip>
        </li>
      );
    });
  };
  return (
    <div className="modal__certificateWrapper">
      <div className="modal__certificateContainer">
        <ul className="modal__certificateUl">
          <li className="modal__certificateLi modal__certificateLiAdd">
            <div className="modal__addCertificate">
              <input
                className="modal__addFile"
                type="file"
                id="files"
                accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/pdf, image/*,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                onChange={handleChangeFile}
              />
              <label
                htmlFor="files"
                className="modal__addLabel"
                onChange={handleChangeFile}
              >
                <img
                  src={Images.PLUS_ADD}
                  alt="plus"
                  className="modal__addPlus"
                  onChange={handleChangeFile}
                />
              </label>
            </div>
          </li>
          {renderListCertificate()}
        </ul>
      </div>
    </div>
  );
}

export default CertificateRound;
