import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import { Home, CreatePost } from './Pages'
import { Routes, Route } from 'react-router-dom'
function App() {
  
  return (
    <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/createPost' exact element={<CreatePost/>}/>

    </Routes>
  )
}

export default App
