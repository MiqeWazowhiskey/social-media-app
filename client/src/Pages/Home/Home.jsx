import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Layout } from '../../components'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {CgProfile as Profile } from 'react-icons/cg'

const Home = () => {
    const Navigate = useNavigate();
    const [data, setData] = useState([])
  useEffect(()=>{
    axios.get('http://post-it-api.herokuapp.com/posts').then((res)=>{
      setData(res.data)
    })
  },[])
  
  return (
    <Layout className="w-full items-center min-h-screen text-black">
      {data.map((val,i)=>{
        return(
          
          <motion.div onClick={()=>{Navigate(`/posts/id/${val.id}`)}} key={i} className='w-1/2 h-fit rounded-md border-4 border-white hover:outline-none hover:cursor-pointer' whileHover={{scale: 1.03}}>
            
            <div className='flex flex-row w-full text-white bg-[#0EA5E9] text-lg  p-5'>
              {val.title}
            </div>

            <div className='text-sm font-bold bg-[#FFFFFF] p-5'>
              {val.text}
            </div>
            
            <div className='flex justify-end items-center gap-x-1 text-sm text-end bg-[#FFFFFF]'>
              <Link to={`/profile/${val.UserId}`} className='hover:text-[#0EA5E9] w-fit flex gap-x-2' onClick={(e)=>{e.stopPropagation()}}><Profile size={24}/>{val.username}</Link>
            </div>
            

          </motion.div>
        )
      })}
    <button className='lg:text-8xl lg:w-[84px] lg:h-[84px] w-[64px] h-[64px] text-7xl flex items-center justify-center font-bold text-white rounded-full fixed right-10 bottom-10 bg-[#0EA5E9] border-4 border-white'>
        <Link to='/createPost'>
          <div className='w-fit h-fit pb-5'>+</div>
        </Link>
      </button>
    </Layout>
  )
}

export default Home