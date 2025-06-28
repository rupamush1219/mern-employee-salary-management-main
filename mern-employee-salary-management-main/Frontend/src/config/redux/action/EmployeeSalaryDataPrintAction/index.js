import axios from "axios";
import {
    GET_SALARY_DATA_SINGLE_SALARY_SUCCESS,
    GET_SALARY_DATA_SINGLE_SALARY_FAILURE,
} from "./EmployeeSalaryDataPrintActionTypes";

export const viewSingleEmployeeSalaryDataSuccess = (data) => ({
    type: GET_SALARY_DATA_SINGLE_SALARY_SUCCESS,
    payload: data,
});

export const viewSingleEmployeeSalaryDataFailure = (error) => ({
    type: GET_SALARY_DATA_SINGLE_SALARY_FAILURE,
    payload: error,
});

export const viewSalarySingleEmployByYear = (dataYear) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/salary_data/month/${dataYear}`
        );
        const data = response.data;
        dispatch(viewSingleEmployeeSalaryDataSuccess(data));
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(viewSingleEmployeeSalaryDataFailure("Error while loading data."));
        }
    }
};

export const viewSalarySingleEmployByMonth = (dataMonth) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/salary_data/month/${dataMonth}`
        );
        const data = response.data;
        dispatch(viewSingleEmployeeSalaryDataSuccess(data));
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(viewSingleEmployeeSalaryDataFailure("Error while loading data."));
        }
    }
};

export const viewSalarySingleEmployByName = (employee_name) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/salary_data/name/${employee_name}`
        );
        const data = response.data;
        dispatch(viewSingleEmployeeSalaryDataSuccess(data));
    } catch (error) {
        console.log(error);
        if (employee_name) {
            dispatch(viewSingleEmployeeSalaryDataFailure("Error while loading data."));
        }
    }
};
