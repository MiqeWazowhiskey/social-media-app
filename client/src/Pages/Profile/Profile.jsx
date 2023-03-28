import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Layout } from '../../components'
import { motion } from 'framer-motion'
import {CgProfile as ProfileIcon } from 'react-icons/cg'
import {TfiBackLeft as Back } from 'react-icons/tfi'

const Profile = () => {
    const Navigate = useNavigate();
    const{ id } = useParams();
    const[userInfo,setUserInfo]= useState()
    const[profileData,setProfileData]= useState([])
    useEffect(()=>{
        axios.get(`https://post-it-api.herokuapp.com/userAuth/byId/${id}`,{
            headers:{
                accessToken: sessionStorage.getItem('accessToken')
            }
        }).then((res)=>{
            setUserInfo(res.data)
        })
        axios.get(`https://post-it-api.herokuapp.com/posts/profile/${id}`,{
            headers:{
                accessToken: sessionStorage.getItem('accessToken')
            }
        }).then((res)=>{
                setProfileData(res.data)
        })
    },[])
  return (
    <Layout>
        <h3 className='text-white font-extrabold text-3xl flex flex-col items-center justify-center'>
            <ProfileIcon size={64}/>
            {userInfo && userInfo.username}
        </h3>
        {profileData.length>0 ? profileData.map((val,i)=>{
        return(
          
            <motion.div onClick={()=>{Navigate(`/posts/id/${val.id}`)}} key={i} className='w-1/2 h-fit rounded-md border-4 border-white hover:outline-none hover:cursor-pointer' whileHover={{scale: 1.03}}>
                
                <div className='flex flex-row w-full text-white bg-[#0EA5E9] text-lg  p-5'>
                {val.title}
                </div>

                <div className='text-sm font-bold bg-[#FFFFFF] p-5'>
                {val.text}
                </div>
                
                <div className='flex justify-end items-center gap-x-1 text-sm text-end bg-[#FFFFFF]'>
                <Link to={`/profile/${val.UserId}`} className='hover:text-[#0EA5E9] w-fit flex gap-x-2' onClick={(e)=>{e.stopPropagation()}}><ProfileIcon size={24}/>{val.username}</Link>
                </div>
                

            </motion.div>
          
        )
      }):<h2 className='text-red-500 text-2xl bg-black p-2 rounded-md'>You should log in to see profiles</h2>}
        <Link to='/' className='text-3xl lg:text-6xl fixed right-5 bottom-5 text-white hover:text-[#0EA5E9]'>
            <Back/>
        </Link>
    </Layout>
  )
}

export default Profile