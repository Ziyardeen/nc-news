import React, { useState,useEffect } from 'react'
import CommentCard from './CommentCard'
import { fetchCommentsByArticleId } from '../../api/requests'
import { postCommentsById } from '../../api/requests'

import { deleteCommentById } from '../../api/requests'

const CommentsList = ({article_id,article}) => {
   const [comments,setComments] = useState([])
   const [isLoading, setIsLoading] = useState(false);
   const [isSubmit, setIsSubmit] = useState(false);
   const [comment, setComment] = useState('')
   const [errorMessage, setErrorMessage] = useState(null);
   const [commentError, setCommentError] = useState(null);
   const [isDisabled, setIsDisabled] = useState(false);
   const [isSuccess, setIsSuccess] = useState(false);

   const userName = "grumpy19"
  

   useEffect(() => {
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
          setIsLoading(true)
          setComments((prevComments) => {
           return [...prevComments,data]
          })
       
      }).catch((err) => {
        setIsSubmit(false)
        setIsSuccess(false)
        setErrorMessage("Something Went wrong, Please try again later")
      })

  }
  // Deleting a Comment
  const handleDelete =  (commentId)=>{
    setComments(comments.filter((comment) => comment.id !== commentId));

    deleteCommentById(commentId).then(() => {
      console.log("Delete succesfull")
    })
  }


  return (
    <>
    {errorMessage && <p className="error-message">{errorMessage}</p>}
    <div className='post-comment-container'>
    <div>PostComment</div>
    <form className='comment-form' onSubmit={handleSubmit}>
        <textarea name="comment-body" id="comment-body" cols="30" rows="5" value={comment}onChange={handleCommentInput} disabled={isSuccess}></textarea>
        {commentError && <p className="error-message">{commentError}</p>}
        {isSuccess && <p className="success-message">Your Comment was successful</p>}
        <button type="submit" disabled={isSuccess}>{isSubmit ? "Posting..." : "Post Comment"}</button>
    </form>
    
    </div>

    {isLoading ? <p>Loading......</p>: null }
    {comments.map((comment) => {
      
      return(
      <div className='comments-list' key={comment.comment_id}>
          <CommentCard comment= {comment} handleDelete={handleDelete}/>
          {userName === comment.author && <button className='delete-btn' onClick={() => handleDelete(comment.comment_id)}>Delete</button>}
      </div> )
    })}
  
    </>
  )
}

export default CommentsList