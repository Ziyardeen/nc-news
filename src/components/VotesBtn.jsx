import React, { useEffect } from 'react'
import { useState } from 'react'
import { updateVotesById } from '../../api/requests'

const VotesBtn = ({article_id,currentArticle}) => {

  const [upVoted, setUpVoted] = useState(false)
  const [downVoted, setDownVoted] = useState(false)
  const [article,setArticle] = useState(currentArticle)
 


  
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
     }).catch(console.log)

   }
    
////////////////////
    const handleDownVote = ()=>{
      setUpVoted(false)
      setDownVoted(true)
//  optimistically render downvote
      setArticle((prevArticle) => ({
        ...prevArticle,
        votes: prevArticle.votes + 1,
      }))


      updateVotesById(article.article_id,-1).then((data) => {
        console.log("patch successful......")
      })
  
    }

 

  return (
    <div className='vote-container'>
          <span className="votes">{article.votes} Votes </span>
          <button className={`vote-up-btn ${upVoted ? 'active' : ''}`} onClick={handleUpVote}>⬆️</button>
          <button className={`vote-down-btn ${downVoted ? 'active' : ''}`} onClick={handleDownVote}>⬇️</button>
    </div>
    
  )
}

export default VotesBtn