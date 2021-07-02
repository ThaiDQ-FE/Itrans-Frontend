import axios from "axios";
import Swal from "sweetalert2";
import {
  GET_LIST_INVESTOR_FILTER_FAILED,
  GET_LIST_INVESTOR_FILTER_SUCCESS,
} from "../constants/investor.const";
import {
  CREATE_BASIC_INFORMATION_FAIL,
  CREATE_BASIC_INFORMATION_SUCCESS,
  CREATE_ORGANIZATION_INDUSTRY_FAIL,
  CREATE_ORGANIZATION_INDUSTRY_SUCCESS,
  CREATE_ORGANIZATION_PROVINCCE_FAIL,
  CREATE_ORGANIZATION_PROVINCCE_SUCCESS,
  CREATE_ORGANIZATION_STAGE_FAIL,
  CREATE_ORGANIZATION_STAGE_SUCCESS,
  GET_LIST_INDUSTRY_FAIL,
  GET_LIST_INDUSTRY_SUCCESS,
  GET_LIST_INVESTOR_TYPE_SUCCESS,
  GET_LIST_PROVINCE_FAIL,
  GET_LIST_PROVINCE_SUCCESS,
  GET_LIST_REGION_FAILED,
  GET_LIST_REGION_SUCCESS,
  GET_LIST_STAGE_FAIL,
  GET_LIST_STAGE_SUCCESS,
} from "../constants/register.const";

export const postVerificationCode = (gmail) => {
  return (dispatch) => {
    axios({
      method: "Post",
      url: "http://localhost:8080/api/v1/auth/sendmail",
      data: { gmail },
    })
      .then((res) => {
        localStorage.setItem("VerificationCode", JSON.stringify(res.data));
      })
      .catch((err) => {});
  };
};
export const postBasicInformation = (gmail, password) => {
  const role = "ORGANIZATION";
  const rePass = password;
  return (dispatch) => {
    axios({
      method: "Post",
      url: "http://localhost:8080/api/v1/auth/registration",
      data: {
        gmail,
        password,
        rePass,
        role,
      },
    })
      .then((res) => {
        dispatch(createBasicInformationSuccess(res.data));
        const user = JSON.parse(localStorage.getItem("Form1"));
        const gmailObj = { gmail: user.gmail };
        const organization = JSON.parse(localStorage.getItem("Form2"));
        const objOrganization = Object.assign({}, gmailObj, organization);
        objOrganization.logo = "logo";
        const newObjOrganization = objOrganization;
        delete newObjOrganization.province;
        delete newObjOrganization.stage;
        delete newObjOrganization.industry;
        dispatch(postIAOTOrganization(newObjOrganization));
      })
      .catch((err) => {
        dispatch(createBasicInformationFail(err));
      });
  };
};
const createBasicInformationSuccess = (listProvince) => {
  return {
    type: CREATE_BASIC_INFORMATION_SUCCESS,
    payload: listProvince,
  };
};
const createBasicInformationFail = (err) => {
  return {
    type: CREATE_BASIC_INFORMATION_FAIL,
    payload: err,
  };
};
export const postIAOTOrganization = (organization) => {
  return (dispatch) => {
    axios({
      method: "Post",
      url: "http://localhost:8080/api/v1/auth/create-organization",
      data: organization,
    })
      .then((res) => {
        dispatch(createIAOTOrganizationSuccess(res.data));
        const organizationIndustry = [];
        const organizationProvince = [];
        const organizationOld = JSON.parse(localStorage.getItem("Form2"));
        const orId = { id: res.data };
        const or = { organization: orId };
        for (let index = 0; index < organizationOld.industry.length; index++) {
          const industryId = { id: organizationOld.industry[index] };
          const industry = { industry: industryId };
          const elementNew = Object.assign({}, industry, or);
          organizationIndustry.push(elementNew);
        }
        dispatch(postOrganizationIndustry(organizationIndustry));
        for (let index = 0; index < organizationOld.province.length; index++) {
          const provienceId = { id: organizationOld.province[index] };
          const province = { province: provienceId };
          const elementNew = Object.assign({}, province, or);
          organizationProvince.push(elementNew);
        }
        dispatch(postOrganizationProvince(organizationProvince));
        const stageId = { id: organizationOld.stage };
        const stage = { stage: stageId };
        const elementNew = Object.assign({}, stage, or);
        dispatch(postOrganizationStage(elementNew));
      })
      .catch((err) => {
        dispatch(createIAOTOrganizationFail(err));
      });
  };
};

const createIAOTOrganizationSuccess = (organization) => {
  return {
    type: CREATE_BASIC_INFORMATION_SUCCESS,
    payload: organization,
  };
};
const createIAOTOrganizationFail = (err) => {
  return {
    type: CREATE_BASIC_INFORMATION_FAIL,
    payload: err,
  };
};
export const postOrganizationProvince = (organizationProvince) => {
  return (dispatch) => {
    axios({
      method: "Post",
      url: "http://localhost:8080/api/v1/auth/create-organizationProvince",
      data: organizationProvince,
    })
      .then((res) => {
        dispatch(createOrganizationProvinceSuccess(res.data));
      })
      .catch((err) => {
        dispatch(createOrganizationProvinceFail(err));
      });
  };
};
const createOrganizationProvinceSuccess = (organizationProvince) => {
  return {
    type: CREATE_ORGANIZATION_PROVINCCE_SUCCESS,
    payload: organizationProvince,
  };
};
const createOrganizationProvinceFail = (err) => {
  return {
    type: CREATE_ORGANIZATION_PROVINCCE_FAIL,
    payload: err,
  };
};

export const postOrganizationStage = (organizationStage) => {
  return (dispatch) => {
    axios({
      method: "Post",
      url: "http://localhost:8080/api/v1/auth/create-organizationStage",
      data: organizationStage,
    })
      .then((res) => {
        dispatch(createOrganizationStageSuccess(res.data));
        Swal.fire({
          icon: "success",
          title: "Đăng ký  thành công!",
          heightAuto: true,
          timerProgressBar: false,
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          window.location.assign("http://localhost:3000/dang-nhap");
        }, 2000);
      })
      .catch((err) => {
        dispatch(createOrganizationStageFail(err));
      });
  };
};
const createOrganizationStageSuccess = (organizationStage) => {
  return {
    type: CREATE_ORGANIZATION_STAGE_SUCCESS,
    payload: organizationStage,
  };
};
const createOrganizationStageFail = (err) => {
  return {
    type: CREATE_ORGANIZATION_STAGE_FAIL,
    payload: err,
  };
};
export const postOrganizationIndustry = (organizationIndustry) => {
  return (dispatch) => {
    axios({
      method: "Post",
      url: "http://localhost:8080/api/v1/auth/create-organizationIndustry",
      data: organizationIndustry,
    })
      .then((res) => {
        dispatch(createOrganizationIndustrySuccess(res.data));
      })
      .catch((err) => {
        dispatch(createOrganizationIndustryFail(err));
      });
  };
};
const createOrganizationIndustrySuccess = (organizationIndustry) => {
  return {
    type: CREATE_ORGANIZATION_INDUSTRY_SUCCESS,
    payload: organizationIndustry,
  };
};
const createOrganizationIndustryFail = (err) => {
  return {
    type: CREATE_ORGANIZATION_INDUSTRY_FAIL,
    payload: err,
  };
};
export const getListProvince = () => {
  return (dispatch) => {
    axios({
      method: "Get",
      url: "http://localhost:8080/api/v1/auth/get-province",
    })
      .then((res) => {
        dispatch(getListProvinceSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getListProvinceFail(err));
      });
  };
};

const getListProvinceSuccess = (province) => {
  return {
    type: GET_LIST_PROVINCE_SUCCESS,
    payload: province,
  };
};
const getListProvinceFail = (err) => {
  return {
    type: GET_LIST_PROVINCE_FAIL,
    payload: err,
  };
};

export const getListRegion = () => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: "http://localhost:8080/api/v1/auth/get-region",
    })
      .then((res) => {
        dispatch(getListRegionSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getListRegionFailed(err));
      });
  };
};

const getListRegionSuccess = (listRegion) => {
  return {
    type: GET_LIST_REGION_SUCCESS,
    payload: listRegion,
  };
};

const getListRegionFailed = (err) => {
  return {
    type: GET_LIST_REGION_FAILED,
    payload: err,
  };
};
export const getListIndustry = () => {
  return (dispath) => {
    axios({
      method: "Get",
      url: "http://localhost:8080/api/v1/auth/get-industry",
    })
      .then((res) => {
        dispath(getListIndustrySuccess(res.data));
      })
      .catch((err) => {
        dispath(getListIndustryFail(err));
      });
  };
};
const getListIndustrySuccess = (listIndustry) => {
  return {
    type: GET_LIST_INDUSTRY_SUCCESS,
    payload: listIndustry,
  };
};
const getListIndustryFail = (err) => {
  return {
    type: GET_LIST_INDUSTRY_FAIL,
    payload: err,
  };
};

export const getListStage = () => {
  return (dispatch) => {
    axios({
      method: "Get",
      url: "http://localhost:8080/api/v1/auth/get-stage",
    })
      .then((res) => {
        dispatch(getListStageSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getListStageFail(err));
      });
  };
};

const getListStageSuccess = (listStage) => {
  return {
    type: GET_LIST_STAGE_SUCCESS,
    payload: listStage,
  };
};
const getListStageFail = (err) => {
  return {
    type: GET_LIST_STAGE_FAIL,
    payload: err,
  };
};

export const getListInvestorType = () => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: "http://localhost:8080/api/v1/auth/investor-type",
    })
      .then((res) => {
        dispatch(getListInvestorTypeSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getListInvestorTypeFailed(err));
      });
  };
};

const getListInvestorTypeSuccess = (listInvestorType) => {
  return {
    type: GET_LIST_INVESTOR_TYPE_SUCCESS,
    payload: listInvestorType,
  };
};

const getListInvestorTypeFailed = (err) => {
  return {
    type: GET_LIST_INVESTOR_TYPE_SUCCESS,
    payload: err,
  };
};
