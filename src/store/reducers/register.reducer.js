import { CREATE_BASIC_INFORMATION_FAIL, CREATE_BASIC_INFORMATION_SUCCESS, CREATE_IAT_ORGANIZATION_FAIL, CREATE_IAT_ORGANIZATION_SUCCESS, CREATE_ORGANIZATION_INDUSTRY_FAIL, CREATE_ORGANIZATION_INDUSTRY_SUCCESS, CREATE_ORGANIZATION_PROVINCCE_FAIL, CREATE_ORGANIZATION_PROVINCCE_SUCCESS, CREATE_ORGANIZATION_STAGE_FAIL, CREATE_ORGANIZATION_STAGE_SUCCESS, GET_LIST_INDUSTRY_FAIL, GET_LIST_INDUSTRY_SUCCESS, GET_LIST_PROVINCE_FAIL, GET_LIST_PROVINCE_SUCCESS, GET_LIST_STAGE_FAIL, GET_LIST_STAGE_SUCCESS } from "../constants/register.const";

const initialState = {
    listProvince: [],
    errors: [],
    listStage: [],
    listIndustry: [],
    gmail: null,
    organization: {},
    organizationProvince: {},
    organizationStage: {},
    organizationIndustry: {}
}
const registerReducre = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_LIST_PROVINCE_SUCCESS:
            return { ...state, listProvince: payload }
        case GET_LIST_PROVINCE_FAIL:
            return { ...state, errors: payload }
        case GET_LIST_INDUSTRY_SUCCESS:
            return { ...state, listIndustry: payload }
        case GET_LIST_INDUSTRY_FAIL:
            return { ...state, errors: payload }
        case GET_LIST_STAGE_SUCCESS:
            return { ...state, listStage: payload }
        case GET_LIST_STAGE_FAIL:
            return { ...state, errors: payload }
        case CREATE_BASIC_INFORMATION_SUCCESS:
            return { ...state, gmail: payload }
        case CREATE_BASIC_INFORMATION_FAIL:
            return { ...state, errors: payload }
        case CREATE_IAT_ORGANIZATION_SUCCESS:
            return { ...state, organization: payload }
        case CREATE_IAT_ORGANIZATION_FAIL:
            return { ...state, errors: payload }
        case CREATE_ORGANIZATION_INDUSTRY_SUCCESS:
            return { ...state, organizationIndustry: payload }
        case CREATE_ORGANIZATION_INDUSTRY_FAIL:
            return { ...state, errors: payload }
        case CREATE_ORGANIZATION_PROVINCCE_SUCCESS:
            return { ...state, organizationProvince: payload }
        case CREATE_ORGANIZATION_PROVINCCE_FAIL:
            return { ...state, errors: payload }
        case CREATE_ORGANIZATION_STAGE_SUCCESS:
            return { ...state, organizationStage: payload }
        case CREATE_ORGANIZATION_STAGE_FAIL:
            return { ...state, errors: payload }
        default:
            return state;
    }
}
export default registerReducre;
