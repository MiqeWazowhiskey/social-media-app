
import React, { useContext } from 'react'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import {TfiBackLeft as Back } from 'react-icons/tfi'
import { useNavigate, Link } from 'react-router-dom'
import { Layout } from '../../components'
import { Context } from '../../context/Context'
const Register = () => {
    const {setAuthState,authState} = useContext(Context)
    const Navigate = useNavigate();
    const initialValues = {
        username:'',
        password:''
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(2).max(20).required('Username required...'),
        password: Yup.string().min(8).max(16).required('Password required...')
    })
    const onSubmit = (data) => {
        axios.post('http://localhost:3001/userAuth', data).then(()=>{
            axios.post('http://localhost:3001/userAuth/login',data).then((res)=>{
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
          })
    }
  return (
    <Layout>

        <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
            <Form className='w-1/3 '>
                <div className='p-5 flex flex-col'>
                    <label className='text-lg text-white mb-2 flex justify-between'>
                        Username
                        <ErrorMessage className='text-red-500' component='span' name='username'/>
                    </label>
                    <Field autoComplete='off' name='username' type='string' className='w-full focus:outline-none p-3'/>
                </div> 

                <div className='p-5 flex flex-col'>
                    <label className='text-lg text-white mb-2 flex justify-between'>
                        Password
                        <ErrorMessage className='text-red-500' component='span' name='password'/>
                    </label>
                    <Field autoComplete='off' name='password' type='password' className='w-full focus:outline-none p-3'/>

                </div>
                <div className='w-full flex justify-center'>
                    <button type='submit' className='p-3 bg-[#0EA5E9] text-white font-bold mt-10 hover:brightness-125'> Register </button>
                </div>

            </Form>
        </Formik>
        <Link to='/' className='text-3xl lg:text-6xl fixed right-5 bottom-5 text-white hover:text-[#0EA5E9]'>
            <Back/>
        </Link>
    </Layout>
  )
}

export default Register