import express from 'express';

/* === import Middleware === */
import { adminOnly, verifyUser } from '../middleware/AuthUser.js';

/* === import Controllers === */
import {
    getEmployeeData,
    getEmployeeDataByID,
    createEmployeeData,
    updateEmployeeData,
    deleteEmployeeData,
    getEmployeeDataByNik,
    getEmployeeDataByName,
} from '../controllers/Employee Data.js';

import {
    getPositionData,
    createPositionData,
    updatePositionData,
    deletePositionData,
    getPositionDataByID
} from "../controllers/Position Data.js";

import {
    viewAttendanceData,
    createAttendanceData,
    updateAttendanceData,
    deleteAttendanceData,
    viewAttendanceDataByID,
    viewSalaryDataByName,
} from "../controllers/TransactionController.js";

import {
    createDeductionSalaryData,
    deleteDeductionData,
    viewDeductionDataByID,
    updateDeductionData,
    viewDeductionData
} from "../controllers/TransactionController.js";

import {
    viewSalaryDataEmploy,
    viewSalaryDataEmployByMonth,
    viewSalaryDataEmployByYear
} from "../controllers/TransactionController.js";

import {
    viewReportAttendanceEmployByMonth,
    viewReportAttendanceEmployByYear,
    viewSalaryReportEmploy,
    viewSalaryReportEmployByMonth,
    viewSalaryReportEmployByName,
    viewSalaryReportEmployByYear,
    viewSalarySlipByMonth,
    viewSalarySlipByName,
    viewSalarySlipByYear,
} from "../controllers/ReportController.js";

import { LogOut, changePassword } from '../controllers/Auth.js';
import {
    dashboardEmploy,
    viewSalaryDataSingleEmployByMonth,
    viewSalaryDataSingleEmployByYear
} from '../controllers/Employee.js';

const router = express.Router();

// Admin Route :

/* ==== Master Data ==== */
// Employee Data
router.get('/employee_data', verifyUser, adminOnly, getEmployeeData);
router.get('/employee_data/id/:id', verifyUser, adminOnly, getEmployeeDataByID);
router.get('/employee_data/nik/:nik', verifyUser, adminOnly, getEmployeeDataByNik);
router.get('/employee_data/name/:name', verifyUser, getEmployeeDataByName);
router.post('/employee_data',verifyUser, adminOnly, createEmployeeData);
router.patch('/employee_data/:id', verifyUser, adminOnly, updateEmployeeData);
router.delete('/employee_data/:id', verifyUser, adminOnly, deleteEmployeeData);
router.patch('/employee_data/:id/change_password', verifyUser, adminOnly, changePassword);
// Position Data
router.get('/position_data', verifyUser, adminOnly, getPositionData);
router.get('/position_data/:id', verifyUser, adminOnly, getPositionDataByID);
router.post('/position_data', verifyUser, adminOnly, createPositionData);
router.patch('/position_data/:id', verifyUser, adminOnly, updatePositionData);
router.delete('/position_data/:id', verifyUser, adminOnly, deletePositionData);

/* ==== Transaction  ==== */
// Attendance Data
router.get('/attendance_data', verifyUser, adminOnly, viewAttendanceData);
router.get('/attendance_data/:id', verifyUser, adminOnly, viewAttendanceDataByID);
router.post('/attendance_data',verifyUser, adminOnly, createAttendanceData);
router.patch('/attendance_data/update/:id',verifyUser, adminOnly, updateAttendanceData);
router.delete('/attendance_data/:id', verifyUser, adminOnly, deleteAttendanceData);
// Data Deduction
router.get('/data_deduction', adminOnly, verifyUser, viewDeductionData);
router.get('/data_deduction/:id', adminOnly, verifyUser, viewDeductionDataByID);
router.post('/data_deduction', adminOnly, verifyUser, createDeductionSalaryData);
router.patch('/data_deduction/update/:id', adminOnly, verifyUser, updateDeductionData);
router.delete('/data_deduction/:id', adminOnly, verifyUser, deleteDeductionData);
// Data Salary
router.get('/employee_salary_data', viewSalaryDataEmploy);
router.get('/salary_data/name/:name', verifyUser, viewSalaryDataByName);
router.get('/employee_salary_data/month/:month', viewSalaryDataEmployByMonth);
router.get('/employee_salary_data/year/:year', viewSalaryDataEmployByYear);

/* ====  Report  ==== */
// Employee Salary Report
router.get('/Report/salary',verifyUser, adminOnly, viewSalaryReportEmploy);
router.get('/Report/salary/name/:name',verifyUser, adminOnly, viewSalaryReportEmployByName);
router.get('/Report/salary/month/:month', verifyUser, adminOnly,viewSalaryReportEmployByMonth);
router.get('/Report/salary/year/:year', verifyUser, adminOnly,viewSalaryReportEmployByYear);
// Employee Attendance Report
router.get('/Report/attendance/month/:month', verifyUser, adminOnly,viewReportAttendanceEmployByMonth);
router.get('/Report/attendance/year/:year', verifyUser, adminOnly,viewReportAttendanceEmployByYear);
// Employee Salary Slip
router.get('/Report/salary_slip/name/:name', verifyUser, adminOnly,viewSalarySlipByName);
router.get('/Report/salary_slip/month/:month',verifyUser, adminOnly, viewSalarySlipByMonth);
router.get('/Report/salary_slip/year/:year',verifyUser, adminOnly, viewSalarySlipByYear);

/* ==== Change Password ==== */
router.patch('/change_password', verifyUser, changePassword);

/* ==== Logout ==== */
router.delete('/logout', LogOut);

// Employ Route :
/* ==== Dashboard ==== */
router.get('/dashboard', verifyUser, dashboardEmploy);
/* ==== Data Salary ==== */
router.get('/salary_data/month/:month', verifyUser, viewSalaryDataSingleEmployByMonth);
router.get('/salary_data/year/:year', verifyUser, viewSalaryDataSingleEmployByYear);
/* ==== Change Password ==== */
router.patch('/change_password', verifyUser, changePassword);
/* ==== Logout ==== */
router.delete('/logout', LogOut);


export default router;