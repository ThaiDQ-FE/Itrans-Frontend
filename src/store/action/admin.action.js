import axios from "axios";
import { authorizationAccount } from "../../assets/helper/helper";
import { defaultUrlAPI, defaultUrlAPIStringTemplate } from "../../configs/url";
import "antd/dist/antd.css";
import { notification } from "antd";
import { getValueListIndustry, getValueListStage } from "./value.action";
import message from "../../assets/message/text";
export const updateStage = (object) => {
  return (dispatch) => {
    axios({
      method: "PUT",
      url: defaultUrlAPI() + "update-stage",
      data: object,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          notification["success"]({
            message: "Cập nhật giai đoạn " + object.name + " thành công",
          });
          dispatch(getValueListStage("Admin-stage"));
        } else {
          notification["error"]({
            message: "Cập nhật giai đoạn thất bại",
          });
        }
      })
      .catch((err) => {
        notification["error"]({
          message: message.CACTH_ERROR,
        });
      });
  };
};

export const createStage = (object) => {
  return (dispatch) => {
    axios({
      method: "POST",
      url: defaultUrlAPI() + "create-stage",
      data: object,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          notification["success"]({
            message: "Giai đoạn " + object.name + " đã được tạo thành công",
          });
          dispatch(getValueListStage("Admin-stage"));
        } else {
          if (res.data === "Đã tồn tại") {
            notification["error"]({
              message: "Giai đoạn " + object.name + " " + res.data,
            });
          } else {
            notification["error"]({
              message: "Giai đoạn " + object.name + " tạo không thành công",
            });
          }
        }
      })
      .catch((err) => {
        notification["error"]({
          message: message.CACTH_ERROR,
        });
      });
  };
};

export const deleteStage = (object) => {
  return (dispatch) => {
    axios({
      method: "PUT",
      url:
        defaultUrlAPIStringTemplate() +
        `delete-stage?idStage=${object.idStage}`,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          notification["success"]({
            message: "Giai đoạn " + object.name + " đã được xóa thành công",
          });
          dispatch(getValueListStage("Admin-stage"));
        } else {
          notification["error"]({
            message: "Giai đoạn " + object.name + " xóa không thành công",
          });
        }
      })
      .catch((err) => {
        notification["error"]({
          message: message.CACTH_ERROR,
        });
      });
  };
};

export const updateIndustry = (object) => {
  return (dispatch) => {
    axios({
      method: "PUT",
      url: defaultUrlAPI() + "update-industry",
      data: object,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          notification["success"]({
            message: "Cập nhật ngành nghề " + object.name + " thành công",
          });
          dispatch(getValueListIndustry("Admin-industry"));
        } else {
          notification["error"]({
            message: "Cập nhật ngành nghề thất bại",
          });
        }
      })
      .catch((err) => {
        notification["error"]({
          message: message.CACTH_ERROR,
        });
      });
  };
};

export const createIndustry = (object) => {
  return (dispatch) => {
    axios({
      method: "POST",
      url: defaultUrlAPI() + "create-industry",
      data: object,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          notification["success"]({
            message: "Ngành nghề " + object.name + " đã được tạo thành công",
          });
          dispatch(getValueListIndustry("Admin-industry"));
        } else {
          if (res.data === "Đã tồn tại") {
            notification["error"]({
              message: "Ngành nghề " + object.name + " " + res.data,
            });
          } else {
            notification["error"]({
              message: "Ngành nghề " + object.name + " tạo không thành công",
            });
          }
        }
      })
      .catch((err) => {
        notification["error"]({
          message: message.CACTH_ERROR,
        });
      });
  };
};

export const deleteIndustry = (object) => {
  return (dispatch) => {
    axios({
      method: "PUT",
      url:
        defaultUrlAPIStringTemplate() +
        `delete-industry?idIndustry=${object.idIndustry}`,
      headers: {
        Authorization: `Bearer ${authorizationAccount()}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          notification["success"]({
            message: "Ngành nghề " + object.name + " đã được xóa thành công",
          });
          dispatch(getValueListIndustry("Admin-industry"));
        } else {
          notification["error"]({
            message: "Ngành nghề " + object.name + " xóa không thành công",
          });
        }
      })
      .catch((err) => {
        notification["error"]({
          message: message.CACTH_ERROR,
        });
      });
  };
};
