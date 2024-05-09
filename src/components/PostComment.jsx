import React, { useEffect, useState } from 'react'
import { postCommentsById } from '../../api/requests'


const PostComment = ({article_id, article}) => {
    const [comment, setComment] = useState('')
    const name = article.author;


    const handleCommentInput= ({target})=>{
        setComment(target.value)
    }

    

    const handleSubmit = (e)=>{
        e.preventDefault()

        if(!comment){
            console.log("Enter post")
            return
        }
        postCommentsById(article_id,name,comment).then((data) => {
            setComment('')
          console.log(data)
        })



    }

    console.log(comment)
    console.log(name);





  return (
    <div className='post-comment-container'>
    <div>PostComment</div>
    <form className='comment-form' onSubmit={handleSubmit}>
        <textarea name="comment-body" id="comment-body" cols="30" rows="5" onChange={handleCommentInput}></textarea>
        <button type="submit">POST</button>
    </form>
    
    </div>

  )
}

export default PostComment