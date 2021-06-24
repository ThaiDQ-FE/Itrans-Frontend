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

export const showMessage = (icon,mess) =>{
  return Swal.fire({
    icon: icon,
    title: mess,
    heightAuto: true,
    timerProgressBar: false,
    showConfirmButton: false,
    timer: 2000,
  });
}
