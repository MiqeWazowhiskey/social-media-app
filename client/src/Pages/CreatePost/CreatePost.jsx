import React from 'react'
import { Link } from 'react-router-dom'
import { Layout } from '../../components'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
  const Navigate = useNavigate();
  const initialValues = {
    title: "",
    text:"",
    username:""
  }
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Type something nice'),
    text: Yup.string().required('Type something nice'),
    username: Yup.string().min(2).max(20).required('Username required')
  })
  const onSubmit = (data)=> {
    axios.post("http://localhost:3001/posts", data ).then(()=>{
      Navigate('/')
    })
  }

  return (
    <Layout className='flex items-center'>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form className='lg:w-1/2 h-fit bg-white p-5 flex flex-col gap-y-15 items-center rounded-md'>

            <div className='w-full flex flex-col'>
              <ErrorMessage className='text-red-600' component='span' name='username'/>
              <label className='text-[#0EA5E9]'>Username:</label>
              <Field autoComplete='off' name='username' className='w-full border-[#0EA5E9] border-4 focus:outline-none p-2' type='text'/>
            </div>

            <div className='w-full flex flex-col'>
              <ErrorMessage className='text-red-600' component='span' name='title'/>
              <label className='text-[#0EA5E9]'>Title:</label>
              <Field autoComplete='off' name='title' className='w-full border-[#0EA5E9] border-4 focus:outline-none p-2' type='text'/>
            </div>

            <div className='h-full w-full flex flex-col'>
              <ErrorMessage className='text-red-600' component='span' name='text'/>
              <Field name='text' className='w-full h-[128px] border-[#0EA5E9] border-4 focus:outline-none p-2 mt-5' type='text' placeholder='Type...'/>
            </div>
            <div className='w-full flex justify-center'>
              <button type='submit' className='bg-[#0EA5E9] w-1/5 h-fit p-5 m-5 rounded-md text-white font-bold '>
                <span>Post</span>
              </button>
              <Link to='/' className='bg-red-500 w-1/5 h-fit p-5 m-5 rounded-md text-white text-center font-bold '>
                <span>Cancel</span>
              </Link>
            </div>
        </Form>
        </Formik>
      
    </Layout>
  )
}

export default CreatePost