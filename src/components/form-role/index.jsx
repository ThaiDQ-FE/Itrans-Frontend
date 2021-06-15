import { Button } from "@material-ui/core";
import React, { useState } from "react";
import Images from "../../assets/images/images";
import Messages from "../../assets/message/text";
import HeaderGeneral from "../header-general";
import Modal from "@material-ui/core/Modal";
import "./styles.scss";
function FormRole(props) {
  const jsonFile = [
    {
      image: Images.ORGANIZATION_REGISTER,
      name: Messages.REGISTER_ORGANIZATION,
      text: Messages.REGISTER_ORGANIZATION_TEXT,
    },
    {
      image: Images.INVESTOR_REGISTER,
      name: Messages.REGISTER_INVESTOR,
      text: Messages.REGISTER_INVESTOR_TEXT,
    },
  ];
  const jsonSubRole = [
    {
      name: Messages.INSTITUTIONAL_INVESTOR,
    },
    {
      name: Messages.INVESTOPEDIA,
    },
  ];
  const [click, setClick] = useState(null);
  const [choose, setChoose] = useState(null);
  const [modal, setModal] = useState(false);
  const handleClickBlock = (index) => {
    setClick(index);
    if (index === 0) {
      setChoose("organization");
    } else {
      setChoose("investor");
    }
  };
  const handleClickButton = () => {
    if (choose === "investor") {
      setModal(true);
    } else {
      return props.setStateRole(choose);
    }
  };
  const handleClickSubRole = (index) => {
    if (index === 0) {
      return props.setStateSubRole("INSTITUTIONAL_INVESTOR");
    } else {
      return props.setStateSubRole("INVESTOPEDIA");
    }
  };
  const handleClose = () => {
    setModal(false);
  };
  const renderSubRole = () => {
    return jsonSubRole.map((subRole, index) => {
      return (
        <div
          className="fr__modalSubRole"
          key={index}
          onClick={() => handleClickSubRole(index)}
        >
          {subRole.name}
        </div>
      );
    });
  };
  const renderBodyModal = () => {
    return (
      <div className="fr__modal">
        <div className="fr__modalContainer">
          <img
            src={Images.CANCEL}
            alt=""
            className="fr__close"
            onClick={handleClose}
          />
          <p className="fr__modalTitle">Bạn là ?</p>
          <div className="fr__modalWrapper">{renderSubRole()}</div>
        </div>
      </div>
    );
  };
  const renderContent = () => {
    return jsonFile.map((block, index) => {
      return (
        <div
          className={`formRole__main${
            click === index ? " formRole__active" : ""
          }`}
          key={index}
          onClick={() => handleClickBlock(index)}
        >
          {click === index ? (
            <div className="formRole__check">
              <img src={Images.CHECKED_REGISTER} alt="" />
            </div>
          ) : (
            ""
          )}

          <div className="formRole__image">
            <img src={block.image} alt="" />
          </div>
          <div className="formRole__name">
            <h2>{block.name}</h2>
          </div>
          <div className="formRole__text">
            <p>{block.text}</p>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="formRole__wrapper">
      <HeaderGeneral />
      <div className="formRole__title">
        <h2>{Messages.CHOOSE_ROLE_TEXT}</h2>
      </div>
      <div className="formRole__container">{renderContent()}</div>
      <div className="formRole__button">
        <Button
          disabled={choose === null}
          variant="contained"
          color="primary"
          onClick={handleClickButton}
        >
          Tiếp Tục
        </Button>
      </div>
      <Modal
        open={modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {renderBodyModal()}
      </Modal>
    </div>
  );
}
export default FormRole;
