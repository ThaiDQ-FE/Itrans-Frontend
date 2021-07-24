import axios from "axios";
import {
  GET_LIST_INVESTOR_FILTER_FAILED,
  GET_LIST_INVESTOR_FILTER_SUCCESS,
} from "../constants/investor.const";
import { startLoading, stopLoading } from "./loading.action";

export const getInvestorFilter = (
  arrayProvince,
  arrayType,
  gmail,
  isLoading
) => {
  let baseUrl = "http://localhost:8080/api/v1/auth/investor?";
  let tailUrl = "";
  if (arrayProvince.length === 0) {
    let params = `idProvince=0`;
    tailUrl = tailUrl + params + `&`;
  } else {
    arrayProvince.map((item) => {
      let params = `idProvince=${item}`;
      tailUrl = tailUrl + params + `&`;
    });
  }
  if (arrayType.length === 0) {
    let params = `idType=0`;
    tailUrl = tailUrl + params + `&`;
  } else {
    arrayType.map((item) => {
      let params = `idType=${item}`;
      tailUrl = tailUrl + params + `&`;
    });
  }
  let gmailTail = `mail=${gmail}`;
  return (dispatch) => {
    if (isLoading === true) {
      dispatch(startLoading());
    }
    axios({
      method: "GET",
      url: baseUrl + tailUrl + gmailTail,
      data: null,
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(getInvestorFilterSuccess(res.data));
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getInvestorFilterFailed(err));
      });
  };
};

export const getInvestorFilterV2 = (
  amount,
  listHead,
  listIndus,
  listPro,
  listStages,
  listType,
  gmail,
  isLoading
) => {
  let baseUrl = "http://localhost:8080/api/v1/auth/investor?";
  let amountUrl = "";
  let tailUrl = "";
  let gmailTail = `mail=${gmail}`;
  if (isNaN(amount) === false) {
    let param = `amount=${amount}`;
    amountUrl = param + `&`;
  }
  // head
  if (listHead.length === 0) {
    let params = `idHeadQuarter=0`;
    tailUrl = tailUrl + params + `&`;
  } else {
    listHead.map((item) => {
      let params = `idHeadQuarter=${item}`;
      tailUrl = tailUrl + params + `&`;
    });
  }
  // industry
  if (listIndus.length === 0) {
    let params = `idIndustries=0`;
    tailUrl = tailUrl + params + `&`;
  } else {
    listIndus.map((item) => {
      let params = `idIndustries=${item}`;
      tailUrl = tailUrl + params + `&`;
    });
  }
  // pro
  if (listPro.length === 0) {
    let params = `idProvince=0`;
    tailUrl = tailUrl + params + `&`;
  } else {
    listPro.map((item) => {
      let params = `idProvince=${item}`;
      tailUrl = tailUrl + params + `&`;
    });
  }
  // stage
  if (listStages.length === 0) {
    let params = `idStages=0`;
    tailUrl = tailUrl + params + `&`;
  } else {
    listStages.map((item) => {
      let params = `idStages=${item}`;
      tailUrl = tailUrl + params + `&`;
    });
  }
  // type
  if (listType.length === 0) {
    let params = `idType=0`;
    tailUrl = tailUrl + params + `&`;
  } else {
    listType.map((item) => {
      let params = `idType=${item}`;
      tailUrl = tailUrl + params + `&`;
    });
  }

  return (dispatch) => {
    if (isLoading === true) {
      dispatch(startLoading());
    }
    axios({
      method: "GET",
      url: baseUrl + amountUrl + tailUrl + gmailTail,
    })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(getInvestorFilterSuccess(res.data));
      })
      .catch((err) => {
        dispatch(stopLoading());
        dispatch(getInvestorFilterFailed(err));
      });
  };
};

export const getInvestorFilterSuccess = (listInvestor) => {
  return {
    type: GET_LIST_INVESTOR_FILTER_SUCCESS,
    payload: listInvestor,
  };
};

export const getInvestorFilterFailed = (err) => {
  return {
    type: GET_LIST_INVESTOR_FILTER_FAILED,
    payload: err,
  };
};
