import './App.css'
import { Home, CreatePost, PostPage, Register, Login, Profile } from './Pages'
import { Routes, Route } from 'react-router-dom'

function App() {
  
  return (
    <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/createPost' exact element={<CreatePost/>}/>
        <Route path='/posts/id/:id' exact element={<PostPage/>}/>
        <Route path='/register' exact element={<Register/>}/>
        <Route path='/login' exact element={<Login/>}/>
        <Route path='/profile/:id' exact element={<Profile/>}/>
    </Routes>
  )
}

export default App
