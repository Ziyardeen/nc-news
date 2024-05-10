import React, { useEffect, useState } from 'react'
import { fetchAllArticles } from '../../api/requests'
import ArticleCard from '../components/ArticleCard'
import { useSearchParams } from 'react-router-dom'

const Articles = () => {
    const [articles,setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams()
    const selectedTopic = searchParams.get('topic')
    

    useEffect(() => {
      setIsLoading(true)
      fetchAllArticles(selectedTopic).then((data) => {
        setArticles(data)
        setIsLoading(false)
       
      })
    },[selectedTopic])
   
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