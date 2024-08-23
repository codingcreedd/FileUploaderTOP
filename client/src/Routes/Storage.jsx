import React, { useContext, useState } from 'react'
import { Context } from '../components/ContextProvider';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Storage = () => {

    const [usedStoragePercentage, setUsedStoragePercentage] = useState(20);

  return (
    <div className='flex flex-col'>
        <div className='flex flex-col gap-5'>
            <div className='flex justify-between'>
                <div className='flex items-center gap-2'>
                    <h1 className='font-bold text-2xl'>Storage</h1>
                    <p className='text-[0.9rem] text-gray-600'>2.6 GB out of 5 GB used</p>
                </div>
                <button className='px-5 py-1 bg-black text-white rounded-lg'>Upload Files</button> 
            </div>
            <div className='flex'>
                <div className={`w-[${usedStoragePercentage}%] h-[2px] bg-black`}></div>
                <div className={`w-[${100-usedStoragePercentage}%] h-[2px] bg-gray-200`}></div>
            </div>
        </div>

        <div className='flex flex-col gap-5 mt-10'>
            <Outlet />
        </div>

        
    </div>
  )
}

export default Storage