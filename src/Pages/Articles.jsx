import React, { useEffect, useState } from 'react'
import { fetchAllArticles } from '../../api/requests'
import ArticleCard from '../components/ArticleCard'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Sticky from '../components/Sticky'

const Articles = () => {
    const [articles,setArticles] = useState([])

    useEffect(() => {
      fetchAllArticles().then((data) => {
        setArticles(data)
       
      })
    },[])
   
  return (
    <>
     {articles.map((article)=>{
        return <ArticleCard key={article.article_id}article = {article}/>
     })}
    </>
  )
}

export default Articles