import './App.css'
import Articles from './Pages/Articles'
import { Route,Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Sticky from './components/Sticky'
import Navbar from './components/Navbar'
import ArticleView from './components/ArticleView'
import { useState } from 'react'
import PostComment from './components/PostComment'

function App() {
  const [selectedUsername, setSelectedUsername] = useState('SELECT USER HERE')
  

  return (
    <>
    <Sticky>
       <Navbar selectedUsername={selectedUsername} setSelectedUsername={setSelectedUsername}/>
    </Sticky>



      <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path='/articles'element={<Articles />}/>
        <Route path='/articles/:article_id'element={<ArticleView selectedUsername={selectedUsername}/>}/>
      </Routes>
    </>
  )
}

export default App
