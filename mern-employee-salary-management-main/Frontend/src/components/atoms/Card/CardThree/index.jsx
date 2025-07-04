import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPositionData } from '../../../../config/redux/action';
import { FaUserTie } from 'react-icons/fa'

const CardThree = () => {
  const dispatch = useDispatch();
  const { PositionData } = useSelector((state) => state.PositionData);
  const AmountPositionData = PositionData.length;

  useEffect(() => {
    dispatch(getPositionData());
  }, [dispatch]);

  return (
    <div className='rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark'>
      <div className='flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4'>
        <FaUserTie className="fill-primary dark:fill-white text-xl" />
      </div>

      <div className='mt-4 flex items-end justify-between'>
        <div>
          <h4 className='text-title-md font-bold text-black dark:text-white'>
            {AmountPositionData}
          </h4>
          <span className='text-sm font-medium'>Position Data</span>
        </div>
      </div>
    </div>
  )
}

export default CardThree;
