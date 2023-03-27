import React from 'react'
import Header from '../Header'
const Layout = ({children,className}) => {
  return (
    <>
    <div className={`w-full min-h-screen items-center flex flex-col gap-y-10 bg-[#0F172A] ${className}`}>
        <Header/>
        {children}
    </div></>
  )
}

export default Layout