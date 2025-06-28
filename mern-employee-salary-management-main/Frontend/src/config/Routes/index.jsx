import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../../components/molecules/NotFound'
import Home from '../../pages/Home';
import About from '../../pages/About';
import Contact from '../../pages/Contact';
import Login from '../../pages/Login';
import Dashboard from '../../pages/Dashboard';
import {
  FormAddPositionData, 
  FormEditPositionData, 
  FormAddAttendanceData, 
  FormEditAttendanceData, 
  FormAddEmployeeData, 
  FormEditEmployeeData, 
  FormAddDeductionData, 
  FormEditDeductionData, 
  PrintPdfSalaryReport, 
  SalaryDataDetail, 
  PrintPdfPayslip, 
  PrintPdfAttendanceReport, 
  PrintPdfEmployeeSalaryData
  
} from '../../components';
import {
  EmployeeData, 
  PositionData, 
  AttendanceData, 
  SalaryData, 
  SalaryReport, 
  AttendanceReport, 
  Payslip, 
  ChangeAdminPassword, 
  EmployeeSalaryData, 
  ChangeEmployeePassword, 
  DeductionData
  
} from '../../pages'

const AppRoutes = () => {
  return (

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />

      {/* Route Admin */}
      {/* Master Data Admin */}
      <Route
    path='/data-employ'
    element={<EmployeeData />}
/>
<Route
    path='/data-employ/form-data-employ/add'
    element={<FormAddEmployeeData />}
/>
<Route
    path='/data-employ/form-data-employ/edit/:id'
    element={<FormEditEmployeeData />}
/>
<Route
    path='/data-position'
    element={<PositionData />}
/>
<Route
    path='/data-position/form-data-position/add'
    element={<FormAddPositionData />}
/>
<Route
    path='/data-position/form-data-position/edit/:id'
    element={<FormEditPositionData />}/>

{/* Transaction Admin */}
<Route
    path='/data-Attendance'
    element={<AttendanceData />}
/>
<Route
    path='/data-Attendance/form-data-Attendance/add'
    element={<FormAddAttendanceData />}
/>
<Route
    path='/data-Attendance/form-data-Attendance/edit/:id'
    element={<FormEditAttendanceData />}/>

<Route
    path='/data-deduction'
    element={<DeductionData />}
/>
<Route
    path='/data-deduction/form-data-deduction/add'
    element={<FormAddDeductionData />}/>
<Route
    path='/data-deduction/form-data-deduction/edit/:id'
    element={<FormEditDeductionData />}/>

<Route
    path='/data-salary'
    element={<SalaryData />}
/>
<Route
    path='/data-salary/detail-data-salary/name/:name'
    element={<SalaryDataDetail />}/>
<Route
    path='/data-salary/Print-salary/slip-salary/name/:name'
    element={<PrintPdfPayslip />}/>

{/* Report Admin */}
<Route
    path='/Report/salary'
    element={<SalaryReport />}
/>
<Route
    path='/Report/salary/print-page'
    element={<PrintPdfSalaryReport />}/>
<Route
    path='/Report/attendance'
    element={<AttendanceReport />}/>
<Route
    path='/Report/attendance/print-page'
    element={<PrintPdfAttendanceReport />}/>
<Route
    path='/Report/slip-salary'
    element={<Payslip />}/>
<Route
    path='/Report/slip-salary/print-page'
    element={<PrintPdfPayslip />}/>

{/* Settings Admin */}
<Route
    path='/Change-Password'
    element={<ChangeAdminPassword />}/>

{/* Route Employ */}
{/* Dashboard Data Salary Employ */}
<Route
    path='/data-salary-employ'
    element={<EmployeeSalaryData />}/>
<Route
    path='/data-salary-employ/print-page'
    element={<PrintPdfEmployeeSalaryData />}/>

<Route
    path='/Change-Password-employ'
    element={<ChangeEmployeePassword />}/>

{/* Route Not Found 404 */}
<Route
    path="*"
    element={<NotFound />}/>

</Routes>
)
}

export default AppRoutes;
