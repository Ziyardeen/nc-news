import React, { useEffect, useState } from 'react'
import { fetchRandomArticles } from '../../api/requests'
import ArticleCard from './ArticleCard'

const RandomArticles = () => {
    const [articles,setArticles] = useState([])

    useEffect(() => {
      fetchRandomArticles().then((randArticles) => {
        setArticles(randArticles)
        
      })
    },[])

  return (
    <>
    {articles.map((article)=>{
        return <ArticleCard key={article.article_id}article = {article}/>})}
    </>
  )
}

export default RandomArticles