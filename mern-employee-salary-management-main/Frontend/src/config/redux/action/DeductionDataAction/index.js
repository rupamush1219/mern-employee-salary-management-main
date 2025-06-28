import axios from 'axios';
import {
    GET_DATA_DEDUCTION_SUCCESS,
    GET_DATA_DEDUCTION_FAILURE,
    CREATE_DATA_DEDUCTION_SUCCESS,
    CREATE_DATA_DEDUCTION_FAILURE,
    UPDATE_DATA_DEDUCTION_SUCCESS,
    UPDATE_DATA_DEDUCTION_FAILURE,
    DELETE_DATA_DEDUCTION_SUCCESS,
    DELETE_DATA_DEDUCTION_FAILURE
} from './DeductionDataActionTypes';

const API_URL = 'http://localhost:5000';

export const getDeductionData = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/data_deduction`);
            dispatch({
                type: GET_DATA_DEDUCTION_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: GET_DATA_DEDUCTION_FAILURE,
                payload: error.message
            });
        }
    };
};

export const createDeductionData = (formData, navigate) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_URL}/data_deduction`, formData, {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            });
            dispatch({
                type: CREATE_DATA_DEDUCTION_SUCCESS,
                payload: response.data
            });
            navigate("/data-deduction");
            return response.data;
        } catch (error) {
            dispatch({
                type: CREATE_DATA_DEDUCTION_FAILURE,
                payload: error.message
            });
            throw error;
        }
    };
};

export const updateDeductionData = (id, data) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`${API_URL}/data_deduction/${id}`, data);
            dispatch({
                type: UPDATE_DATA_DEDUCTION_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: UPDATE_DATA_DEDUCTION_FAILURE,
                payload: error.message
            });
        }
    };
};

export const deleteDeductionData = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${API_URL}/data_deduction/${id}`);
            dispatch({
                type: DELETE_DATA_DEDUCTION_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: DELETE_DATA_DEDUCTION_FAILURE,
                payload: error.message
            });
        }
    };
};
