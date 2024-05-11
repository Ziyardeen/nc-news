import React from 'react'
import { useNavigate } from 'react-router-dom'


const ArticleCard = ({article}) => {
  const navigate = useNavigate()

  const handleClick = ()=>{
    navigate(`/articles/${article.article_id}`)
  }

  
  
 
  return (

    <div className="article-card" id={article.article_id} onClick={handleClick}>
      <div className='article-container'>

          <img className="article-image" src={article.article_img_url} alt="User Image"/>
          <div className='article-cont' >
            <h2 className="article-title">{article.title}</h2>
            <p className="article-meta">
                <span className="article-topic">{article.topic}</span> <span className='article-author'>{article.author}</span> <span className='article-date'>{article.created_at}</span>
            </p>
          </div>
          
      </div>
     </div>
  )
}

export default ArticleCard