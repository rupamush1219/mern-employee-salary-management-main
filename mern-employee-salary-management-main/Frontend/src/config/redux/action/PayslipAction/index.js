import axios from "axios";

export const FETCH_SALARY_SLIP_SUCCESS = "FETCH_SALARY_SLIP_SUCCESS";
export const FETCH_SALARY_SLIP_FAILURE = "FETCH_SALARY_SLIP_FAILURE";
export const CLEAR_SALARY_SLIP = "CLEAR_SALARY_SLIP";

export const fetchSalarySlipSuccess = (data) => ({
    type: FETCH_SALARY_SLIP_SUCCESS,
    payload: data,
});

export const fetchSalarySlipFailure = (error) => ({
    type: FETCH_SALARY_SLIP_FAILURE,
    payload: error,
});

export const clearSalarySlip = () => ({
    type: CLEAR_SALARY_SLIP,
});

export const fetchSalarySlipByYear = (selectedYear, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/Report/salary_slip/year/${selectedYear}`
        );
        const data = response.data;
        dispatch(fetchSalarySlipSuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchSalarySlipFailure("Error while loading data."));
        }
    }
};

export const fetchSalarySlipByMonth = (selectedMonth, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/Report/salary_slip/month/${selectedMonth}`
        );
        const data = response.data;
        dispatch(fetchSalarySlipSuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchSalarySlipFailure("Error while loading data."));
        }
    }
};

export const fetchSalarySlipByName = (selectedName, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/Report/salary_slip/name/${selectedName}`
        );
        const data = response.data;
        dispatch(fetchSalarySlipSuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchSalarySlipFailure("Error while loading data."));
        }
    }
};
