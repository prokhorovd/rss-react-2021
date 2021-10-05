import React from 'react';
import { Article } from '../types';

function ArticleBox(props: { data: Article }) {
  const { data } = props;
  const {
    author,
    url,
    description,
    publishedAt,
    source,
    title,
    urlToImage,
  } = data;
  const date = new Date(publishedAt);
  return (
    <div className="article">
      <h3>{title}</h3>
      <p className="article__source">
        {source.name}
        <span style={{ fontStyle: 'italic' }}>, article by </span>
        {author}
      </p>
      <p>{date.toLocaleString()}</p>
      <p className="article__content">
        {description}
        <span>
          <a href={url}> Read more</a>
        </span>
      </p>
      <img className="article__img" src={urlToImage} alt="news" />
    </div>
  );
}

export default ArticleBox;
