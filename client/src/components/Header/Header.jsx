import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='w-full h-[64px] hidden bg-[#0EA5E9] lg:flex justify-between items-center'>
        <Link to='/'>
            <p className='text-2xl font-extrabold text-white fixed ml-5'>POST IT</p>
            <p className='text-2xl font-extrabold text-[#1C2541] ml-6 mt-1'>POST IT</p>
        </Link>
        <Link to='/login' className='p-5 h-fit w-fit'>
            <p className='h-full text-white text-2xl font-semibold hover:text-[#0F172A]'>Login</p>
        </Link>
    </div>
  )
}

export default Header