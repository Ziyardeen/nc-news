import React, { useState,useEffect } from 'react'
import CommentCard from './CommentCard'
import { fetchCommentsByArticleId } from '../../api/requests'

const CommentsList = ({article_id}) => {
   const [comments,setComments] = useState([])
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
    setIsLoading(true)
     fetchCommentsByArticleId(article_id).then((comments) => {
       setComments(comments)
       setIsLoading(false)
     })
   },[])


  return (
    <>
    {isLoading ? <p>Loading......</p>: null}
    {comments.map((comment) => {
      
      return(
      <div className='comments-list' key={comment.comment_id}>
          <CommentCard comment= {comment} />
      </div> )
    })}
    
    </>
  )
}

export default CommentsList