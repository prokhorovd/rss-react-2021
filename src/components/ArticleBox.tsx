import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Article, SearchParams } from '../types';

interface Props {
  data: Article,
  searchParams: SearchParams,
  totalResults: number,
}

const ArticleBox: FC<Props> = ({ data, searchParams, totalResults }) => {
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
    .filter((char) => (/:|\.|\/|%|-|\?/.test(char) ? '' : char))
    .join('');
  if ((!!searchValue || source.name === 'snf') && totalResults === 0) {
    return (
      <div className="article">
        <p>please provide search value!!</p>
      </div>
    );
  }
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
      <Link to={`/details?searchValue=${searchValue}&sortBy=${sortBy}&id=${id}`}>Details</Link>
    </div>
  );
}

export default ArticleBox;
