import axios from 'axios';
import {
    GET_SALARY_DATA_SUCCESS,
    GET_SALARY_DATA_FAILURE,
    DELETE_SALARY_DATA_SUCCESS,
    DELETE_SALARY_DATA_FAILURE
} from './SalaryDataActionTypes';

const API_URL = 'http://localhost:5000';

export const getSalaryData = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/employee_salary_data`);
            dispatch({
                type: GET_SALARY_DATA_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: GET_SALARY_DATA_FAILURE,
                payload: error.message
            });
        }
    };
};

export const deleteSalaryData = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${API_URL}/employee_salary_data/id/${id}`);
            dispatch({
                type: DELETE_SALARY_DATA_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: DELETE_SALARY_DATA_FAILURE,
                payload: error.message
            });
        }
    };
};
