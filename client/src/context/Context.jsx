import React,{ useState} from 'react'
export const Context = React.createContext()

export const Provider = ({children}) => {
    const[password,setPassword]= useState('')
    const[authState,setAuthState] = useState({username:'',
                                              id:0,
                                              status:false})
    return(
        <Context.Provider value={{password,setPassword,authState,setAuthState}}>
            {children}
        </Context.Provider>
    )
}
