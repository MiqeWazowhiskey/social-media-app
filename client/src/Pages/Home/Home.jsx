import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Layout } from '../../components'
import { Link } from 'react-router-dom'
const Home = () => {
    const [data, setData] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:3001/posts').then((res)=>{
      setData(res.data)
    })
  },[])
  
  return (
    <Layout className="w-full items-center min-h-screen text-black">
      {data.map((val,i)=>{
        return(
          <div key={i} className='w-1/2 h-fit rounded-md border-4 border-white'>
          
            <div className='flex flex-row w-full text-white bg-[#0EA5E9] text-lg  p-5'>
              {val.title}
            </div>

            <div className='text-sm font-bold bg-[#FFFFFF] p-5'>
              {val.text}
            </div>
            
            <div className='text-sm text-end bg-[#FFFFFF]'>
              {val.username}
              
            </div>

          </div>
        )
      })}
      <button className='text-8xl w-[96px] h-[96px] flex items-center justify-center font-bold text-white rounded-full fixed right-10 bottom-10 bg-[#0EA5E9] border-2 border-white'>
        <Link to='/createPost'>
          <div className='w-fit h-fit pb-5'>+</div>
        </Link>
      </button>
    </Layout>
  )
}

export default Home