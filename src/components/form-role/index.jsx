import { Button } from "@material-ui/core";
import React, { useState } from "react";
import Images from "../../assets/images/images";
import Messages from "../../assets/message/text";
import HeaderGeneral from "../header-general";
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
      name: Messages.NHA_DAU_TU_THIEN_THAN,
    },
    {
      name: Messages.NHA_DAU_TU_MAO_HIEM,
    },
    {
      name: Messages.VUON_UOM_DOANH_NGHIEP,
    },
    {
      name: Messages.QUY_DAU_TU_TU_NHAN,
    },
    {
      name: Messages.NHA_TANG_TOC_KHOI_NGHIEP,
    },
  ];
  const [click, setClick] = useState(null);
  const [choose, setChoose] = useState(null);
  const [chooseSubRole, setChooseSubRole] = useState(null);
  const [subRole, setSubRole] = useState(false);
  const [subRoleClicked, setSubRoleClicked] = useState(null);
  const handleClickBlock = (index) => {
    setClick(index);
    if (index === 0) {
      setChoose("ORGANIZATION");
      document.getElementById("block1").classList.remove("fr__rotate");
      document.getElementById("block0").classList.add("formRole__active");
      document.getElementById("block1").classList.remove("formRole__active");
      setSubRole(false);
      setChooseSubRole(null);
      setSubRoleClicked(null);
    } else {
      setChoose("INVESTOR");
      document.getElementById("block1").classList.add("fr__rotate");
      document.getElementById("block0").classList.remove("formRole__active");
      document.getElementById("block1").classList.add("formRole__active");
      setSubRole(true);
    }
  };
  const handleClickButton = () => {
    if (choose === "INVESTOR") {
      if (chooseSubRole === null) {
      } else {
        return props.setStateSubRole(chooseSubRole);
      }
    } else {
      return props.setStateRole(choose);
    }
  };
  const handleClickSubRole = (index) => {
    switch (index) {
      case 0:
        setChooseSubRole("NHA_DAU_TU_THIEN_THAN");
        break;
      case 1:
        setChooseSubRole("NHA_DAU_TU_MAO_HIEM");
        break;
      case 2:
        setChooseSubRole("VUON_UOM_DOANH_NGHIEP");
        break;
      case 3:
        setChooseSubRole("QUY_DAU_TU_TU_NHAN");
        break;
      default:
        setChooseSubRole("NHA_TANG_TOC_KHOI_NGHIEP");
        break;
    }
    setSubRoleClicked(index);
  };
  const renderSubRole = () => {
    return jsonSubRole.map((sub, index) => {
      return (
        <p
          className={index === subRoleClicked ? "active__subrole" : ""}
          key={index}
          onClick={() => handleClickSubRole(index)}
        >
          {sub.name}
        </p>
      );
    });
  };
  const renderContent = () => {
    return jsonFile.map((block, index) => {
      return (
        <div
          // className={`formRole__main${
          //   click === index ? " formRole__active" : ""
          // }`}
          className="formRole__main"
          key={index}
          onClick={() => handleClickBlock(index)}
          id={"block" + index}
        >
          {click === index ? (
            <div className="formRole__check">
              <img src={Images.CHECKED_REGISTER} alt="" />
            </div>
          ) : (
            ""
          )}
          {index === 1 ? (
            <div className="fr__subRoleActive">{renderSubRole()}</div>
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
          Tiếp theo
        </Button>
      </div>
    </div>
  );
}
export default FormRole;
