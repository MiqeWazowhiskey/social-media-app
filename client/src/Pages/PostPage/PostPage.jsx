import React , { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import {TfiBackLeft as Back } from 'react-icons/tfi'
import { Layout } from '../../components'
const PostPage = () => {
    const[post,setPost]=useState({})
    const { id } = useParams()
    useEffect(()=>{
        axios.get(`http://localhost:3001/posts/id/${id}`).then((res)=>{
            setPost(res.data)
        })
    })
  return (
            <Layout>
                {post&&
                    <div className='w-1/2 h-fit rounded-md border-4 border-white'>
            
                        <div className='flex flex-row w-full text-white bg-[#0EA5E9] text-lg  p-5'>
                        {post.title}
                        </div>

                        <div className='text-sm font-bold bg-[#FFFFFF] p-5'>
                        {post.text}
                        </div>
                        
                        <div className='text-sm text-end bg-[#FFFFFF]'>
                        {post.username}
                        
                        </div>
                        
                    </div>
                }
                <div className='text-white'>
                    Comment Section
                </div>
                <Link to='/' className='text-3xl lg:text-6xl fixed right-5 bottom-5 text-white hover:text-[#0EA5E9]'>
                    <Back/>
                </Link>
            </Layout>
          
   
  )
}

export default PostPage