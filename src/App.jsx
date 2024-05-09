import './App.css'
import Articles from './Pages/Articles'
import { Route,Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Sticky from './components/Sticky'
import Navbar from './components/Navbar'
import ArticleView from './components/ArticleView'
import PostComment from './components/PostComment'

function App() {

  return (
    <>
    <Sticky>
       <Navbar/>
    </Sticky>

    {/* <PostComment /> */}

    

  

      <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path='/articles'element={<Articles />}/>
        <Route path='/articles/:article_id'element={<ArticleView />}/>
      </Routes>
    </>
  )
}

export default App
