import React from 'react';
import { Link } from 'react-router-dom';
import { Article, SearchParams } from '../types';

function ArticleBox(props: { data: Article, searchParams: SearchParams }) {
  const { data, searchParams } = props;
  const {
    author,
    url,
    description,
    publishedAt,
    source,
    title,
    urlToImage,
  } = data;
  const {
    searchValue,
    sortBy,
  } = searchParams;
  const date = new Date(publishedAt);
  const id = url
    .split('')
    .filter((char) => /:|\.|\/|%|-|\?/.test(char) ? '' : char)
    .join('');
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
      <Link to={`/details/searchValue=${searchValue}&sortBy=${sortBy}&id=${id}`}>Details</Link>
    </div>
  );
}

export default ArticleBox;
