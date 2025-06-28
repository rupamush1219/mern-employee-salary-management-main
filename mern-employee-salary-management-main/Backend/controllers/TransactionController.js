import AttendanceData from "../models/AttendanceDataModel.js";
import EmployeeData from "../models/EmployeeDataModel.js";
import PositionData from "../models/PositionDataModel.js";
import SalaryDeduction from "../models/SalaryDeductionModel.js";
import moment from "moment";
import "moment/locale/id.js";

// method untuk Showing semua Attendance Data
export const viewAttendanceData = async (req, res) => {
  let resultAttendanceData = [];
  try {
    // Get Attendance Data
    const attendance_data = await AttendanceData.findAll({
      attributes: [
        "id",
        "Month",
        "nik",
        "employee_name",
        "gender",
        "position_name",
        "present",
        "sickdays",
        "absences",
        "createdAt",
      ],
      distinct: true,
    });

    resultAttendanceData = attendance_data.map((Attendance) => {
      const id = Attendance.id;
      const createdAt = new Date(Attendance.createdAt);
      const Year = createdAt.getFullYear();
      const Month = Attendance.Month;
      const nik = Attendance.nik;
      const employee_name = Attendance.employee_name;
      const position_employ = Attendance.position_name;
      const gender = Attendance.gender;
      const present = Attendance.present;
      const sickdays = Attendance.sickdays;
      const absences = Attendance.absences;

      return {
        id,
        Month,
        Year,
        nik,
        employee_name,
        position_employ,
        gender,
        present,
        sickdays,
        absences,
      };
    });
    res.json(resultAttendanceData);
  } catch (error) {
    console.log(error);
  }
};

// method untuk Showing Attendance Data by ID
export const viewAttendanceDataByID = async (req, res) => {
  try {
    const AttendanceData = await AttendanceData.findOne({
      attributes: [
        "id",
        "Month",
        "nik",
        "employee_name",
        "gender",
        "position_name",
        "present",
        "sickdays",
        "absences",
        "createdAt",
      ],
      where: {
        id: req.params.id,
      }
    });
    res.json(AttendanceData);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// method untuk menambah Attendance Data
export const createAttendanceData = async (req, res) => {
  const {
    nik,
    employee_name,
    position_name,
    gender,
    present,
    sickdays,
    absences,
  } = req.body;

  try {
    const data_employee_name = await EmployeeData.findOne({
      where: {
        employee_name: employee_name,
      },
    });

    const data_position_name = await PositionData.findOne({
      where: {
        position_name: position_name,
      },
    });

    const data_nik_employ = await EmployeeData.findOne({
      where: {
        nik: nik,
      },
    });

    const name_sudah_ada = await AttendanceData.findOne({
      where: {
        employee_name: employee_name,
      },
    });

    if (!data_employee_name) {
      return res.status(404).json({ msg: "Data name employ tidak ditemukan" });
    }

    if (!data_position_name) {
      return res.status(404).json({ msg: "Data name position tidak ditemukan" });
    }

    if (!data_nik_employ) {
      return res.status(404).json({ msg: "Data nik tidak ditemukan" });
    }

    if (!name_sudah_ada) {
      const month = moment().locale("id").format("MMMM");
      await AttendanceData.create({
        Month: month.toLowerCase(),
        nik: nik,
        employee_name: data_employee_name.employee_name,
        gender: gender,
        position_name: data_position_name.position_name,
        present: present,
        sickdays: sickdays,
        absences: absences,
      });
      res.json({ msg: "Tambah Attendance Data Succeed" });
    } else {
      res.status(400).json({ msg: "Data name sudah ada" });
    }
  } catch (error) {
    console.log(error);
  }
};

// method untuk update Attendance Data
export const updateAttendanceData = async (req, res) => {
  try {
    await AttendanceData.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Attendance Data Succeed diupdate" });
  } catch (error) {
    console.log(error.msg);
  }
};

// method untuk delete Attendance Data
export const deleteAttendanceData = async (req, res) => {
  try {
    await AttendanceData.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Delete data Succeed" });
  } catch (error) {
    console.log(error.msg);
  }
};

// method untuk create data deduction salary
export const createDeductionSalaryData = async (req, res) => {
  const { id, deduction, total_deduction } = req.body;
  try {
    const name_deduction = await SalaryDeduction.findOne({
      where: {
        deduction: deduction,
      },
    });
    if (name_deduction) {
      res.status(400).json({ msg: "Data deduction sudah ada !" });
    } else {
      await SalaryDeduction.create({
        id: id,
        deduction: deduction,
        total_deduction: total_deduction.toLocaleString(),
      });
      res.json({ msg: "Tambah Data Deduction Salary Succeed" });
    }
  } catch (error) {
    console.log(error);
  }
};

// method untuk Showing semua Data Deduction
export const viewDeductionData = async (req, res) => {
  try {
    const DeductionData = await SalaryDeduction.findAll({
      attributes: ["id", "deduction", "total_deduction"],
    });
    res.json(DeductionData);
  } catch (error) {
    console.log(error);
  }
};

// method untuk Showing Data Deduction By ID
export const viewDeductionDataByID = async (req, res) => {
  try {
    const DeductionData = await SalaryDeduction.findOne({
      attributes: ["id", "deduction", "total_deduction"],
      where: {
        id: req.params.id,
      },
    });
    res.json(DeductionData);
  } catch (error) {
    console.log(error);
  }
};

// method untuk update Data Deduction
export const updateDeductionData = async (req, res) => {
  try {
    await SalaryDeduction.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Data Deduction Succeed diupdate" });
  } catch (error) {
    console.log(error.message);
  }
};

// method untuk delete data deduction
export const deleteDeductionData = async (req, res) => {
  try {
    await SalaryDeduction.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Delete data Succeed" });
  } catch (error) {
    console.log(error.message);
  }
};

// method untuk mengambil data salary employ (Employee Data + Position Data + Attendance Data + data deduction)

// method untuk mengambil Employee Data :
export const getEmployeeData = async () => {
  let resultEmployeeData = [];

  try {
    // Get Employee Data:
    const employee_data = await EmployeeData.findAll({
      attributes: ["id", "nik", "employee_name", "gender", "position"],
      distinct: true,
    });

    resultEmployeeData = employee_data.map((employ) => {
      const id = employ.id;
      const nik = employ.nik;
      const employee_name = employ.employee_name;
      const gender = employ.gender;
      const position_employ = employ.position;

      return { id, nik, employee_name, gender, position_employ };
    });
  } catch (error) {
    console.error(error);
  }

  return resultEmployeeData;
};

// method untuk mengambil Position Data :
export const getPositionData = async () => {
  let resultPositionData = [];
  try {
    // get Position Data :
    const position_data = await PositionData.findAll({
      attributes: ["position_name", "basic_salary", "transport_allowance", "meal_allowance"],
      distinct: true,
    });

    resultPositionData = position_data.map((position) => {
      const position_name = position.position_name;
      const basic_salary = position.basic_salary;
      const transport_allowance = position.transport_allowance;
      const meal_allowance = position.meal_allowance;

      return { position_name, basic_salary, transport_allowance, meal_allowance };
    });
  } catch (error) {
    console.error(error);
  }
  return resultPositionData;
};

// method untuk mengambil Attendance Data :
export const getAttendanceData = async () => {
  try {
    // Get Attendance Data
    const attendance_data = await AttendanceData.findAll({
      attributes: [
        "Month",
        "nik",
        "employee_name",
        "gender",
        "position_name",
        "present",
        "sickdays",
        "absences",
        "createdAt",
      ],
      distinct: true,
    });

    const resultAttendanceData = attendance_data.map((Attendance) => {
      const createdAt = new Date(Attendance.createdAt);
      const Year = createdAt.getFullYear();
      const Month = Attendance.Month;
      const nik = Attendance.nik;
      const employee_name = Attendance.employee_name;
      const position_employ = Attendance.position_name;
      const present = Attendance.present;
      const sickdays = Attendance.sickdays;
      const absences = Attendance.absences;

      return {
        Month,
        Year,
        nik,
        employee_name,
        position_employ,
        present,
        sickdays,
        absences,
      };
    });
    return resultAttendanceData;
  } catch (error) {
    console.error(error);
  }
};

export const getDeductionData = async () => {
  let resultDeductionData = [];
  try {
    // get data deduction :
    const data_deduction = await SalaryDeduction.findAll({
      attributes: ["id", "deduction", "total_deduction"],
      distinct: true,
    });
    resultDeductionData = data_deduction.map((deduction) => {
      const id = deduction.id;
      const name_deduction = deduction.deduction;
      const total_deduction = deduction.total_deduction;

      return { id, name_deduction, total_deduction };
    });
  } catch (error) {
    console.error(error);
  }
  return resultDeductionData;
};

// Logika matematika
export const getSalaryDataEmploy = async () => {
  try {
    // Salary Employ :
    const resultEmployeeData = await getEmployeeData();
    const resultPositionData = await getPositionData();

    const employee_salary = resultEmployeeData
      .filter((employ) =>
        resultPositionData.some(
          (position) => position.position_name === employ.position_employ
        )
      )
      .map((employ) => {
        const position = resultPositionData.find(
          (position) => position.position_name === employ.position_employ
        );
        return {
          id: employ.id,
          nik: employ.nik,
          employee_name: employ.employee_name,
          position: employ.position_employ,
          basic_salary: position.basic_salary,
          transport_allowance: position.transport_allowance,
          meal_allowance: position.meal_allowance,
        };
      });

    // Deduction Employ :
    const resultAttendanceData = await getAttendanceData();
    const resultDeductionData = await getDeductionData();

    const deduction_employ = resultAttendanceData.map((Attendance) => {
      const deductionabsences = Attendance.absences > 0 ?
        resultDeductionData
          .filter((deduction) => deduction.name_deduction.toLowerCase() === "absences")
          .reduce((total, deduction) => total + deduction.total_deduction * Attendance.absences, 0) : 0;

      const SickLeaveDeduction = Attendance.sickdays > 0 ?
        resultDeductionData
          .filter((deduction) => deduction.name_deduction.toLowerCase() === "sickdays")
          .reduce((total, deduction) => total + deduction.total_deduction * Attendance.sickdays, 0) : 0;

      return {
        Year: Attendance.Year,
        Month: Attendance.Month,
        employee_name: Attendance.employee_name,
        present: Attendance.present,
        sickdays: Attendance.sickdays,
        absences: Attendance.absences,
        SickLeaveDeduction: SickLeaveDeduction,
        deductionabsences: deductionabsences,
        total_deduction: SickLeaveDeduction + deductionabsences
      };
    });

    // Total Salary Employ :
    const total_employee_salary = employee_salary.map((employ) => {
      const id = employ.id;
      const Attendance = resultAttendanceData.find(
        (Attendance) => Attendance.employee_name === employ.employee_name
      );
      const deduction = deduction_employ.find(
        (deduction) => deduction.employee_name === employ.employee_name
      );
      const total_salary =
      (employ.basic_salary +
      employ.transport_allowance +
      employ.meal_allowance -
      (deduction ? deduction.total_deduction : 0)).toLocaleString();

      return {
        Year: deduction ? deduction.Year : Attendance ? Attendance.Year : 0,
        Month: deduction ? deduction.Month : Attendance ? Attendance.Month : 0,
        id: id,
        nik: employ.nik,
        employee_name: employ.employee_name,
        position: employ.position,
        basic_salary: employ.basic_salary.toLocaleString(),
        transport_allowance: employ.transport_allowance.toLocaleString(),
        meal_allowance: employ.meal_allowance.toLocaleString(),
        present: Attendance.present,
        sickdays: Attendance.sickdays,
        absences: Attendance.absences,
        deduction: deduction ? deduction.total_deduction.toLocaleString() : 0,
        total: total_salary,
      };
    });
    return total_employee_salary;
  } catch (error) {
    console.error(error);
  }
};

// method untuk melihat data salary employ
export const viewSalaryDataEmploy = async (req, res) => {
  try {
    const SalaryDataEmploy = await getSalaryDataEmploy();
    res.status(200).json(SalaryDataEmploy);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const viewSalaryDataEmployByName = async (req, res) => {
  try {
    const SalaryDataEmploy = await getSalaryDataEmploy();
    const { name } = req.params;

    const SalaryDataByName = SalaryDataEmploy
      .filter((salary_data) => {
        return salary_data.employee_name
          .toLowerCase()
          .includes(name.toLowerCase().replace(/ /g, ""));
      })
      .map((salary_data) => {
        return {
          Year: salary_data.Year,
          Month: salary_data.Month,
          id: salary_data.id,
          nik: salary_data.nik,
          employee_name: salary_data.employee_name,
          position: salary_data.position,
          gender: salary_data.gender,
          position_employ: salary_data.position_employ,
          basic_salary: salary_data.basic_salary,
          transport_allowance: salary_data.transport_allowance,
          meal_allowance: salary_data.meal_allowance,
          deduction: salary_data.deduction,
          total_salary: salary_data.total,
        };
      });

    if (SalaryDataByName.length === 0) {
      return res.status(404).json({ msg: 'Data not found' });
    }
    return res.json(SalaryDataByName);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// method untuk melihat data salary employ berdasarkan ID
export const viewSalaryDataById = async (req, res) => {
  try {
    const SalaryDataEmploy = await getSalaryDataEmploy(req, res);
    const id = parseInt(req.params.id);

    const foundData = SalaryDataEmploy.find((data) => data.id === id);

    if (!foundData) {
      res.status(404).json({ msg: "Data not found" });
    } else {
      res.json(foundData);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// method untuk melihat data salary employ berdasarkan Name
export const viewSalaryDataByName = async (req, res) => {
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



// method untuk mencari data salary employ berdasarkan Month
export const viewSalaryDataEmployByMonth = async (req, res) => {
  try {
    const SalaryDataEmploy = await getSalaryDataEmploy();
    const response = await AttendanceData.findOne({
      attributes: ["Month"],
      where: {
        Month: req.params.month,
      },
    });

    if (response) {
      const SalaryDataByMonth = SalaryDataEmploy
        .filter((salary_data) => {
          return salary_data.Month === response.Month;
        })
        .map((salary_data) => {
          return {
            Month: response.Month,
            id: salary_data.id,
            nik: salary_data.nik,
            employee_name: salary_data.employee_name,
            gender: salary_data.gender,
            position_employ: salary_data.position_employ,
            basic_salary: salary_data.basic_salary,
            transport_allowance: salary_data.transport_allowance,
            meal_allowance: salary_data.meal_allowance,
            deduction: salary_data.deduction,
            total_salary: salary_data.total,
          };
        });
      return res.json(SalaryDataByMonth);
    }

    res
      .status(404)
      .json({ msg: `Data untuk Month ${req.params.month} tidak ditemukan` });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// method untuk mencari data salary employ berdasarkan Year
export const viewSalaryDataEmployByYear = async (req, res) => {
  try {
    const SalaryDataEmploy = await getSalaryDataEmploy();
    const { year } = req.params;

    const SalaryDataByYear = SalaryDataEmploy
      .filter((salary_data) => {
        const salaryYear = salary_data.Year;
        return salaryYear === parseInt(year);
      })
      .map((salary_data) => {
        return {
          Year: salary_data.Year,
          id: salary_data.id,
          nik: salary_data.nik,
          employee_name: salary_data.employee_name,
          gender: salary_data.gender,
          position_employ: salary_data.position,
          present: salary_data.present,
          sickdays: salary_data.sickdays,
          absences: salary_data.absences,
          basic_salary: salary_data.basic_salary,
          transport_allowance: salary_data.transport_allowance,
          meal_allowance: salary_data.meal_allowance,
          deduction: salary_data.deduction,
          total_salary: salary_data.total,
        };
      });

    if (SalaryDataByYear.length === 0) {
      return res
        .status(404)
        .json({ msg: `Data Year ${year} tidak ditemukan` });
    }
    res.json(SalaryDataByYear);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// method untuk mencari data salary employ berdasarkan Year
export const dataSalaryReportByYear = async (req, res) => {
  try {
    const SalaryDataEmploy = await getSalaryDataEmploy();
    const { year } = req.params;

    const SalaryDataByYear = SalaryDataEmploy
      .filter((salary_data) => {
        const salaryYear = salary_data.Year;
        return salaryYear === parseInt(year);
      })
      .map((salary_data) => {
        return {
          Year: salary_data.Year,
          id: salary_data.id,
          nik: salary_data.nik,
          employee_name: salary_data.employee_name,
          gender: salary_data.gender,
          position_employ: salary_data.position_employ,
          basic_salary: salary_data.basic_salary,
          transport_allowance: salary_data.transport_allowance,
          meal_allowance: salary_data.meal_allowance,
          deduction: salary_data.deduction,
          total_salary: salary_data.total,
        };
      });

    if (SalaryDataByYear.length === 0) {
      return res
        .status(404)
        .json({ msg: `Data Year ${year} tidak ditemukan` });
    } else {
      const ReportByYear = SalaryDataByYear.map((data) => data.Year)
      console.log(ReportByYear)
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};