import { GET_LIST_INDUSTRY_FAIL, GET_LIST_INDUSTRY_SUCCESS, GET_LIST_PROVINCE_FAIL, GET_LIST_PROVINCE_SUCCESS, GET_LIST_STAGE_FAIL, GET_LIST_STAGE_SUCCESS } from "../constants/register.const";

const initialState = {
    listProvince: [],
    errors: [],
    listStage: [],
    listIndustry: []
}
const registerReducre = (state = initialState, action) => {
    const { type, payload } = action;
    console.log(action);
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
        default:
            return state;
    }
}
export default registerReducre;