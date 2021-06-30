import Swal from "sweetalert2";

export const checkRoleUser = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo !== null) return userInfo.role;
};
export const authorizationAccount = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo !== null) return userInfo.jwt;
};
export const checkIdUser = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo !== null) return userInfo.id;
};
export const checkEmailUser = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo !== null) return userInfo.gmail;
};

export const showMessage = (icon, mess) => {
  return Swal.fire({
    icon: icon,
    title: mess,
    heightAuto: true,
    timerProgressBar: false,
    showConfirmButton: false,
    timer: 2000,
  });
};
export const showMessageWithConfirm = (
  icon,
  mess,
  confirm,
  cancel,
  textConfirm,
  textCancel
) => {
  return Swal.fire({
    icon: icon,
    title: mess,
    heightAuto: true,
    timerProgressBar: false,
    showConfirmButton: confirm,
    showCancelButton: cancel,
    confirmButtonText: textConfirm,
    cancelButtonText: textCancel,
    confirmButtonColor: "#FF8412",
    cancelButtonColor: "#FC0F0F",
  });
};

export const convertNumber = (value) => {
  if (value !== null) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

export const countDecimals = (value) => {
  if (value !== "") {
    if (Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0;
  }
};

export const localStorages = (name, value) => {
  return localStorage.setItem(name, JSON.stringify(value));
};

export const getLocalStorage = (name) => {
  return JSON.parse(localStorage.getItem(name));
};
