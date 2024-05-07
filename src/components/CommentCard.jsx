import React from 'react'


const CommentCard = ({comment}) => {
  return (
    <>
    <div>Comment</div>
    <div className="comment">
      <p className="comment-body">{comment.body}</p>
      <div className="comment-info">
        <span>Votes: {comment.votes}</span>
        <span>Author: {comment.author}</span>
      </div>
    </div>
    </>
  )
}

export default CommentCard