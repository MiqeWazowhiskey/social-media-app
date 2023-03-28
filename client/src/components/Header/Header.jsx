import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'
const Header = () => {
  const{username}= useContext(Context)
  return (
    <div className='w-full h-[64px] hidden bg-[#0EA5E9] lg:flex justify-between items-center'>
        <Link to='/'>
            <p className='text-2xl font-extrabold text-white fixed ml-5'>POST IT</p>
            <p className='text-2xl font-extrabold text-[#1C2541] ml-6 mt-1'>POST IT</p>
        </Link>
        {!username?
        <div className='flex flex-row gap-x-5'>
          <Link to='/login' className='p-5 h-fit w-fit'>
              <p className='h-full text-white text-lg font-semibold hover:text-[#0F172A]'>Login</p>
          </Link>
          <Link to='/register' className='p-5 h-fit w-fit'>
              <p className='h-full text-white text-lg font-semibold hover:text-[#0F172A]'>Register</p>
          </Link>
        </div>
        :<div>{username}</div>
        }
    </div>
  )
}

export default Header