import React from 'react';
import { useSelector } from 'react-redux';
import { selectFeedParameters } from './feedSlice';
import ArticleBox from '../../components/ArticleBox';
import { Article } from '../../types';

function Feed() {
  const feedParameters = useSelector(selectFeedParameters);
  const {
    searchValue,
    pageSize,
    sortBy,
    pageNum,
    isLoading,
  } = feedParameters;
  const { totalResults, articles } = feedParameters.feed;
  if (isLoading) {
    return (
      <div>
        Loading
      </div>
    );
  } if (totalResults === 0 && searchValue === '') {
    return (
      <div>
        Please provide search value
      </div>
    );
  } if (totalResults === 0) {
    return (
      <div>
        Nothing found on request &quot;
        { searchValue }
        &quot;
      </div>
    );
  }
  return (
    <div className="articles-field">
      {articles.map((element: Article) => (
        <ArticleBox
          key={element.url}
          data={element}
          searchParams={{
            searchValue,
            pageSize,
            sortBy,
            pageNum,
          }}
        />
      ))}
    </div>
  );
}

export default Feed;
