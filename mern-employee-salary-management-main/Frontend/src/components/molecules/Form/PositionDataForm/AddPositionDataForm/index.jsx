import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../../../../layout';
import Swal from 'sweetalert2';
import { Breadcrumb, ButtonOne, ButtonTwo } from '../../../..';
import { createPositionData, getMe } from '../../../../../config/redux/action';

const FormAddPositionData = () => {
    const [formData, setFormData] = useState({
        positionname: '',
        basicSalary: '',
        tjTransport: '',
        uangMakan: '',
    });

    const {
        positionname,
        basicSalary,
        tjTransport,
        uangMakan,
    } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

    const submitPositionData = (e) => {
        e.preventDefault();
        const newFormData = new FormData();
        newFormData.append('position_name', positionname);
        newFormData.append('basic_salary', basicSalary);
        newFormData.append('transport_allowance', tjTransport);
        newFormData.append('meal_allowance', uangMakan);

        dispatch(createPositionData(newFormData, navigate))
            .then((response) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Succeed',
                    text: response.message,
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.msg) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed',
                        text: error.response.data.msg,
                        confirmButtonText: 'Ok',
                    });
                } else if (error.message) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed',
                        text: error.message,
                        confirmButtonText: 'Ok',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed',
                        text: 'There is an error',
                        confirmButtonText: 'Ok',
                    });
                }
            });

    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

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
            <Breadcrumb pageName='Form Position' />

            <div className='sm:grid-cols-2'>
                <div className='flex flex-col gap-9'>
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Form Position Data
                            </h3>
                        </div>
                        <form onSubmit={submitPositionData}>
                            <div className='p-6.5'>
                                <div className='mb-4.5 flex flex-col gap-6 xl:flex-row'>
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Position <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            id='positionname'
                                            name='positionname'
                                            value={positionname}
                                            onChange={handleChange}
                                            required={true}
                                            placeholder='Enter position'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Basic Salary <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='number'
                                            id='basicSalary'
                                            name='basicSalary'
                                            value={basicSalary}
                                            onChange={handleChange}
                                            required
                                            placeholder='Enter Basic Salary'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row mt-10">
                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Transportation Allowance <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='number'
                                            id='tjTransport'
                                            name='tjTransport'
                                            value={tjTransport}
                                            onChange={handleChange}
                                            required
                                            placeholder='Enter Transportation Allowance'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>

                                    <div className='w-full xl:w-1/2'>
                                        <label className='mb-2.5 block text-black dark:text-white'>
                                            Meal allowance <span className='text-meta-1'>*</span>
                                        </label>
                                        <input
                                            type='number'
                                            id='uangMakan'
                                            name='uangMakan'
                                            value={uangMakan}
                                            onChange={handleChange}
                                            required
                                            placeholder='Enter Meal allowance'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                </div>

                                <div className='flex flex-col md:flex-row w-full gap-3 text-center'>
                                    <div>
                                        <ButtonOne>
                                            <span>Save</span>
                                        </ButtonOne>
                                    </div>
                                    <Link to="/data-position" >
                                        <ButtonTwo>
                                            <span>Back</span>
                                        </ButtonTwo>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default FormAddPositionData;
