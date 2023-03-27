import React from 'react'

const Layout = ({children,className}) => {
  return (
    <div className={`w-full min-h-screen justify-center flex flex-col p-5 gap-y-10 bg-[#0F172A] ${className}`}>
        {children}
    </div>
  )
}

export default Layout