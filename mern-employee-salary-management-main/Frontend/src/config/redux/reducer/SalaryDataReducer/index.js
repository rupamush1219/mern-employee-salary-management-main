import {
    GET_SALARY_DATA_SUCCESS,
    GET_SALARY_DATA_FAILURE,
    DELETE_SALARY_DATA_SUCCESS,
    DELETE_SALARY_DATA_FAILURE
} from '../../action/SalaryDataAction/SalaryDataActionTypes';

const initialState = {
    SalaryData: [],
    message: null,
    error: null
};

const SalaryDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SALARY_DATA_SUCCESS:
            return {
                ...state,
                SalaryData: action.payload,
                message: null,
                error: null,
            };
        case GET_SALARY_DATA_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: '',
            };
        case DELETE_SALARY_DATA_SUCCESS:
            return {
                ...state,
                message: action.payload,
                error: null,
            };
        case DELETE_SALARY_DATA_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: null,
            };
        default:
            return state;
    }
};

export default SalaryDataReducer;
