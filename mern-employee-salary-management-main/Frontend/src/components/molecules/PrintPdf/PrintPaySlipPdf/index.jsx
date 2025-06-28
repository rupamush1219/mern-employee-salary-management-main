import React, { useRef, useEffect, useState } from "react";
import LogoPt from "../../../../assets/images/logo/logo-dark.svg";
import LogoARIO from "../../../../assets/images/logo/logo-ARIO.png";
import { useReactToPrint } from "react-to-print";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchSalarySlipByMonth,
    fetchSalarySlipByName,
    fetchSalarySlipByYear,
    getMe
} from "../../../../config/redux/action";
import { ButtonOne, ButtonTwo } from "../../../atoms";

const PrintPdfSalarySlip = () => {
    const componentRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const month = searchParams.get("month");
    const year = searchParams.get("year");
    const name = searchParams.get("name");

    const [Month, setMonth] = useState("");
    const [Year, setYear] = useState("");

    const { isError, user } = useSelector((state) => state.auth);
    const { dataSalarySlip } = useSelector((state) => state.Salaryslip);

    const getDataByYear = async (selectedYear) => {
        dispatch(fetchSalarySlipByYear(selectedYear));
    };

    const getDataByMonth = async (selectedMonth) => {
        dispatch(fetchSalarySlipByMonth(selectedMonth));
    };

    const getDataByName = async (selectedName) => {
        dispatch(fetchSalarySlipByName(selectedName));
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Employee Salary Slip AC. AAA Group of Industry",
    });

    useEffect(() => {
        getDataByYear(year);
        getDataByMonth(month);
        getDataByName(name);
    }, [year, month, name]);

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
        setMonth(monthNames[today.getMonth()]);
        setYear(today.getFullYear());
    }, []);

    return (
        <>
            {/* Controls */}
            <div className="flex flex-col md:flex-row w-full gap-3 text-center p-6 bg-white dark:bg-meta-4">
                <ButtonOne onClick={handlePrint}><span>Print</span></ButtonOne>
                <ButtonTwo onClick={() => navigate(-1)}><span>Back</span></ButtonTwo>
            </div>

            {/* Print Content */}
            <div ref={componentRef}>
                {dataSalarySlip.length === 0 ? (
                    <p>No Salary Data Available</p>
                ) : (
                    dataSalarySlip.map((data, index) => (
                        <div key={index} className="w-200% h-100% p-10 bg-white dark:bg-meta-4">
                            {/* Logo & Title */}
                            <div className="flex items-center gap-24 object-cover border-b-4 border-black dark:border-white">
                                <img className="w-35" src={LogoARIO} alt="Logo ARIO" />
                                <h1 className="text-black text-2xl font-bold dark:text-white">AC. AAA Group of Industry</h1>
                                <img className="w-35" src={LogoARIO} alt="Logo ARIO" />
                            </div>

                            {/* Salary Slip Data */}
                            <h1 className="text-center text-black dark:text-white my-4 text-xl font-medium py-2">Employee Salary List</h1>
                            <div className="w-full md:text-lg">
                                {/* Employee Details */}
                                {[
                                    { label: "Employee Name", value: name },
                                    { label: "NIK", value: data.nik },
                                    { label: "Position", value: data.position },
                                    { label: "Month", value: month },
                                    { label: "Year", value: year }
                                ].map((item, idx) => (
                                    <h2 key={idx} className="font-medium mb-4 block text-black dark:text-white">
                                        <span className="inline-block w-32 md:w-40">{item.label}</span>
                                        <span className="inline-block w-7">:</span>
                                        {item.value}
                                    </h2>
                                ))}
                            </div>

                            {/* Salary Breakdown Table */}
                            <div className="max-w-full overflow-x-auto py-4">
                                <table className='w-full table-auto'>
                                    <thead>
                                        <tr className='bg-white text-left dark:bg-meta-4'>
                                            <th className='py-4 border-t border-l font-medium text-center text-black dark:text-white'>No</th>
                                            <th className='py-4 px-4 border-t border-l text-center font-medium text-black dark:text-white'>Description</th>
                                            <th className='py-4 px-4 border-t text-center border-l border-r font-medium text-black dark:text-white'>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { label: "Basic Salary", value: data.basic_salary },
                                            { label: "Transportation Allowance", value: data.transport_allowance },
                                            { label: "Meal Allowance", value: data.meal_allowance },
                                            { label: "Deduction", value: data.deduction }
                                        ].map((item, idx) => (
                                            <tr key={idx} className='dark:border-white'>
                                                <td className='border-b border-black py-5 text-center text-black dark:text-white'>{idx + 1}</td>
                                                <td className='border-b border-black py-5 px-4 text-black dark:text-white'>{item.label}</td>
                                                <td className='border-b border-black py-5 px-4 text-black dark:text-white'>Rp. {item.value}</td>
                                            </tr>
                                        ))}
                                        <tr className='dark:border-white'>
                                            <td className='border-b border-black py-5 px-4 text-black dark:text-white'></td>
                                            <td className='font-medium border-b border-black py-5 px-2 text-right text-black dark:text-white'>Total Salary:</td>
                                            <td className='font-medium border-b border-black py-5 px-4 text-black dark:text-white'>Rp. {data.total}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Footer */}
                            <div className="py-6 flex justify-between items-center">
    {/* Employee Section */}
    <div className="font-medium text-black dark:text-white text-center">
        <span className="p-6">Employee</span>
        <div className="mt-6 mb-6 h-12"></div> {/* Spacing for signature */}
        <span>{name}</span>
    </div>

    {/* Finance Section */}
    <div className="font-medium text-black dark:text-white text-center">
        <span className="text-right">Kolkata, {`${new Date().getDate()} ${month} ${year}`}</span><br />
        <span>Finance</span><br />
        <div className="p-8 italic text-black dark:text-white">Signature</div>
    </div>
</div>

                            <div className="italic text-black dark:text-white mt-10">
                                Printed On: {`${new Date().getDate()} ${Month} ${Year}`}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default PrintPdfSalarySlip;
