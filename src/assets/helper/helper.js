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
