import React, { useState,useEffect } from 'react'
import CommentCard from './CommentCard'
import { fetchCommentsByArticleId } from '../../api/requests'

const CommentsList = () => {
   const [comments,setComments] = useState([])

   useEffect(() => {
     fetchCommentsByArticleId(2).then((comments) => {
       setComments(comments)
     })
   },[])


  return (
    <>
    {comments.map((comment) => {
      console.log(comment.comment_id,"<<<<<<<<<<<")
      return(
      <div className='comments-list' key={comment.comment_id}>
          <CommentCard comment= {comment} />
      </div> )
    })}
    
    </>
  )
}

export default CommentsList