import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./styles.scss";
import logo from "../../assets/images/logo-grey.png";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Images from "../../assets/images/images";
import {
  checkEmailUser,
  checkRoleUser,
  getLocalStorage,
} from "../../assets/helper/helper";
import { useDispatch, useSelector } from "react-redux";
import ModalAccountHome from "./modal-account";
import ModalResetAccountPass from "./modal-reset";
import {
  checkNew,
  checkOld,
  checkReNew,
} from "../../validate/changePass/rePass";
import { changePassword } from "../../store/action/user.action";
import Swal from "sweetalert2";
function Header({ history }) {
  const { detailCompany } = useSelector((state) => state.detailCompany);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openReset, setOpenReset] = useState(false);
  const [changePass, setChangePass] = useState({
    oldPassword: "",
    newPassword: "",
    reNew: "",
  });
  // error
  const [oldError, setOldError] = useState("");
  const [newError, setNewError] = useState("");
  const [reNewError, setReNewError] = useState("");
  const [avataError, setAvataError] = useState("");
  //
  const [avata, setAvata] = useState(null);
  //
  const [arrayProvince, setArrayProvince] = useState([]);
  const [arayPro, setArayPro] = useState([]);
  const [arrayRegion, setArrayRegion] = useState([]);
  const [arrayRe, setArrayRe] = useState([]);
  const [arrayStage, setArrayStage] = useState([]);
  const [arrayS, setArrayS] = useState([]);
  const [arrayIndustry, setArrayIndustry] = useState([]);
  const [arrayIn, setArrayIn] = useState([]);
  const [arrayInvestorType, setArrayInvestorType] = useState([]);
  const [arrayInv, setArrayInv] = useState([]);
  //
  const handleCloseMenu = () => {
    setOpenMenu(null);
  };
  const handleCloseModal = () => {
    setOpenReset(false);
    setOpenEdit(false);
    setAvataError("");
    setChangePass({
      oldPassword: "",
      newPassword: "",
      reNew: "",
    });
    setOldError("");
    setNewError("");
    setReNewError("");
    //
    setArrayInv([]);
    setArrayInvestorType([]);
    setArrayIndustry([]);
    setArrayIn([]);
    setArrayProvince([]);
    setArayPro([]);
    setArrayRegion([]);
    setArrayRe([]);
    setArrayStage([]);
    setArrayS([]);
    //
    setAvata("");
  };
  const handleOpenModalResetPass = () => {
    setOpenMenu(null);
    setOpenReset(true);
  };
  const handleOpenMenu = (event) => {
    setOpenMenu(event.currentTarget);
  };

  const handleOpenModal = () => {
    setOpenMenu(null);
    setOpenEdit(true);
    setAvata(detailCompany.logo);
    for (let i = 0; i < detailCompany.industries.length; i++) {
      arrayIndustry.push(detailCompany.industries[i].idIndustry);
      arrayIn.push(detailCompany.industries[i].name);
    }
    for (let i = 0; i < detailCompany.provinces.length; i++) {
      arrayProvince.push(detailCompany.provinces[i].idProvince);
      arayPro.push(detailCompany.provinces[i].name);
    }
    if (checkRoleUser() === "INVESTOR") {
      for (let i = 0; i < detailCompany.investorTypes.length; i++) {
        arrayInvestorType.push(detailCompany.investorTypes[i].idInvestorType);
        arrayInv.push(detailCompany.investorTypes[i].name);
      }
      for (let i = 0; i < detailCompany.regions.length; i++) {
        arrayRegion.push(detailCompany.regions[i].idRegion);
        arrayRe.push(detailCompany.regions[i].name);
      }
      for (let i = 0; i < detailCompany.stages.length; i++) {
        arrayStage.push(detailCompany.stages[i].idStage);
        arrayS.push(detailCompany.stages[i].name);
      }
    }
  };
  const handleChangeIType = (value, action) => {
    let array = [];
    for (let i = 0; i < action.length; i++) {
      array.push(Number(action[i].key));
    }
    if (array.length > 5) {
      setArrayInvestorType(array);
      setArrayInv(value);
    } else {
      setArrayInvestorType(array);
      setArrayInv(value);
    }
  };
  const handleChangeIndustry = (value, action) => {
    let array = [];
    for (let i = 0; i < action.length; i++) {
      array.push(Number(action[i].key));
    }
    if (array.length > 5) {
      setArrayIndustry(array);
      setArrayIn(value);
    } else {
      setArrayIndustry(array);
      setArrayIn(value);
    }
  };
  const handleChangeProvince = (value, action) => {
    let array = [];
    for (let i = 0; i < action.length; i++) {
      array.push(Number(action[i].key));
    }
    if (array.length > 5) {
      setArrayProvince(array);
      setArayPro(value);
    } else {
      setArrayProvince(array);
      setArayPro(value);
    }
  };
  const handleChangeRegion = (value, action) => {
    let array = [];
    for (let i = 0; i < action.length; i++) {
      array.push(Number(action[i].key));
    }
    if (array.length > 5) {
      setArrayRegion(array);
      setArrayRe(value);
    } else {
      setArrayRegion(array);
      setArrayRe(value);
    }
  };
  const handleChangeStage = (value, action) => {
    let array = [];
    for (let i = 0; i < action.length; i++) {
      array.push(Number(action[i].key));
    }
    if (array.length > 5) {
      setArrayStage(array);
      setArrayS(value);
    } else {
      setArrayStage(array);
      setArrayS(value);
    }
  };

  const handleChangePass = (event) => {
    const { name, value } = event.target;
    setChangePass({
      ...changePass,
      [name]: value,
    });
  };

  const handleBlurOld = () => {
    checkOld(changePass.oldPassword, setOldError);
  };
  const handleBlurNew = () => {
    checkNew(changePass.newPassword, setNewError);
  };
  const handleBlurOReNew = () => {
    checkReNew(changePass.reNew, setReNewError, changePass.newPassword);
  };
  console.log(changePass);
  const handleChangePassClick = () => {
    handleBlurOld();
    handleBlurNew();
    handleBlurOReNew();
    if (
      changePass.oldPassword !== "" &&
      changePassword.newPassword !== "" &&
      changePassword.reNew !== ""
    ) {
      Swal.fire({
        icon: "question",
        title: "Bạn chắc chắn muốn đổi mật khẩu ?",
        heightAuto: true,
        timerProgressBar: false,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
        confirmButtonColor: "#1890ff",
        cancelButtonColor: "red",
      }).then((result) => {
        if (result.isConfirmed) {
          const object = {
            gmail: checkEmailUser(),
            newPassword: changePass.newPassword,
            oldPassword: changePass.oldPassword,
          };
          dispatch(changePassword(object, history));
        }
      });
    }
  };
  const handleLogoutAccount = () => {
    setOpenMenu(null);
    localStorage.removeItem("userInfo");
    history.push("/dang-nhap");
  };
  const renderTabs = () => {
    const userLogin = getLocalStorage("userInfo");
    if (userLogin !== null) {
      if (userLogin.role === "INVESTOR") {
        return (
          <>
            <li className="header__features__li">
              <NavLink
                activeClassName="active-nav-link-header-features"
                className="header__trangchu"
                to="/"
                exact={true}
              >
                Trang chủ
              </NavLink>
            </li>
            <li className="header__features__li">
              <NavLink
                activeClassName="active-nav-link-header-features"
                className="header__vgv"
                to="/to-chuc"
                exact={true}
              >
                Tổ chức
              </NavLink>
            </li>
            <li className="header__features__li">
              <NavLink
                activeClassName="active-nav-link-header-features"
                className="header__vgv"
                to="/vong-goi-von"
                exact={true}
              >
                Vòng gọi vốn
              </NavLink>
            </li>
          </>
        );
      } else if (userLogin.role === "ORGANIZATION") {
        return (
          <>
            <li className="header__features__li">
              <NavLink
                activeClassName="active-nav-link-header-features"
                className="header__trangchu"
                to="/"
                exact={true}
              >
                Trang chủ
              </NavLink>
            </li>
            <li className="header__features__li">
              <NavLink
                activeClassName="active-nav-link-header-features"
                className="header__vgv"
                to="/nha-dau-tu"
                exact={true}
              >
                Nhà đầu tư
              </NavLink>
            </li>
          </>
        );
      }
    }
  };

  return (
    <div
      className={`header__container${
        getLocalStorage("userInfo") === null || checkRoleUser() === "ADMIN"
          ? " class_disable"
          : ""
      }`}
    >
      <div className="header__logo">
        <NavLink
          activeClassName="active-nav-link"
          className="header__navlink__dangky"
          to="/"
          exact={true}
        >
          <img src={logo} alt="logo" />
        </NavLink>
      </div>
      <div
        className={`header__features${
          checkRoleUser() === "ORGANIZATION" ? " header__featuresRole" : ""
        }`}
      >
        <ul className="header__features__ul">{renderTabs()}</ul>
      </div>
      <div className="header__login">
        {user !== null ? (
          <div className="header__logined" onClick={handleOpenMenu}>
            <img
              src={
                detailCompany.logo === ""
                  ? Images.USER_AVATA
                  : detailCompany.logo
              }
              alt=""
            />
            <span>{user !== null ? user.gmail : ""}</span>
          </div>
        ) : (
          <ul className="header__login__ul">
            <li className="header__login__li">
              <NavLink
                activeClassName="active-nav-link"
                className="header__navlink__dangky"
                to="/dang-ky"
                exact={true}
              >
                Đăng ký
              </NavLink>
            </li>
            <li className="header__login__li">
              <NavLink
                activeClassName="active-nav-link"
                className="header__navlink__dangnhap"
                to="/dang-nhap"
                exact={true}
              >
                Đăng nhập
              </NavLink>
            </li>
          </ul>
        )}
      </div>
      <Menu
        id="simple-menu"
        anchorEl={openMenu}
        keepMounted
        open={Boolean(openMenu)}
        onClose={handleCloseMenu}
        className="menu__navbar"
      >
        <MenuItem>
          <NavLink
            activeClassName="active-nav-link"
            className="header__navlink__quanLyTaiKhoan"
            to="/quan-ly-tai-khoan"
            exact={false}
          >
            <div className="header__menuAccount">
              <img src={Images.BUILDINGS} alt="" />
              <span>Tổ chức của tôi</span>
            </div>
          </NavLink>
        </MenuItem>
        <hr className="header__hr" />
        <MenuItem>
          <div className="header__menuAccount" onClick={handleOpenModal}>
            <img src={Images.SETTING_COLOR} alt="" />
            <span>Cài đặt tài khoản</span>
          </div>
        </MenuItem>
        <hr className="header__hr" />
        <MenuItem>
          <div
            className="header__menuAccount"
            onClick={handleOpenModalResetPass}
          >
            <img src={Images.KEY} alt="" />
            <span>Đổi mật khẩu</span>
          </div>
        </MenuItem>
        <hr className="header__hr" />
        <MenuItem onClick={handleLogoutAccount}>
          <div className="header__menuLogout">
            <img src={Images.LOGOUT} alt="" />
            <span>Thoát</span>
          </div>
        </MenuItem>
      </Menu>
      <ModalAccountHome
        arrayProvince={arrayProvince}
        arayPro={arayPro}
        arrayRegion={arrayRegion}
        arrayRe={arrayRe}
        arrayStage={arrayStage}
        arrayS={arrayS}
        arrayIndustry={arrayIndustry}
        setArrayIn={setArrayIn}
        arrayIn={arrayIn}
        arrayInvestorType={arrayInvestorType}
        arrayInv={arrayInv}
        //
        openEdit={openEdit}
        close={handleCloseModal}
        data={detailCompany}
        // errror
        avataError={avataError}
        setAvataError={setAvataError}
        //
        //
        handleChangeIType={handleChangeIType}
        handleChangeStage={handleChangeStage}
        handleChangeRegion={handleChangeRegion}
        handleChangeProvince={handleChangeProvince}
        handleChangeIndustry={handleChangeIndustry}
      />
      <ModalResetAccountPass
        handleChangePass={handleChangePass}
        open={openReset}
        close={handleCloseModal}
        handleBlurOld={handleBlurOld}
        handleBlurNew={handleBlurNew}
        handleBlurOReNew={handleBlurOReNew}
        oldError={oldError}
        newError={newError}
        reNewError={reNewError}
        handleChangePassClick={handleChangePassClick}
      />
    </div>
  );
}
export default withRouter(Header);
