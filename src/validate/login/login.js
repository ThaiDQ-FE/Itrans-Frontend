export const checkGamil = (gmail, setG) => {
  if (gmail === "") {
    return setG("Gmail không được bỏ trống");
  } else {
    setG("");
  }
  if (!gmail.includes("admin")) {
    const validGmail = new RegExp("^[a-zA-Z0-9]+.[a-zA-Z0-9]+@gmail.com$");
    if (validGmail.test(gmail) === false) {
      return setG("Định dạng gmail: @gmail.com");
    } else {
      setG("");
    }
  } else {
    setG("");
  }
};

export const checkPassword = (pass, setP) => {
  if (pass === "") {
    return setP("Mật khẩu không được bỏ trống");
  } else {
    setP("");
  }
};
