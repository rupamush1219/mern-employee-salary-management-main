import { useState, useEffect } from 'react';
import Layout from '../../../../layout';
import { Link, useNavigate } from 'react-router-dom';
import { Breadcrumb, ButtonOne } from '../../../../components';
import { FaRegEdit, FaPlus } from 'react-icons/fa'
import { BsTrash3 } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { BiSearch } from 'react-icons/bi'
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { deleteAttendanceData, getAttendanceData, getMe } from '../../../../config/redux/action';

const ITEMS_PER_PAGE = 4;

const AttendanceData = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filterYear, setFilterYear] = useState("");
    const [filterMonth, setFilterMonth] = useState("");
    const [filtername, setFiltername] = useState("");

    const { AttendanceData } = useSelector((state) => state.AttendanceData);
    const { isError, user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const totalPages = Math.ceil(AttendanceData.length / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const filteredAttendanceData = AttendanceData.filter((AttendanceData) => {
        const isMatchMonth =
            filterMonth === "" ||
            AttendanceData.Month.toLowerCase().includes(filterMonth.toLowerCase());
        const isMatchYear =
            filterYear === "" || AttendanceData.Year.toString() === filterYear;
        const isMatchname =
            filtername === "" ||
            AttendanceData.employee_name.toLowerCase().includes(filtername.toLowerCase());
        return isMatchMonth && isMatchYear && isMatchname;
    });

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

    const handleMonthChange = (event) => {
        setFilterMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setFilterYear(event.target.value);
    };

    const handlenameChange = (event) => {
        setFiltername(event.target.value);
    };

    const onDeleteAttendanceData = (id) => {
        Swal.fire({
            title: 'Confirmation',
            text: 'Are you sure you want to Delete?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteAttendanceData(id)).then(() => {
                    Swal.fire({
                        title: 'Success',
                        text: 'Attendance Data successfully deleted.',
                        icon: 'success',
                        timer: 1000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });
                    dispatch(getAttendanceData());
                });
            }
        });
    };

    useEffect(() => {
        dispatch(getAttendanceData(startIndex, endIndex));
    }, [dispatch, startIndex, endIndex]);

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

    return (
        <Layout>
            <Breadcrumb pageName='Employee Attendance Data' />

            <div className='rounded-sm border border-stroke bg-white px-5 pt-2 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-10 mt-6'>
                <div className='border-b border-stroke py-2 dark:border-strokedark'>
                    <h3 className='font-medium text-black dark:text-white'>
                        Filter Employee Attendance Data
                    </h3>
                </div>

                <div className='flex flex-col md:flex-row md:justify-between items-center mt-4'>
                    <div className='relative w-full md:w-1/2 md:mr-2 mb-4 md:mb-0'>
                        <div className='relative'>
                            <span className='px-6'>Month</span>
                            <span className='absolute top-1/2 left-70 z-30 -translate-y-1/2 text-xl'>
                                <MdOutlineKeyboardArrowDown />
                            </span>
                            <select
                                value={filterMonth}
                                onChange={handleMonthChange}
                                className='relative appearance-none rounded border border-stroke bg-transparent py-2 px-18 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input'
                            >
                                <option value=''>Select Month</option>
<option value='January'>January</option>
<option value='February'>February</option>
<option value='March'>March</option>
<option value='April'>April</option>
<option value='May'>May</option>
<option value='June'>June</option>
<option value='July'>July</option>
<option value='August'>August</option>
<option value='September'>September</option>
<option value='October'>October</option>
<option value='November'>November</option>
<option value='December'>December</option>

                            </select>
                        </div>
                    </div>
                    <div className='relative w-full md:w-1/2 md:mr-2 mb-4 md:mb-0'>
                        <div className='relative'>
                            <span className='px-6'>Year</span>
                            <input
                                type='number'
                                placeholder='Enter Year...'
                                value={filterYear}
                                onChange={handleYearChange}
                                className='rounded border-[1.5px] border-stroke bg-transparent py-2 pl-10 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary left-0'
                            />
                            <span className='absolute left-25 py-3 text-xl '>
                                <BiSearch />
                            </span>
                        </div>
                    </div>
                    <div className='w-full md:w-1/2 flex justify-center md:justify-end'>
                        <div className='w-full md:w-auto'>
                            <Link to='/data-Attendance/form-data-Attendance/add'>
                                <ButtonOne>
                                    <span>Input Attendance</span>
                                    <span>
                                        <FaPlus />
                                    </span>
                                </ButtonOne>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-2 text-left dark:bg-meta-4 mt-6">
                    {filteredAttendanceData.slice(startIndex, endIndex).reduce((uniqueEntries, data) => {
                        const isEntryExist = uniqueEntries.find(entry => entry.Month === data.Month && entry.Year === data.Year);
                        if (!isEntryExist) {
                            uniqueEntries.push(data);
                        }
                        return uniqueEntries;
                    }, []).map(data => (
                        <h2 className="px-4 py-2 text-black dark:text-white" key={`${data.Month}-${data.Year}`}>
                            Showing Employee Attendance Data Month :
                            <span className="font-medium"> {data.Month} </span>
                            Year :
                            <span className="font-medium"> {data.Year}</span>
                        </h2>
                    ))}
                </div>

            </div>

            <div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mt-6'>
                <div className="flex justify-between items-center mt-4 flex-col md:flex-row md:justify-between">
                    <div className="relative flex-2 mb-4 md:mb-0">
                        <input
                            type='text'
                            placeholder='Cari name Employ...'
                            value={filtername}
                            onChange={handlenameChange}
                            className='rounded-lg border-[1.5px] border-stroke bg-transparent py-2 pl-10 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary left-0'
                        />
                        <span className='absolute left-2 py-3 text-xl'>
                            <BiSearch />
                        </span>
                    </div>
                </div>

                <div className='max-w-full overflow-x-auto py-4'>
                    <table className='w-full table-auto'>
                        <thead>
                            <tr className='bg-gray-2 text-left dark:bg-meta-4'>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    No
                                </th>
                                <th className='py-4 px-4 font-medium text-center text-black dark:text-white'>
                                    NIK
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    name Employ
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Position
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Gender
                                </th>
                                <th className='py-4 text-center px-4 font-medium text-black dark:text-white'>
                                    Present
                                </th>
                                <th className='py-4 text-center px-4 font-medium text-black dark:text-white'>
                                    sickdays
                                </th>
                                <th className='py-4 text-center px-4 font-medium text-black dark:text-white'>
                                    absences
                                </th>
                                <th className='py-4 px-4 font-medium text-black dark:text-white'>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAttendanceData.slice(startIndex, endIndex).map((data, index) => {
                                return (
                                    <tr
                                        key={data.id}
                                        className="border-b border-[#eee] dark:border-strokedark"
                                    >
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>{startIndex + index + 1}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                            <p className='text-black text-center dark:text-white'>{data.nik}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>{data.employee_name}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>{data.position_employ}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                            <p className='text-black dark:text-white'>{data.gender}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                            <p className='text-center text-black dark:text-white'>{data.present}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                            <p className='text-center text-black dark:text-white'>{data.sickdays}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                            <p className='text-center text-black dark:text-white'>{data.absences}</p>
                                        </td>
                                        <td className='border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
                                            <div className='flex items-center space-x-3.5'>
                                                <Link className='hover:text-black'
                                                    to={`/data-Attendance/form-data-Attendance/edit/${data.id}`}
                                                >
                                                    <FaRegEdit className="text-primary text-xl hover:text-black dark:hover:text-white" />
                                                </Link>
                                                <button className='hover:text-black'
                                                    onClick={() => onDeleteAttendanceData(data.id)}
                                                >
                                                    <BsTrash3 className="text-danger text-xl hover:text-black dark:hover:text-white" />
                                                </button>
                                            </div>
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
                            Showing {startIndex + 1}-{Math.min(endIndex, filteredAttendanceData.length)} from {filteredAttendanceData.length} Employee Attendance Data
                        </span>
                    </div>
                    <div className="flex space-x-2 py-4">
                        <button
                            disabled={currentPage === 1}
                            onClick={goToPrevPage}
                            className="py-2 px-6 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white dark:text-white dark:border-primary dark:hover:bg-primary dark:hover:text-white disabled:opacity-50"
                        >
                            < MdKeyboardDoubleArrowLeft />
                        </button>
                        {paginationItems()}
                        <button
                            disabled={currentPage === totalPages}
                            onClick={goToNextPage}
                            className="py-2 px-6 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-white dark:text-white dark:border-primary dark:hover:bg-primary dark:hover:text-white disabled:opacity-50"
                        >
                            < MdKeyboardDoubleArrowRight />
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AttendanceData;