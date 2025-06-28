import axios from 'axios';
import {
    GET_attendance_data_SUCCESS,
    GET_attendance_data_FAILURE,
    CREATE_attendance_data_SUCCESS,
    CREATE_attendance_data_FAILURE,
    UPDATE_attendance_data_SUCCESS,
    UPDATE_attendance_data_FAILURE,
    DELETE_attendance_data_SUCCESS,
    DELETE_attendance_data_FAILURE
} from './AttendanceDataActionTypes';

export const getAttendanceData = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:5000/attendance_data');
            const AttendanceData = response.data;
            dispatch({
                type: GET_attendance_data_SUCCESS,
                payload: AttendanceData
            });
        } catch (error) {
            dispatch({
                type: GET_attendance_data_FAILURE,
                payload: error.message
            });
        }
    };
};

export const createAttendanceData = (EmployeeData, AttendanceData, navigate) => async (dispatch) => {
    try {
        for (let i = 0; i < EmployeeData.length; i++) {
            const isnameAda = AttendanceData.some(
                (Attendance) => Attendance.employee_name === EmployeeData[i].employee_name
            );

            if (!isnameAda) {
                const response = await axios.post("http://localhost:5000/attendance_data", {
                    nik: EmployeeData[i].nik,
                    employee_name: EmployeeData[i].employee_name,
                    position_name: EmployeeData[i].position,
                    gender: EmployeeData[i].gender,
                    present: present[i] || 0,
                    sickdays: sickdays[i] || 0,
                    absences: absences[i] || 0,
                });

                dispatch({
                    type: CREATE_attendance_data_SUCCESS,
                    payload: response.data,
                });

                navigate("/data-Attendance");
                return response.data;
            }
        }
    } catch (error) {
        dispatch({
            type: CREATE_attendance_data_FAILURE,
            payload: error.message,
        });
        throw error;
    }
};

export const updateAttendanceData = (id, AttendanceData) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`http://localhost:5000/attendance_data/${id}`, AttendanceData);
            if (response.status === 200) {
                dispatch({
                    type: UPDATE_attendance_data_SUCCESS,
                    payload: 'Attendance Data Succeed diupdate'
                });
                dispatch(getAttendanceData());
            } else {
                dispatch({
                    type: UPDATE_attendance_data_FAILURE,
                    payload: response.data.message
                });
            }
        } catch (error) {
            dispatch({
                type: UPDATE_attendance_data_FAILURE,
                payload: error.message
            });
        }
    };
};

export const deleteAttendanceData = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`http://localhost:5000/attendance_data/${id}`);
            if (response.status === 200) {
                dispatch({
                    type: DELETE_attendance_data_SUCCESS,
                    payload: 'Delete data Succeed'
                });
                dispatch(getAttendanceData());
            } else {
                dispatch({
                    type: DELETE_attendance_data_FAILURE,
                    payload: response.data.message
                });
            }
        } catch (error) {
            dispatch({
                type: DELETE_attendance_data_FAILURE,
                payload: error.message
            });
        }
    };
};
