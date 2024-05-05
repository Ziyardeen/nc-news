import React from 'react'

const ArticleCard = ({article}) => {
 
  return (
    <>
    <div className="article-card">
        <h2 className="article-title">{article.title}</h2>
        <p className="article-meta">
            <span className="article-topic">{article.topic}</span> {article.author} {article.created_at}
        </p>
        <img src={article.article_img_url} alt="User Image"/>
        <p className="article-body">{article.body}</p>
        <div className="article-footer">
            <span className="votes">{article.votes} Votes </span>
            <span className="comments"> {article.comment_count} comments</span>
        </div>
     </div>
    </>

  )
}

export default ArticleCard