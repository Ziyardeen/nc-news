 import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchArticleById } from '../../api/requests'
import CommentsList from './CommentsList'
import VotesBtn from './VotesBtn'
import { updateVotesById } from '../../api/requests'
 
 
 const ArticleView = ({selectedUsername}) => {
   
    const {article_id} = useParams()
    const [article,setArticle] = useState({})
    const [commentVisibility, setCommentVisibility] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
   
    const [upVoted, setUpVoted] = useState(false)
    const [downVoted, setDownVoted] = useState(false)
    const [failure, setFailure] = useState(false)
    const [errorMesage,setErrorMessage] = useState("")



    useEffect(() => {
      setIsLoading(true)
        fetchArticleById(article_id).then((article) => {
            
          setArticle(article)
          setIsLoading(false)
        })
    },[])

    const handleComment = () => {
      setCommentVisibility(!commentVisibility)
    }



    const handleUpVote = ()=>{
      setUpVoted(true)
      setDownVoted(false)
      
        //  optimistically render upvote
      setArticle((prevArticle) => ({
        ...prevArticle,
        votes: prevArticle.votes + 1,
      }))
  
       updateVotesById(article_id,1).then((data) => {
         console.log("patch successful......")
       }).catch(() => {
         setFailure(true)
         console.log
       })
  
     }

     const handleDownVote = ()=>{
      setUpVoted(false)
      setDownVoted(true)
      //  optimistically render downvote
      setArticle((prevArticle) => ({
        ...prevArticle,
        votes: prevArticle.votes - 1,
      }))


      updateVotesById(article.article_id,-1).then((data) => {
      }).catch((err) => {
        setFailure(true)
     
        setArticle((prevArticle) => ({
          ...prevArticle,
          votes: prevArticle.votes + 1,
        }))
      })
  
    }

    if(errorMesage){
      return <div className='error-message'>{errorMesage}</div>
    }

 
   return (
 
    <div className='article-view'>
    {isLoading ? <p>Loading......</p>: null}
    <div className="article-view-details">
      <h2>{article.topic}: {article.title}</h2>
      <p className="article-view-meta">
        <span className="article-view-author">by {article.author} </span>

        <span className="article-view-date"> on  {article.created_at}</span> 
      </p>
      <img className="article-view-image"src={article.article_img_url} alt="Article Image" />
      <p className="article-view-body">{article.body}</p>
      <div className="article-view-footer">

        
        <div className='vote-container'>
          <span className="votes">{article.votes} Votes </span>
          <button className={`vote-up-btn ${upVoted ? 'active' : ''}`} 
          disabled={upVoted ? true : false} onClick={handleUpVote}>⬆️</button>
          <button className={`vote-down-btn ${downVoted ? 'active' : ''}`} 
          disabled={downVoted ? true : false}
          onClick={handleDownVote}>⬇️</button>
          {failure && <p>Vote Failed</p>}
       </div>
          
        
        <span className="comments" onClick={handleComment} > {article.comment_count} comments</span>
      </div>
    </div>
      {commentVisibility && <CommentsList article_id={article_id} article={article} selectedUsername={selectedUsername}/> }
    </div>
   )
 }
 
 export default ArticleView