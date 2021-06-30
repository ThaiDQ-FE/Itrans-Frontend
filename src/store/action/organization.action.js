import axios from "axios";
import { authorizationAccount } from "../../assets/helper/helper";
import { GET_ALL_FREE_TIME_LIST_FAILED } from "../constants/freeTime.const";
import { GET_ORGANIZATION_FILTER_SUCCESS } from "../constants/organization.const";
import { startLoading, stopLoading } from "./loading.action";

export const getOrganizationFilter = (
  arrayIndustry,
  arrayProvince,
  arrayRegion,
  arrayStage
) => {
  let baseUrl = "http://localhost:8080/api/v1/auth/filter-organization?";
  let tailUrl = "";
  arrayIndustry.map((item) => {
    let params = `idIndustry=${item}`;
    tailUrl = tailUrl + params + `&`;
  });
  arrayProvince.map((item) => {
    let params = `idProvince=${item}`;
    tailUrl = tailUrl + params + `&`;
  });
  arrayRegion.map((item) => {
    let params = `idRegion=${item}`;
    tailUrl = tailUrl + params + `&`;
  });
  arrayStage.map((item, index) => {
    if (index === arrayStage.length - 1) {
      let params = `idStage=${item}`;
      tailUrl = tailUrl + params;
    } else {
      let params = `idStage=${item}`;
      tailUrl = tailUrl + params + `&`;
    }
  });
  console.log(tailUrl);
  return (dispatch) => {
    dispatch(startLoading());
    axios({
      method: "GET",
      url: baseUrl + tailUrl,
      data: null,
    })
      .then((res) => {
        console.log(res);
        dispatch(stopLoading());
        dispatch(getOrganizationFilterSuccess(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(stopLoading());
        dispatch(getOrganizationFilterFailed(err));
      });
  };
};

export const getOrganizationFilterSuccess = (listData) => {
  return {
    type: GET_ORGANIZATION_FILTER_SUCCESS,
    payload: listData,
  };
};
export const getOrganizationFilterFailed = (err) => {
  return {
    type: GET_ALL_FREE_TIME_LIST_FAILED,
    payload: err,
  };
};
