import axios from "axios";

export const FETCH_Report_SALARY_SUCCESS = "FETCH_Report_SALARY_SUCCESS";
export const FETCH_Report_SALARY_FAILURE = "FETCH_Report_SALARY_FAILURE";
export const CLEAR_Report_SALARY = "CLEAR_Report_SALARY";

export const fetchSalaryReportSuccess = (data) => ({
    type: FETCH_Report_SALARY_SUCCESS,
    payload: data,
});

export const fetchSalaryReportFailure = (error) => ({
    type: FETCH_Report_SALARY_FAILURE,
    payload: error,
});

export const clearSalaryReport = () => ({
    type: CLEAR_Report_SALARY,
});

export const fetchSalaryReportByYear = (selectedYear, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/Report/salary/year/${selectedYear}`
        );
        const data = response.data;
        dispatch(fetchSalaryReportSuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchSalaryReportFailure("Error while loading data."));
        }
    }
};

export const fetchSalaryReportByMonth = (selectedMonth, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/Report/salary/month/${selectedMonth}`
        );
        const data = response.data;
        dispatch(fetchSalaryReportSuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchSalaryReportFailure("Error while loading data."));
        }
    }
};
