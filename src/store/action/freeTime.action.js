import axios from "axios";

export const postFreeTime = (freeTime, investor) => {
  return (dispatch) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo.jwt;
    console.log(token);
    axios({
      method: "POST",
      url: "http://localhost:8080/api/v1/free-time",
      data: {
        freeTime,
        investor,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log("Thêm thành công");
      })
      .catch((err) => {
        console.log("Thêm thất bại");
      });
  };
};
