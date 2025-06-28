import {
    getSalaryDataEmploy,
    getAttendanceData,
    viewSalaryDataEmployByYear
} from "./TransactionController.js"

// method untuk melihat Employee Salary Report
export const viewSalaryReportEmploy = async(req, res) => {
    try {
        const SalaryReportEmploy = await getSalaryDataEmploy(req, res);
        res.status(200).json(SalaryReportEmploy);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// method untuk melihat Employee Salary Report berdasarkan Month
export const viewSalaryReportEmployByMonth = async (req, res) => {
    try {
        const { month } = req.params;
        const dataSalaryReportByMonth = await getSalaryDataEmploy(req, res);

        const filteredData = dataSalaryReportByMonth.filter((data) => {
            return data.Month.toLowerCase() === month.toLowerCase();
        });

        if (filteredData.length === 0) {
            res.status(404).json({ msg: 'Data not found' });
        } else {
            const formattedData = filteredData.map((data) => {
                return {
                    Month: data.Month,
                    employee_name: data.employee_name,
                    position: data.position_employ,
                    basic_salary: data.basic_salary,
                    transport_allowance: data.transport_allowance,
                    meal_allowance: data.meal_allowance,
                    deduction: data.deduction,
                    total_salary: data.total
                };
            });
            res.json(formattedData);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};





// method untuk melihat Employee Salary Report berdasarkan Year
export const viewSalaryReportEmployByYear = async (req, res) => {
    try {
         await viewSalaryDataEmployByYear(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// method untuk melihat Employee Salary Report berdasarkan name
export const viewSalaryReportEmployByName = async (req, res) => {
    try {
        const SalaryDataEmploy = await getSalaryDataEmploy(req, res);
        const name = req.params.name.toLowerCase();

        const foundData = SalaryDataEmploy.filter((data) => {
          const formattedName = data.employee_name.toLowerCase();
          const searchKeywords = name.split(" ");

          return searchKeywords.every((keyword) => formattedName.includes(keyword));
        });

        if (foundData.length === 0) {
          res.status(404).json({ msg: "Data not found" });
        } else {
          res.json(foundData);
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
      }
  };

// method untuk melihat Employee Attendance Report berdasarkan Month (menggunakan DROP DOWN)
export const viewReportAttendanceEmployByMonth = async (req, res) => {
    try {
        const dataAttendanceByMonth = await getAttendanceData();
        const { month } = req.params;

        const dataAttendance = dataAttendanceByMonth.filter((attendance) => attendance.Month.toLowerCase() === month.toLowerCase()).map((attendance) => {
            return {
                Year: attendance.year,
                Month: attendance.Month,
                nik: attendance.nik,
                employee_name: attendance.employee_name,
                position_employ: attendance.position_employ,
                present: attendance.present,
                sickdays: attendance.sickdays,
                absences: attendance.absences
            };
        });

        if (dataAttendance.length === 0) {
            res.status(404).json({ msg: 'Data not found' });
        } else {
            res.json(dataAttendance);
        }
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};


// method untuk melihat Employee Attendance Report berdasarkan Year
export const viewReportAttendanceEmployByYear = async (req, res) => {
    try {
        const dataAttendanceByYear = await getAttendanceData();
        const { year } = req.params;

        const dataAttendance = dataAttendanceByYear.filter((attendance) => attendance.Year.toString() === year.toString()).map((attendance) => {
            return {
                Year: attendance.Year,
                Month: attendance.Month,
                nik: attendance.nik,
                employee_name: attendance.employee_name,
                position_employ: attendance.position_employ,
                present: attendance.present,
                sickdays: attendance.sickdays,
                absences: attendance.absences
            };
        });

        if (dataAttendance.length === 0) {
            res.status(404).json({ msg: 'Data not found' });
        } else {
            res.json(dataAttendance);
        }
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};



// method untuk melihat Employee Salary Slip By Name
export const viewSalarySlipByName = async (req, res) => {
    try {
        const SalaryDataEmploy = await getSalaryDataEmploy(req, res);
        const name = req.params.name.toLowerCase();

        const foundData = SalaryDataEmploy.filter((data) => {
          const formattedName = data.employee_name.toLowerCase();
          const searchKeywords = name.split(" ");

          return searchKeywords.every((keyword) => formattedName.includes(keyword));
        });

        if (foundData.length === 0) {
          res.status(404).json({ msg: "Data not found" });
        } else {
          res.json(foundData);
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
      }
}

// method untuk melihat Employee Salary Slip By Month
export const viewSalarySlipByMonth = async (req, res) => {
    try {
        const { month } = req.params;
        const dataSalaryReportByMonth = await getSalaryDataEmploy(req, res);

        const filteredData = dataSalaryReportByMonth.filter((data) => {
            return data.Month.toLowerCase() === month.toLowerCase();
        });

        if (filteredData.length === 0) {
            res.status(404).json({ msg: `Data dengan Month ${month} tidak ditemukan ` });
        } else {
            const formattedData = filteredData.map((data) => {
                return {
                    Month: data.Month,
                    Year: data.Year,
                    employee_name: data.employee_name,
                    position: data.position,
                    basic_salary: data.basic_salary,
                    transport_allowance: data.transport_allowance,
                    meal_allowance: data.meal_allowance,
                    deduction: data.deduction,
                    total_salary: data.total
                };
            });
            res.json(formattedData);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// method untuk melihat Employee Salary Slip By Year
export const viewSalarySlipByYear = async (req, res) => {
    try {
        await viewSalaryDataEmployByYear(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}