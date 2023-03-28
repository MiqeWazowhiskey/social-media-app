import React, { useContext,useState } from 'react'
import axios from 'axios'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import { useNavigate, Link } from 'react-router-dom'
import { Context } from '../../context/Context'
import { Layout } from '../../components'
import * as Yup from 'yup'
import {TfiBackLeft as Back } from 'react-icons/tfi'


const Login = () => {
    const{authState,setAuthState}=useContext(Context)
    const Navigate= useNavigate();
    const onSubmit = (data) => {
        axios.post('https://post-it-api.herokuapp.com/userAuth/login',data).then((res)=>{
            if(res.data.error){
                alert(res.data.error)
            }
            else{
                sessionStorage.setItem('accessToken',res.data)
                setAuthState({
                    username: res.data.username,
                    id: res.data.id,
                    status:true
                })
                Navigate('/')
            }
            
        })
    }
    const initialValues = {
        username:'',
        password:''
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(2).max(20).required('Username required...'),
        password: Yup.string().min(8).max(16).required('Password required...')
    })
  return (
    <Layout>
        <Formik validationSchema={validationSchema} onSubmit={onSubmit} initialValues={initialValues}>
            <Form className='w-full flex justify-center'>
                <div className='w-1/3 flex flex-col gap-y-5'>
                    <label className='text-lg text-white mb-2 flex justify-between'>
                        Username
                    </label>
                    <Field autoComplete='off' className='w-full focus:outline-none p-3' name='username' type='text'/>

                    <label className='text-lg text-white mb-2 flex justify-between'>
                        Password
                    </label>
                    <Field autoComplete='off's className='w-full focus:outline-none p-3' name='password' type='password' />
                    <div className='w-full flex justify-center'>
                        <button type='submit' className='p-3 bg-[#0EA5E9] text-white font-bold mt-10 hover:brightness-125'> Login </button>
                    </div>
                </div>
            </Form>
        </Formik>
        <Link to='/' className='text-3xl lg:text-6xl fixed right-5 bottom-5 text-white hover:text-[#0EA5E9]'>
            <Back/>
        </Link>
    </Layout>
  )
}

export default Login