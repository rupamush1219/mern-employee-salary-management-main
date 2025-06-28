import {
    FETCH_Report_ATTENDANCE_SUCCESS,
    FETCH_Report_ATTENDANCE_FAILURE,
    CLEAR_Report_ATTENDANCE,
} from "../../action/AttendanceReportAction";

const initialState = {
    dataReportAttendance: [],
    error: null,
};

const ReportAttendanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_Report_ATTENDANCE_SUCCESS:
            return {
                ...state,
                dataReportAttendance: action.payload,
                error: null,
            };
        case FETCH_Report_ATTENDANCE_FAILURE:
            return {
                ...state,
                dataReportAttendance: [],
                error: action.payload,
            };
        case CLEAR_Report_ATTENDANCE:
            return {
                ...state,
                dataReportAttendance: [],
                error: null,
            };
        default:
            return state;
    }
};

export default ReportAttendanceReducer;
