import axios from "axios";

export const FETCH_Report_ATTENDANCE_SUCCESS = "FETCH_Report_ATTENDANCE_SUCCESS";
export const FETCH_Report_ATTENDANCE_FAILURE = "FETCH_Report_ATTENDANCE_FAILURE";
export const CLEAR_Report_ATTENDANCE = "CLEAR_Report_ATTENDANCE";

export const fetchReportAttendanceSuccess = (data) => ({
    type: FETCH_Report_ATTENDANCE_SUCCESS,
    payload: data,
});

export const fetchReportAttendanceFailure = (error) => ({
    type: FETCH_Report_ATTENDANCE_FAILURE,
    payload: error,
});

export const clearReportAttendance = () => ({
    type: CLEAR_Report_ATTENDANCE,
});

export const fetchReportAttendanceByYear = (selectedYear, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/Report/attendance/year/${selectedYear}`
        );
        const data = response.data;
        dispatch(fetchReportAttendanceSuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchReportAttendanceFailure("Error while loading data."));
        }
    }
};

export const fetchReportAttendanceByMonth = (selectedMonth, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/Report/attendance/month/${selectedMonth}`
        );
        const data = response.data;
        dispatch(fetchReportAttendanceSuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchReportAttendanceFailure("Error while loading data."));
        }
    }
};
