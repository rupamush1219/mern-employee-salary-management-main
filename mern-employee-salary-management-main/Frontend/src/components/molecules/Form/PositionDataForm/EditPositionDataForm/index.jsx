import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../../../../layout';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Breadcrumb, ButtonOne, ButtonTwo} from '../../../..';
import { getMe } from '../../../../../config/redux/action';

const FormEditPositionData = () => {
    const [positionname, setpositionname] = useState('');
    const [basicSalary, setBasicSalary] = useState('');
    const [tjTransport, setTjTransport] = useState('');
    const [uangMakan, setUangMakan] = useState('');
    const [msg,setMsg] = useState('');
    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { isError, user } = useSelector((state) => state.auth);

    useEffect(() => {
        const getUserById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/position_data/${id}`);
                setpositionname(response.data.position_name);
                setBasicSalary(response.data.basic_salary);
                setTjTransport(response.data.transport_allowance);
                setUangMakan(response.data.meal_allowance);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        }
        getUserById();
    }, [id]);

    const updatePositionData = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('position_name', positionname);
            formData.append('basic_salary', basicSalary);
            formData.append('transport_allowance', tjTransport);
            formData.append('meal_allowance', uangMakan);

            const response = await axios.patch(`http://localhost:5000/position_data/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMsg(response.data.msg);
            Swal.fire({
                icon: 'success',
                title: 'Succeed',
                timer: 1500,
                text: response.data.msg
            });
            navigate('/data-position');
        } catch (error) {
            setMsg(error.response.data.msg);
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: error.response.data.msg
            });
        }
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
            <Breadcrumb pageName='Form Edit Position' />

            <div className='sm:grid-cols-2'>
                <div className='flex flex-col gap-9'>
                    <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
                        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
                            <h3 className='font-medium text-black dark:text-white'>
                                Form Edit Position Data
                            </h3>
                        </div>
                        <form onSubmit={updatePositionData}>
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
                                            onChange={(e) => setpositionname(e.target.value)}
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
                                            onChange={(e) => setBasicSalary(e.target.value)}
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
                                            onChange={(e) => setTjTransport(e.target.value)}
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
                                            onChange={(e) => setUangMakan(e.target.value)}
                                            required
                                            placeholder='Enter Meal allowance'
                                            className='w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col md:flex-row w-full gap-3 text-center'>
                                    <div>
                                        <ButtonOne  >
                                            <span>Update</span>
                                        </ButtonOne>
                                    </div>
                                    <Link to="/data-position" >
                                        <ButtonTwo  >
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

export default FormEditPositionData;
