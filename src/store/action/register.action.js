import axios from "axios"
import { GET_LIST_INDUSTRY_FAIL, GET_LIST_INDUSTRY_SUCCESS, GET_LIST_PROVINCE_FAIL, GET_LIST_PROVINCE_SUCCESS, GET_LIST_STAGE_FAIL, GET_LIST_STAGE_SUCCESS } from "../constants/register.const";

export const postVerificationCode = (gmail) => {
    return (dispatch) => {
        axios({
            method: "Post",
            url: "http://localhost:8080/api/v1/auth/sendmail",
            data: { gmail },
        }
        ).then((res) => {
            localStorage.setItem('VerificationCode', JSON.stringify(res.data));
        }).catch((err) => {

        })
    }
}
 export const postBasicInformation = (gmail,password)=>{

 }
 export const postIAOTOrganization = ()=>{

 }
export const getListProvince = () => {
    return (dispatch) => {
        axios({
            method: "Get",
            url: "http://localhost:8080/api/v1/auth/get-province",
        }).then((res) => {
            dispatch(getListProvinceSuccess(res.data))
        }).catch((err) => {
            dispatch(getListProvinceFail(err))
        })
    }
}

const getListProvinceSuccess = (listProvince) => {
    return {
        type: GET_LIST_PROVINCE_SUCCESS,
        payload: listProvince
    }
}
const getListProvinceFail = (err) => {
    return {
        type: GET_LIST_PROVINCE_FAIL,
        payload: err
    }
}
export const getListIndustry = () => {
    return (dispath) => {
        axios({
            method: 'Get',
            url: 'http://localhost:8080/api/v1/auth/get-industry'
        }).then((res => {
            dispath(getListIndustrySuccess(res.data))
        })
        ).catch((err => {
            dispath(getListIndustryFail(err))
        })

        )
    }
}
const getListIndustrySuccess = (listIndustry) => {
    return {
        type: GET_LIST_INDUSTRY_SUCCESS,
        payload: listIndustry
    }

}
const getListIndustryFail = (err) => {
    return {
        type: GET_LIST_INDUSTRY_FAIL,
        payload: err
    }
}

export const getListStage = () => {
    return (dispatch) => {
        axios({
            method: 'Get',
            url: 'http://localhost:8080/api/v1/auth/get-stage'
        }).then((res => {
            dispatch(getListStageSuccess(res.data))
        })
        ).catch((err => {
            dispatch(getListStageFail(err))
        })
        )
    }
}

const getListStageSuccess = (listStage) => {
    return {
        type: GET_LIST_STAGE_SUCCESS,
        payload: listStage
    }
}
const getListStageFail = (err) => {
    return {
        type: GET_LIST_STAGE_FAIL,
        payload: err
    }

}