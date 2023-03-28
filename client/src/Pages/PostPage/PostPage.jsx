import React , { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {TfiBackLeft as Back } from 'react-icons/tfi'
import {RiSendPlaneLine as Send} from 'react-icons/ri'
import { Layout } from '../../components'
import { Context } from '../../context/Context'
import {AiTwotoneDelete as Delete } from 'react-icons/ai'
const PostPage = () => {
    const{authState}= useContext(Context)
    const[post,setPost]=useState({})
    const[comments,setComments]=useState([])
    const[commentText,setCommentText]=useState('')
    const Navigate= useNavigate();

    const { id } = useParams()
    useEffect(()=>{
        axios.get(`http://localhost:3001/posts/id/${id}`).then((res)=>{
            setPost(res.data)
        })
        axios.get(`http://localhost:3001/comments/comment/${id}`).then((response)=>{
            setComments(response.data)
            setCommentText("")
        })
        
    },[])
    //Delete Post
    const deletePost = () => {
        axios.delete(`http://localhost:3001/posts/${id}`,{
            headers:{
                accessToken: sessionStorage.getItem('accessToken')
            }
        }).then((res)=>{
            Navigate('/')
        })
    }

    // Delete comment
    const deleteComment = (id) => {
        axios.delete(`http://localhost:3001/comments/${id}`,{
            headers:{
                accessToken: sessionStorage.getItem('accessToken')
            }
        }).then((res)=>{
            setComments(comments.filter((v)=>{return v.id != id}))
        })
    }

    const postComment = () => {
        axios.post('http://localhost:3001/comments', {
            text: commentText,
            username:authState.username,
            PostId:id,
            userId: authState.id
        },
        {
            headers:{
                accessToken: sessionStorage.getItem('accessToken')
            }
        }).then((response)=>{
            if(response.data.error){
                alert(response.data.error)
            }
            else{
                const add = {text:commentText, username: response.data.username}
                setComments([...comments,add])
                setCommentText('')
            }
            
        })
    }
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
                        <Link to={`/profile/${post.UserId}`} className='hover:text-[#0EA5E9] '>{post.username}</Link>
                        {authState.id == post.UserId &&<button onClick={()=>{deletePost()}} className='font-bold text-xl p-2  text-gray-400 hover:text-red-500'>
                            <span>x</span>
                        </button>}
                        </div>
                        
                    </div>
                }

                {/**post comment */}

                <div className='w-1/2 flex justify-center flex-row'>
                    <textarea placeholder='Comment...'
                              autoComplete='off'
                              value={commentText}
                              className='w-full resize-none border-4 border-[#0EA5E9] p-3 focus:outline-none'
                              onChange={(e)=>{setCommentText(e.target.value)}}/>
                    <button className='text-white bg-[#0EA5E9] m-3 rounded-full px-3' onClick={postComment}><Send size={32}/></button>
                </div>

                {/**comments */}

                <div className='w-1/2 text-white flex flex-col gap-y-5'>
                    {comments.map((v,i)=>{
                        return(
                            <div key={i} className=' border p-5 rounded-md'>
                                
                                <div className='text-lg w-full text-white text-start'>
                                    {v.text}
                                </div>

                                {
                                authState.id == v.userId &&
                                <div  className='w-full flex justify-end items-end h-full mb-5'>
                                    <button onClick={()=>deleteComment(v.id)}>
                                        <span className='text-gray-500'>
                                            <Delete/>
                                        </span>
                                    </button>
                                </div>
                                }

                                <div className='text-sm w-full text-end text-[#0EA5E9]'>
                                    {v.username}
                                    
                                </div>
                                
                                
                                
                            </div>
                        )
                    })}
                </div>
                <Link to='/' className='text-3xl lg:text-6xl fixed right-5 bottom-5 text-white hover:text-[#0EA5E9]'>
                    <Back/>
                </Link>
            </Layout>
          
   
  )
}

export default PostPage