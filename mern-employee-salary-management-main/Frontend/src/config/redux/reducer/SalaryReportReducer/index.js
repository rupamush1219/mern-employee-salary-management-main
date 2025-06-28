import {
    FETCH_Report_SALARY_SUCCESS,
    FETCH_Report_SALARY_FAILURE,
    CLEAR_Report_SALARY,
} from "../../action/SalaryReportAction";

const initialState = {
    dataSalaryReport: [],
    error: null,
};

const SalaryReportReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_Report_SALARY_SUCCESS:
            return {
                ...state,
                dataSalaryReport: action.payload,
                error: null,
            };
        case FETCH_Report_SALARY_FAILURE:
            return {
                ...state,
                dataSalaryReport: [],
                error: action.payload,
            };
        case CLEAR_Report_SALARY:
            return {
                ...state,
                dataSalaryReport: [],
                error: null,
            };
        default:
            return state;
    }
};

export default SalaryReportReducer;
