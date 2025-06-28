import {
    GET_SALARY_DATA_SINGLE_SALARY_SUCCESS,
    GET_SALARY_DATA_SINGLE_SALARY_FAILURE,
} from "../../action/EmployeeSalaryDataPrintAction/EmployeeSalaryDataPrintActionTypes";

const initialState = {
    employeeSalaryDataPrint: [], 
    error: null,
  };
  

const employeeSalaryDataPrintReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SALARY_DATA_SINGLE_SALARY_SUCCESS:
            return {
                ...state,
                employeeSalaryDataPrint: action.payload,
                error: null,
            };
        case GET_SALARY_DATA_SINGLE_SALARY_FAILURE:
            return {
                ...state,
                employeeSalaryDataPrint: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default employeeSalaryDataPrintReducer;
