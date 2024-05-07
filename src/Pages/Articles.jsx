import React, { useEffect, useState } from 'react'
import { fetchAllArticles } from '../../api/requests'
import ArticleCard from '../components/ArticleCard'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Sticky from '../components/Sticky'

const Articles = () => {
    const [articles,setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      setIsLoading(true)
      fetchAllArticles().then((data) => {
        setArticles(data)
        setIsLoading(false)
       
      })
    },[])
   
  return (
    <>
    {isLoading ? <p>Loading......</p>: null}
     {articles.map((article)=>{
        return <ArticleCard key={article.article_id}article = {article}/>
     })}
    </>
  )
}

export default Articles