import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/authReducer';  // Authentication Reducer
import EmployeeSalaryPrintDataReducer from './reducer/EmployeeSalaryDataPrintReducer';  // Employee Salary Print Data Reducer
import EmployeeDataReducer from './reducer/EmployeeDataReducer';  // Employee Data Reducer
import PositionDataReducer from './reducer/PositionDataReducer';  // Position Data Reducer
import AttendanceDataReducer from './reducer/AttendanceDataReducer';  // Attendance Data Reducer
import DeductionDataReducer from './reducer/DeductionDataReducer';  // Deduction Data Reducer
import SalaryDataReducer from './reducer/SalaryDataReducer';  // Salary Data Reducer
import attendanceReportReducer from './reducer/AttendanceReportReducer';  // Attendance Report Reducer
import SalaryReportReducer from './reducer/SalaryReportReducer';  // Salary Report Reducer
import PayslipReducer from './reducer/PayslipReducer';  // Payslip Reducer
import ChangePasswordReducer from './reducer/ChangePasswordReducer';  // Change Password Reducer


const store = configureStore({
    reducer: {
        auth: authReducer,
        EmployeeSalaryPrintData: EmployeeSalaryPrintDataReducer,
        EmployeeData: EmployeeDataReducer,
        PositionData: PositionDataReducer,
        AttendanceData: AttendanceDataReducer,
        DeductionData: DeductionDataReducer,
        SalaryData: SalaryDataReducer,
        ReportAttendance: attendanceReportReducer,
        SalaryReport: SalaryReportReducer,
        Salaryslip: PayslipReducer,
        ChangePassword: ChangePasswordReducer,
        
    },
});

export default store;
