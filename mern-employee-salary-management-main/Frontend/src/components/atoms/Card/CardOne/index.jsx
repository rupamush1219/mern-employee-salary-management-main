import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeData } from '../../../../config/redux/action';
import { FaUsers } from 'react-icons/fa';

const CardOne = () => {
  const dispatch = useDispatch();
  const {EmployeeData} = useSelector((state) => state.EmployeeData); // Accessing the correct slice
  const AmountEmployeeData = EmployeeData.length;

  useEffect(() => {
    dispatch(getEmployeeData());
  }, [dispatch]);

  return (
    <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark'>
      <div className='flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4'>
        <FaUsers className='fill-primary dark:fill-white text-xl' />
      </div>
      <div className='mt-4 flex items-end justify-between'>
        <div>
          <h4 className='text-title-md font-bold text-black dark:text-white'>
            {AmountEmployeeData}
          </h4>
          <span className='text-sm font-medium'>Employee Data</span>
        </div>
      </div>
    </div>
  );
};

export default CardOne;
