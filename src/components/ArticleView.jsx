 import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchArticleById } from '../../api/requests'
import CommentsList from './CommentsList'
 
 
 const ArticleView = () => {
   
    const {article_id} = useParams()
    const [article,setArticle] = useState({})
    const [commentVisibility, setCommentVisibility] = useState(false)

    console.log(article_id)

    useEffect(() => {
        fetchArticleById(article_id).then((article) => {
            
          setArticle(article)
        })
    },[])

    const handleComment = () => {
      setCommentVisibility(!commentVisibility)
    }

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
        <span className="comments" onClick={handleComment} > {article.comment_count} comments</span>
      </div>
    </div>
      {commentVisibility && <CommentsList /> }
    </>
   )
 }
 
 export default ArticleView