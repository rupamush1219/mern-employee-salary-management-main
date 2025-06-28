import {
    FETCH_SALARY_SLIP_SUCCESS,
    FETCH_SALARY_SLIP_FAILURE,
    CLEAR_SALARY_SLIP,
} from "../../action/PayslipAction";

const initialState = {
    dataSalarySlip: [],
    error: null,
};

const SalaryslipReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SALARY_SLIP_SUCCESS:
            return {
                ...state,
                dataSalarySlip: action.payload,
                error: null,
            };
        case FETCH_SALARY_SLIP_FAILURE:
            return {
                ...state,
                dataSalarySlip: [],
                error: action.payload,
            };
        case CLEAR_SALARY_SLIP:
            return {
                ...state,
                dataSalarySlip: [],
                error: null,
            };
        default:
            return state;
    }
};

export default SalaryslipReducer;
