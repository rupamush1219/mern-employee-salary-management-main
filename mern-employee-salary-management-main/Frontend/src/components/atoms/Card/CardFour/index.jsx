import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAttendanceData } from '../../../../config/redux/action';
import { AiFillDatabase } from 'react-icons/ai'

const CardFour = () => {
  const dispatch = useDispatch();
  const { AttendanceData } = useSelector((state) => state.AttendanceData);
  const AmountAttendanceData = AttendanceData.length;

  useEffect(() => {
    dispatch(getAttendanceData());
  }, [dispatch]);

  return (
    <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark'>
      <div className='flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4'>
        <AiFillDatabase className="fill-primary dark:fill-white text-xl" />
      </div>

      <div className='mt-4 flex items-end justify-between'>
        <div>
          <h4 className='text-title-md font-bold text-black dark:text-white'>
            {AmountAttendanceData}
          </h4>
          <span className='text-sm font-medium'>Attendance Data</span>
        </div>
      </div>
    </div>
  )
}

export default CardFour;
