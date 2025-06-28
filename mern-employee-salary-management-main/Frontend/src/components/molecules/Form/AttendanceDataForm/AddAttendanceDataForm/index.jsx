import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import Layout from '../../../../../layout';
import Swal from 'sweetalert2';
import { Breadcrumb, ButtonOne, ButtonTwo } from '../../../..';
import { BiSearch } from 'react-icons/bi';
import { getMe } from '../../../../../config/redux/action';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';

const ITEMS_PER_PAGE = 4;

const FormAddAttendanceData = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [EmployeeData, setEmployeeData] = useState([]);
    const [AttendanceData, setAttendanceData] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const { isError, user } = useSelector((state) => state.auth);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const totalPages = Math.ceil(EmployeeData.length / ITEMS_PER_PAGE);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const filteredEmployeeData = EmployeeData.filter((employ) =>
        employ.employee_name.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    const getEmployeeData = async () => {
        const response = await axios.get("http://localhost:5000/employee_data");
        setEmployeeData(response.data);
    };

    const getAttendanceData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/attendance_data");
            setAttendanceData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const [present, setPresent] = useState([]);
    const [sickdays, setsickdays] = useState([]);
    const [absences, setabsences] = useState([]);

    const handlePresent = (index, value) => {
        const updatePresent = [...present];
        updatePresent[index] = value;
        setPresent(updatePresent);
    };

    const handlesickdays = (index, value) => {
        const updatesickdays = [...sickdays];
        updatesickdays[index] = value;
        setsickdays(updatesickdays);
    };

    const handleabsences = (index, value) => {
        const updateabsences = [...absences];
        updateabsences[index] = value;
        setabsences(updateabsences);
    };

    const handleSearch = (e) => {
        setSearchKeyword(e.target.value);
    };

    const saveAttendanceData = async (e) => {
        e.preventDefault();

        try {
            for (let i = 0; i < EmployeeData.length; i++) {
                const isnameAda = AttendanceData.some(
                    (Attendance) => Attendance.employee_name === EmployeeData[i].employee_name
                );

                if (!isnameAda) {
                    await axios.post("http://localhost:5000/attendance_data", {
                        nik: EmployeeData[i].nik,
                        employee_name: EmployeeData[i].employee_name,
                        position_name: EmployeeData[i].position,
                        gender: EmployeeData[i].gender,
                        present: present[i] || 0,
                        sickdays: sickdays[i] || 0,
                        absences: absences[i] || 0,
                    });
                    navigate("/data-Attendance");
                    Swal.fire({
                        icon: 'success',
                        title: "Succeed",
                        text: "Data Succeed Save",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            }
        } catch (error) {
            if (error.response) {
                Swal.fire({
                    title: "Error",
                    text: error.response.data.msg,
                    icon: "error",
                });
            }
        }
    };

    const paginationItems = () => {
        const items = [];
        const maxVisiblePages = 5;

        const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        for (let page = startPage; page <= endPage; page++) {
            items.push(
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`py-2 px-4 border border-gray-2 text-black font-semibold dark:text-white dark:border-strokedark ${currentPage === page ? 'bg-primary text-white hover:bg-primary dark:bg-primary dark:hover:bg-primary' : 'hover:bg-gray-2 dark:hover:bg-stroke'
                        } rounded-lg`}
                >
                    {page}
                </button>
            );
        }

        if (startPage > 2) {
            items.unshift(
                <p
                    key="start-ellipsis"
                    className="py-2 px-4 border border-gray-2 dark:bg-transparent text-black font-medium bg-gray dark:border-strokedark dark:text-white"
                >
                    ...
                </p>
            );
        }

        if (endPage < totalPages - 1) {
            items.push(
                <p
                    key="end-ellipsis"
                    className="py-2 px-4 border border-gray-2 dark:bg-transparent text-black font-medium bg-gray dark:border-strokedark dark:text-white"
                >
                    ...
                </p>
            );
        }

        return items;
    };

    useEffect(() => {
        getEmployeeData();
        getAttendanceData();
    }, []);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate('/login');
        }
        if (user && user.access_rights !== 'admin') {
            navigate('/dashboard');
        }
    }, [isError, user, navigate]);

    return (
        <Layout>
            <Breadcrumb pageName="Form Employee Attendance Data" />
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mt-6">
                <form onSubmit={saveAttendanceData}>
                    <div className="flex justify-between items-center mt-4 flex-col md:flex-row md:justify-between">
                        <div className="relative flex-2 mb-4 md:mb-0">
                            <input
                                type="text"
                                placeholder="Cari name Employ..."
                                value={searchKeyword}
                                onChange={handleSearch}
                                className="rounded-lg border-[1.5px] border-stroke bg-transparent py-2 pl-10 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary left-0"
                            />
                            <span className="absolute left-2 py-3 text-xl">
                                <BiSearch />
                            </span>
                        </div>
                    </div>
                    <div className="max-w-full overflow-x-auto py-4">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                        No
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                        NIK
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        name Employ
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        Position
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        Gender
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        Present
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        sickdays
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        absences
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEmployeeData.slice(startIndex, endIndex).map((data, index) => {
                                    const isnameAda = AttendanceData.some(
                                        (Attendance) => Attendance.employee_name === data.employee_name
                                    );

                                    if (isnameAda) {
                                        return <tr
                                            key={data.id}
                                            className="border-b border-[#eee] dark:border-strokedark"
                                        >
                                            <td className="py-5 px-4">
                                                <p className="text-center text-black dark:text-white">{startIndex + index + 1}</p>
                                            </td>
                                            <td className="py-5 px-4"
                                                colSpan="8">
                                                <p className="text-center text-black dark:text-white">Employee Attendance Data Has Been Saved. Input Back When You Have Changed Period !</p>
                                            </td>
                                        </tr>;
                                    }

                                    return (
                                        <tr
                                            key={data.id}
                                            className="border-b border-[#eee] dark:border-strokedark"
                                        >
                                            <td className="py-5 px-4">
                                                <p className="text-center text-black dark:text-white">{startIndex + index + 1}</p>
                                            </td>
                                            <td className="py-5 px-4">
                                                <p className="text-black dark:text-white">{data.nik}</p>
                                            </td>
                                            <td className="py-5 px-4">
                                                <p className="text-black dark:text-white">{data.employee_name}</p>
                                            </td>
                                            <td className="py-5 px-4">
                                                <p className="text-black dark:text-white">{data.position}</p>
                                            </td>
                                            <td className="py-5 px-4">
                                                <p className="text-black dark:text-white">{data.gender}</p>
                                            </td>
                                            <td className="py-5 px-4">
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    value={present[index] || ""}
                                                    onChange={(e) => handlePresent(index, e.target.value)}
                                                    className="form-input h-8 w-10 text-center border rounded-md disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input"
                                                    min="0"
                                                    required
                                                />
                                            </td>
                                            <td className="py-5 px-4">
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    value={sickdays[index] || ""}
                                                    onChange={(e) => handlesickdays(index, e.target.value)}
                                                    className="form-input h-8 w-10 text-center border rounded-md disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input"
                                                    min="0"
                                                    required
                                                />
                                            </td>
                                            <td className="py-5 px-4">
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    value={absences[index] || ""}
                                                    onChange={(e) => handleabsences(index, e.target.value)}
                                                    className="form-input h-8 w-10 text-center border rounded-md disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input"
                                                    min="0"
                                                    required
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}

                            </tbody>

                        </table>
                    </div>

                    <div className="flex justify-between items-center mt-4 flex-col md:flex-row md:justify-between">
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-5 dark:text-gray-4 text-sm py-4">
                                Showing {startIndex + 1}-{Math.min(endIndex, filteredEmployeeData.length)} from {filteredEmployeeData.length} Employee Attendance Data
                            </span>

                        </div>
                        <div className="flex space-x-2 py-4">
                            <button
                                disabled={currentPage === 1}
                                onClick={goToPrevPage}
                                className="py-2 px-6 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white dark:text-white dark:border-primary dark:hover:bg-primary dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                < MdKeyboardDoubleArrowLeft />
                            </button>
                            {paginationItems()}
                            <button
                                disabled={currentPage === totalPages}
                                onClick={goToNextPage}
                                className="py-2 px-6 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white dark:text-white dark:border-primary dark:hover:bg-primary dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                < MdKeyboardDoubleArrowRight />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row w-full gap-3 text-center py-4">
                        <div>
                            <ButtonOne type="submit">
                                <span>Save</span>
                            </ButtonOne>
                        </div>
                        <Link to="/data-Attendance">
                            <ButtonTwo>
                                <span>Back</span>
                            </ButtonTwo>
                        </Link>
                    </div>
                </form>
            </div>
        </Layout >
    );
};


export default FormAddAttendanceData;
