import React, { useEffect, useState } from 'react'
import { fetchRandomArticles } from '../../api/requests'
import ArticleCard from './ArticleCard'

const RandomArticles = () => {
    const [articles,setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      setIsLoading(true)
      fetchRandomArticles().then((randArticles) => {
        setArticles(randArticles)
        setIsLoading(false)
        
      })
    },[])

  return (
    <>
    {isLoading ? <p>Loading......</p>: null}
    {articles.map((article)=>{
        return <ArticleCard key={article.article_id}article = {article}/>})}
    </>
  )
}

export default RandomArticles