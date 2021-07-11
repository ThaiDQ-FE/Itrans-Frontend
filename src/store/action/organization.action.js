import axios from "axios";
import { authorizationAccount } from "../../assets/helper/helper";
import { GET_ALL_FREE_TIME_LIST_FAILED } from "../constants/freeTime.const";
import { GET_ORGANIZATION_FILTER_SUCCESS } from "../constants/organization.const";
import { startLoading, stopLoading } from "./loading.action";

export const getOrganizationFilter = (
  arrayIndustry,
  arrayProvince,
  arrayRegion,
  arrayStage,
  gmail
) => {
  let baseUrl = "http://localhost:8080/api/v1/auth/filter-organization?";
  let tailUrl = "";
  if (arrayIndustry.length === 0) {
    let params = `idIndustry=0`;
    tailUrl = tailUrl + params + `&`;
  } else {
    arrayIndustry.map((item) => {
      let params = `idIndustry=${item}`;
      tailUrl = tailUrl + params + `&`;
    });
  }
  if (arrayProvince.length === 0) {
    let params = `idProvince=0`;
    tailUrl = tailUrl + params + `&`;
  } else {
    arrayProvince.map((item) => {
      let params = `idProvince=${item}`;
      tailUrl = tailUrl + params + `&`;
    });
  }
  if (arrayRegion.length === 0) {
    let params = `idRegion=0`;
    tailUrl = tailUrl + params + `&`;
  } else {
    arrayRegion.map((item) => {
      let params = `idRegion=${item}`;
      tailUrl = tailUrl + params + `&`;
    });
  }
  if (arrayStage.length === 0) {
    let params = `idStage=0`;
    tailUrl = tailUrl + params + `&`;
  } else {
    arrayStage.map((item) => {
      let params = `idStage=${item}`;
      tailUrl = tailUrl + params + `&`;
    });
  }

  let gmailTail = `mail=${gmail}`;
  return (dispatch) => {
    dispatch(startLoading());
    axios({
      method: "GET",
      url: baseUrl + tailUrl + gmailTail,
      data: null,
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(getOrganizationFilterSuccess(res.data));
      })
      .catch((err) => {
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
