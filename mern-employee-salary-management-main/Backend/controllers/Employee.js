import EmployeeData from "../models/EmployeeDataModel.js";
import AttendanceData from "../models/AttendanceDataModel.js";
import { getSalaryDataEmploy } from "./TransactionController.js";
import { verifyUser } from "../middleware/AuthUser.js";

// method untuk dashboard employ
export const dashboardEmploy = async (req, res) => {
    await verifyUser(req, res, () => {});

    const userId = req.userId;

    const response = await EmployeeData.findOne({
      where:{
        id: userId
      },
      attributes: [
        'id', 'nik', 'employee_name',
        'gender', 'position', 'joining_date',
        'status', 'photo', 'access_rights'
      ]
    });

    res.status(200).json(response);
  };

// method untuk view salary single employ by month
export const viewSalaryDataSingleEmployByMonth = async (req, res) => {
  await verifyUser(req, res, () => {});

  const userId = req.userId;
  const user = await EmployeeData.findOne({
    where:{
      id: userId
    }
  });

  try {
      const SalaryDataEmploy = await getSalaryDataEmploy();

      const response = await AttendanceData.findOne({
          attributes: [
              'Month'
          ],
          where: {
              Month: req.params.month
          }
      });

      if (response) {
        const SalaryDataByMonth = SalaryDataEmploy.filter((salary_data) => {
          return salary_data.id === user.id && salary_data.Month === response.Month;
        }).map((salary_data) => {
          return {
            Month: response.Month,
            Year: salary_data.Year,
            nik: user.nik,
            employee_name: user.employee_name,
            gender: user.gender,
            position: user.position,
            basic_salary: salary_data.basic_salary,
            transport_allowance: salary_data.transport_allowance,
            meal_allowance: salary_data.meal_allowance,
            deduction: salary_data.deduction,
            total_salary: salary_data.total,
          };
        });
          return res.json(SalaryDataByMonth);
      }

      res.status(404).json({ msg: `Data Salary Untuk Month ${req.params.month} Tidak di Temukan Pada Employ ${user.employee_name}` });
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

// method untuk view salary single employ by year
export const viewSalaryDataSingleEmployByYear = async (req, res) => {
  await verifyUser(req, res, () => {});

  const userId = req.userId;
  const user = await EmployeeData.findOne({
    where:{
      id: userId
    }
  });

  try {
    const SalaryDataEmploy = await getSalaryDataEmploy();
    const { year } = req.params;

    const SalaryDataByYear = SalaryDataEmploy.filter((salary_data) => {
        return salary_data.id === user.id && salary_data.Year === parseInt(year);
    }).map((salary_data) => {
        return {
            Year: salary_data.Year,
            Month: salary_data.Month,
            nik: user.nik,
            employee_name: user.employee_name,
            gender: user.gender,
            position: user.position,
            basic_salary: salary_data.basic_salary,
            transport_allowance: salary_data.transport_allowance,
            meal_allowance: salary_data.meal_allowance,
            deduction: salary_data.deduction,
            total_salary: salary_data.total,
        };
    });

    if (SalaryDataByYear.length === 0) {
        return res.status(404).json({ msg: `Data Year ${year} Tidak di Temukan` });
    }
    res.json(SalaryDataByYear)
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

// data yang ditampilkan ( Month / Year, Basic Salary, transport_allowance, Meal allowance, Deduction, Total Salary  )