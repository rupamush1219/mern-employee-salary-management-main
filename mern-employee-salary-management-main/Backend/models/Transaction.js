import EmployeeData from './EmployeeDataModel.js';
import PositionData from './PositionDataModel.js';
import AttendanceData from './AttendanceDataModel.js';

// Method to get Employee Data
async function getEmployeeData() {
    try {
        const employees = await EmployeeData.findAll();
        const EmployeeDataMap = new Map();

        // Create a map of employee name to their nik and position
        employees.forEach(employ => {
            const { nik, employee_name, position } = employ;
            EmployeeDataMap.set(employee_name, { nik, position });
        });

        const resultEmployeeData = [];
        EmployeeDataMap.forEach(({ nik, position }, employee_name) => {
            resultEmployeeData.push({ nik, employee_name, position });
        });

        const data_employee_name = resultEmployeeData.map(employ => employ.employee_name);
        const data_nik = resultEmployeeData.map(employ => employ.nik);
        const position_data = resultEmployeeData.map(employ => employ.position);

        return { data_employee_name, data_nik, position_data };
    } catch (error) {
        console.log(error);
        return { data_employee_name: [], data_nik: [], position_data: [] }; // Returning empty arrays in case of error
    }
}

// Method to get Attendance Data
async function getAttendanceData() {
    try {
        const attendanceData = await AttendanceData.findAll();
        const AttendanceDataMap = new Map();

        // Fetch employee data only once and reuse it
        const { data_employee_name, data_nik } = await getEmployeeData();

        // Map attendance data with employee names and other details
        attendanceData.forEach(attendance => {
            const { nik, Month, gender, position_name, present, sickdays, absences } = attendance;
            const employee_name = data_employee_name.find(name => name === attendance.employee_name) || "-";
            const nik_employ = data_nik.find(nik => nik === attendance.nik) || "-";
            AttendanceDataMap.set(nik_employ, { employee_name, Month, gender, position_name, present, sickdays, absences });
        });

        const resultAttendanceData = [];
        AttendanceDataMap.forEach(({ nik, Month, gender, position_name, present, sickdays, absences }, nikEmploy) => {
            const employee_name = data_employee_name.find(name => name === AttendanceDataMap.get(nikEmploy).employee_name) || "-";
            resultAttendanceData.push({ employee_name, nik, Month, gender, position_name, present, sickdays, absences });
        });

        console.log(resultAttendanceData);
    } catch (error) {
        console.log(error);
    }
}

// Method to get Position Data
async function getPositionData() {
    try {
        const positionData = await PositionData.findAll();
        const PositionDataMap = new Map();

        positionData.forEach(position => {
            const { position_name, basic_salary, transport_allowance, meal_allowance } = position;
            PositionDataMap.set(position_name, { basic_salary, transport_allowance, meal_allowance });
        });

        const resultPositionData = [];
        PositionDataMap.forEach(({ basic_salary, transport_allowance, meal_allowance }, position_name) => {
            resultPositionData.push({ position_name, basic_salary, transport_allowance, meal_allowance });
        });

        return resultPositionData;
    } catch (error) {
        console.log(error);
        return []; // Return empty array in case of error
    }
}

// Call the function to get attendance data
getAttendanceData();
