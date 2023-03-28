import './App.css'
import { Home, CreatePost, PostPage, Register, Login } from './Pages'
import { Routes, Route, useNavigate } from 'react-router-dom'

function App() {
  
  return (
    <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/createPost' exact element={<CreatePost/>}/>
        <Route path='/posts/id/:id' exact element={<PostPage/>}/>
        <Route path='/register' exact element={<Register/>}/>
        <Route path='/login' exact element={<Login/>}/>
    </Routes>
  )
}

export default App
