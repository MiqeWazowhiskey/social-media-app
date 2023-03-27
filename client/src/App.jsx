import './App.css'
import { Home, CreatePost, PostPage } from './Pages'
import { Routes, Route } from 'react-router-dom'
function App() {
  
  return (
    <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/createPost' exact element={<CreatePost/>}/>
        <Route path='/posts/id/:id' exact element={<PostPage/>}/>
    </Routes>
  )
}

export default App
