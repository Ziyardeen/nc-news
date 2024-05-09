 import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchArticleById } from '../../api/requests'
import CommentsList from './CommentsList'
import VotesBtn from './VotesBtn'
import { updateVotesById } from '../../api/requests'
 
 
 const ArticleView = () => {
   
    const {article_id} = useParams()
    const [article,setArticle] = useState({})
    const [commentVisibility, setCommentVisibility] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
   
    const [upVoted, setUpVoted] = useState(false)
    const [downVoted, setDownVoted] = useState(false)
    const [failure, setFailure] = useState(false)
    const [upCounter,setUpCounter] = useState(0)
    const [downCounter,setDownCounter] = useState(0)


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
      if(upVoted && !downVoted && upCounter > 0 ){
        console.log("Up voted already...")
        return
      }
      setUpVoted(true)
      setDownVoted(false)
      setUpCounter((prev) => {
        return prev + 1
      })
      setDownCounter(0)
      
        //  optimistically render upvote
      setArticle((prevArticle) => ({
        ...prevArticle,
        votes: prevArticle.votes + 1,
      }))
  
       updateVotesById(article_id,1).then((data) => {
         console.log("patch successful......")
       }).catch(() => {
         setFailure(true)
         setArticle((prevArticle) => ({
          ...prevArticle,
          votes: prevArticle.votes - 1,
        }))
        
       })
  
     }

     const handleDownVote = ()=>{
      if(!upVoted && downVoted && downCounter > 0){
        console.log("Down voted already...")
        return
      }

      setUpVoted(false)
      setDownVoted(true)
      setDownCounter((prev) => {
        return prev + 1
      })
      setUpCounter(0)
      //  optimistically render downvote
      setArticle((prevArticle) => ({
        ...prevArticle,
        votes: prevArticle.votes - 1,
      }))

      updateVotesById(article.article_id,-1).then((data) => {

        console.log("patch successful......")
      }).catch((err) => {
        setFailure(true)
        setArticle((prevArticle) => ({
          ...prevArticle,
          votes: prevArticle.votes + 1,
        }))
      })
  
    }

 
   return (
 
    <>
    {isLoading ? <p>Loading......</p>: null}
    <div>ArticleView</div>
    <div className="article-details">
      <h2>{article.title}</h2>
      <p className="article-meta">
        <span className="article-topic">{article.topic}</span> by {article.author} on {article.created_at}
      </p>
      <img src={article.article_img_url} alt="Article Image" />
      <p className="article-body">{article.body}</p>
      <div className="article-footer">

       
        <div className='vote-container'>
          <span className="votes">{article.votes} Votes </span>
          <button className={`vote-up-btn ${upVoted ? 'active' : ''}`} 
          
           onClick={handleUpVote}>⬆️</button>
          <button className={`vote-down-btn ${downVoted ? 'active' : ''}`} 
         
          onClick={handleDownVote}>⬇️</button>
          {failure && <p>Vote Failed</p>}
       </div>
      
        
        <span className="comments" onClick={handleComment} > {article.comment_count} comments</span>
      </div>
    </div>
      {commentVisibility && <CommentsList article_id={article_id} article={article}/> }
    </>
   )
 }
 
 export default ArticleView