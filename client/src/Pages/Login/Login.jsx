import React, { useContext,useState } from 'react'
import axios from 'axios'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../context/Context'
import { Layout } from '../../components'
import * as Yup from 'yup'


const Login = () => {
    const{username,setUsername}=useContext(Context)
    const Navigate= useNavigate();
    const onSubmit = (data) => {
        axios.post('http://localhost:3001/userAuth/login',data).then((res)=>{
            setUsername(data.username)
            Navigate('/')
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
    </Layout>
  )
}

export default Login