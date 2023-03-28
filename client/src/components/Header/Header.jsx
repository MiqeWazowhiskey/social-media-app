import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'
const Header = () => {
  const{authState,setAuthState}= useContext(Context)

  useEffect(()=>{
    axios.get('http://post-it-api.herokuapp.com/userAuth/getAuth',{
      
      headers:{
        accessToken: sessionStorage.getItem('accessToken')
      }
    
    }).then((res)=>{
      if(res.data.error){
        setAuthState({...authState, status:false});
      }
      else{
        setAuthState({
          username: res.data.username,
          id: res.data.id,
          status:true
        });
      }
    })
  },[])

  const logOut = () => {
    sessionStorage.removeItem('accessToken')
    setAuthState({
      username:'',
      id:0,
      status:false
    })
  }
  return (
    <div className='w-full h-[64px] bg-[#0EA5E9] flex justify-between items-center'>
        <Link to='/'>
            <p className='text-2xl font-extrabold text-white fixed ml-5'>POST IT</p>
            <p className='text-2xl font-extrabold text-[#1C2541] ml-6 mt-1'>POST IT</p>
        </Link>
        {!authState.status?
        <div className='flex flex-row gap-x-5'>
          <Link to='/login' className='p-5 h-fit w-fit'>
              <p className='h-full text-white text-lg font-semibold hover:text-[#0F172A]'>Login</p>
          </Link>
          <Link to='/register' className='p-5 h-fit w-fit'>
              <p className='h-full text-white text-lg font-semibold hover:text-[#0F172A]'>Register</p>
          </Link>
        </div>
        :<div className='flex flex-col items-end m-2'>
          <div className='font-bold text-white '>Welcome {authState.username}</div>
          <div className='my-auto'>
            <button onClick={logOut} className='font-bold'>
              <span className='h-full text-white font-bold hover:text-[#0F172A]'>Logout</span>
            </button>
          </div>
        </div>
        }
    </div>
  )
}

export default Header