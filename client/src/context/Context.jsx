import React,{ useState} from 'react'
export const Context = React.createContext()

export const Provider = ({children}) => {
    const[username,setUsername]= useState('')
    const[password,setPassword]= useState('')

    return(
        <Context.Provider value={{username,setUsername,password,setPassword}}>
            {children}
        </Context.Provider>
    )
}
