import React from 'react'
import { useSearchParams } from 'react-router-dom'
// import { fetchArticlesByTopic } from '../../api/requests'
import { useState,useEffect } from 'react'
import ArticleCard from '../components/ArticleCard'

const Topics = () => {
//     const [searchParams, setSearchParams] = useSearchParams()
//     const selectedTopic = searchParams.get('topic')
//     console.log(selectedTopic)


//     const [articles,setArticles] = useState([])
//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//       setIsLoading(true)
//       fetchArticlesByTopic(selectedTopic).then((data) => {
//         setArticles(data)
//         setIsLoading(false)
       
//       })
//     },[selectedTopic])

//   return (
//     <>
//     <div>Topics</div>
    
//     {isLoading ? <p>Loading......</p>: null}
//      {articles.map((article)=>{
//         return <ArticleCard key={article.article_id}article = {article}/>
//      })}
//     </>
//   )
}

export default Topics