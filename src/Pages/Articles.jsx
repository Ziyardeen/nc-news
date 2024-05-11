import React, { useEffect, useState } from 'react'
import { fetchAllArticles } from '../../api/requests'
import ArticleCard from '../components/ArticleCard'
import { useSearchParams } from 'react-router-dom'

const Articles = () => {
    const [articles,setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams()
    const selectedTopic = searchParams.get('topic')

    const selectedOrder = searchParams.get("order")
    const selectedSort  = searchParams.get("sort_by")
    // const [errorMesage,setErrorMessage] = useState("")

    

    useEffect(() => {
      setIsLoading(true)
      fetchAllArticles(selectedTopic,selectedOrder,selectedSort).then((data) => {
        setArticles(data)
        setIsLoading(false)
       
      }).catch((error) => {
       
        setErrorMessage(error.msg)
      });
    },[selectedTopic,selectedOrder,selectedSort])

    // if(errorMesage){
    //   return <div className='error-message'>{errorMesage}</div>
    // }
   
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