 import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchArticleById } from '../../api/requests'
 
 
 const ArticleView = () => {
   
    const {article_id} = useParams()
    const [article,setArticle] = useState({})
    console.log(article_id)

    useEffect(() => {
        fetchArticleById(article_id).then((article) => {
            
          setArticle(article)
        })
    },[])

    console.log(article)


   return (
 
    <>
    <div>ArticleView</div>
    <div className="article-details">
      <h2>{article.title}</h2>
      <p className="article-meta">
        <span className="article-topic">{article.topic}</span> by {article.author} on {article.created_at}
      </p>
      <img src={article.article_img_url} alt="Article Image" />
      <p className="article-body">{article.body}</p>
      <div className="article-footer">
        <span className="votes">{article.votes} Votes </span>
        <span className="comments"> {article.comment_count} comments</span>
      </div>
    </div>
    </>
   )
 }
 
 export default ArticleView