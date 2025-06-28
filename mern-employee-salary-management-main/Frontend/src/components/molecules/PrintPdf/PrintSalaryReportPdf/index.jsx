import React, { useRef, useEffect, useState } from "react";
import LogoPt from "../../../../assets/images/logo/logo-dark.svg";
import LogoARIO from "../../../../assets/images/logo/logo-ARIO.png";
import { useReactToPrint } from "react-to-print";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSalaryReportByMonth,
  fetchSalaryReportByYear,
  getMe,
} from "../../../../config/redux/action";
import { ButtonOne, ButtonTwo } from "../../../atoms";

const PrintPdfSalaryReport = () => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const month = searchParams.get("month");
  const year = searchParams.get("year");
  const [Month, setMonth] = useState("");
  const [Year, setYear] = useState("");

  const { isError, user } = useSelector((state) => state.auth);
  const { dataSalaryReport } = useSelector((state) => state.SalaryReport);

  const getDataByYear = async (selectedYear) => {
    dispatch(fetchSalaryReportByYear(selectedYear));
  };

  const getDataByMonth = async (selectedMonth) => {
    dispatch(fetchSalaryReportByMonth(selectedMonth));
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "employee_salary_data_AC. AAA Group of Industry",
  });

  useEffect(() => {
    getDataByYear(year);
    getDataByMonth(month);
  }, [year, month]);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
    if (user && user.access_rights !== "admin") {
      navigate("/dashboard");
    } else {
      handlePrint();
    }
  }, [isError, user, navigate, handlePrint]);

  useEffect(() => {
    const today = new Date();
    const monthNames = [
      "January", "February", "March", "April", "May", "June", 
"July", "August", "September", "October", "November", "December"

    ];
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();
    setMonth(month);
    setYear(year);
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row w-full gap-3 text-center p-6 bg-white dark:bg-meta-4">
        <div>
          <ButtonOne onClick={handlePrint}>
            <span>Print</span>
          </ButtonOne>
        </div>
        <div>
          <ButtonTwo
            onClick={() => navigate(-1)}
          >
            <span>Back</span>
          </ButtonTwo>
        </div>
      </div >
      <div ref={componentRef} className="w-200% h-100% p-10 bg-white dark:bg-meta-4">
        <div className="flex items-center gap-24 object-cover border-b-4 border-black dark:border-white">
          <img className="w-35"
            src={LogoARIO}
            title="Logo ARIO"
            alt="Logo ARIO" />
          <h1 className="text-black text-2xl font-bold boder  dark:text-white">
            AC. AAA Group of Industry
          </h1>
          <img className="w-35"
            src={LogoARIO}
            title="Logo ARIO"
            alt="Logo ARIO" 
          />
        </div>
        <h1 className="text-center text-black my-4 text-xl font-medium boder py-2 dark:text-white">
          Salary List Employ
        </h1>
        <div className="w-full md:text-lg">
          <h2 className="font-medium mb-4 block text-black dark:text-white">
            <span className="inline-block w-32 md:w-40">Month</span>
            <span className="pl-[-8] md:pl-0"></span>
            <span className="inline-block w-7">:</span>
            {month}
          </h2>
          <h2 className="font-medium mb-4 block text-black dark:text-white">
            <span className="inline-block w-32 md:w-40">Year</span>
            <span className="inline-block w-7">:</span>
            {year}
            <span className="pl-[-8] md:pl-0"></span>
          </h2>
        </div>
        <div className="max-w-full overflow-x-auto py-4">
          <table className="w-full table-auto-full">
            <thead>
              <tr>
                <th className="font-medium text-black border-b border-t border-l  border-black dark:border-white dark:text-white">
                  No
                </th>
                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">
                  NIK
                </th>
                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">
                  name <br /> Employ
                </th>
                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">
                  Position
                </th>
                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">
                    Basic <br /> Salary
                </th>
                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">
                    Transport <br /> Allowance
                </th>
                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">
                    Meal <br /> Allowance
                </th>

                <th className="font-medium text-black border-t border-l border-b border-black dark:border-white dark:text-white">
                  Deduction
                </th>
                <th className="font-medium text-black border-t border-l border-b border-r border-black dark:border-white dark:text-white">
                  Total <br /> Salary
                </th>
              </tr>
            </thead>
            <tbody>
              {dataSalaryReport.map((data, index) => {
                return (
                  <tr key={index}>
                    <td className="border-b border-l border-black dark:border-white py-5 text-center">
                      <p className="text-black dark:text-white">{index + 1}</p>
                    </td>
                    <td className="border-b border-l border-black dark:border-white py-5 text-center">
                      <p className="text-black dark:text-white">{data.nik}</p>
                    </td>
                    <td className="border-b border-l border-black dark:border-white py-5 text-center">
                      <p className="text-black dark:text-white">{data.employee_name}</p>
                    </td>
                    <td className="border-b border-l border-black dark:border-white py-5 text-center">
                      <p className="text-black dark:text-white">{data.position_employ}</p>
                    </td>
                    <td className="border-b border-l border-black dark:border-white py-5 text-center">
                      <p className="text-black dark:text-white">Rp. {data.basic_salary}</p>
                    </td>
                    <td className="border-b border-l border-black dark:border-white py-5 text-center">
                      <p className="text-black dark:text-white">Rp. {data.transport_allowance}</p>
                    </td>
                    <td className="border-b border-l border-black dark:border-white py-5 text-center">
                      <p className="text-black dark:text-white">Rp. {data.meal_allowance}</p>
                    </td>
                    <td className="border-b border-l border-black dark:border-white py-5 text-center">
                      <p className="text-black dark:text-white">Rp. {data.deduction}</p>
                    </td>
                    <td className="border-b border-l border-r border-black dark:border-white py-5 text-center">
                      <p className="text-black dark:text-white">Rp. {data.total_salary}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="py-6">
          <div className="font-medium text-black text-right dark:text-white">
            <span>kolkata, {`${new Date().getDate()} ${Month} ${Year}`}</span>
            <br />
            <span className="p-26">Finance</span>
            <br />
            <br />
            <span className="p-8 italic text-black dark:text-white">Signature</span>
          </div>
        </div>
        <div className="italic text-black dark:text-white mt-40">
          Printed On : {`${new Date().getDate()} ${Month} ${Year}`}
        </div>
      </div>
    </>
  );
};

export default PrintPdfSalaryReport;
