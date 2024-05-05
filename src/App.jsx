import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ArticleCard from './components/ArticleCard'
import Articles from './Pages/Articles'
import { Route,Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Sticky from './components/Sticky'
import Header from './components/Header'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
    <Sticky>
       <Header />
       <Navbar/>
    </Sticky>

      <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path='/articles'element={<Articles />}/>
      </Routes>
    </>
  )
}

export default App
