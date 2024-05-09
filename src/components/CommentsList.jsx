import React, { useState,useEffect } from 'react'
import CommentCard from './CommentCard'
import { fetchCommentsByArticleId } from '../../api/requests'
import { postCommentsById } from '../../api/requests'

const CommentsList = ({article_id,article}) => {
   const [comments,setComments] = useState([])
   const [isLoading, setIsLoading] = useState(false);
   const [isSubmit, setIsSubmit] = useState(false);
   const [comment, setComment] = useState('')
   const [errorMessage, setErrorMessage] = useState(null);
   const [commentError, setCommentError] = useState(null);
   const [isDisabled, setIsDisabled] = useState(false);
   const [isSuccess, setIsSuccess] = useState(false);
  

   useEffect(() => {
    setIsLoading(true)
     fetchCommentsByArticleId(article_id).then((comments) => {
       setComments(comments)
       setIsLoading(false)
     })
   },[comment])
  //  Post Comment

  const name = article.author;

   const handleCommentInput= ({target})=>{
    setComment(target.value)
    }

    const handleSubmit = (e)=>{
      e.preventDefault()
      setIsSubmit(true)
      setIsDisabled(true)

      if(!comment){
          console.log("Enter post")
          setCommentError("Please Enter Your Comment")
          setIsSubmit(false)
          setIsDisabled(false)
          return
      }
      // optimistically render Here
      postCommentsById(article_id,name,comment).then((data) => {
          setComment('')
          setIsSubmit(false)
          setCommentError("")
          setIsSuccess(true)
          setComments((prevComments) => {
           return [...prevComments,data]
          })
       
      }).catch((err) => {
        setIsSubmit(false)
        setIsSuccess(false)
        setErrorMessage("Something Went wrong, Please try again later")
      })

  }
  //Deleteing a Comment
      // const handleDelete =  ()=>{

      // }


  return (
    <>
    {errorMessage && <p className="error-message">{errorMessage}</p>}
    <div className='post-comment-container'>
    <div>PostComment</div>
    <form className='comment-form' onSubmit={handleSubmit}>
        <textarea name="comment-body" id="comment-body" cols="30" rows="5" value={comment}onChange={handleCommentInput} disabled={isDisabled}></textarea>
        {commentError && <p className="error-message">{commentError}</p>}
        {isSuccess && <p className="success-message">Your Comment was successful</p>}
        <button type="submit">{isSubmit ? "Posting..." : "Post Comment"}</button>
    </form>
    
    </div>

    {isLoading ?<p>Loading......</p>: null }
    {comments.map((comment) => {
      
      return(
      <div className='comments-list' key={comment.comment_id}>
          <CommentCard comment= {comment} />
          {/* <button className='delete-btn'>Delete</button> */}
      </div> )
    })}
  
    </>
  )
}

export default CommentsList