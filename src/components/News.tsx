import React, {
  ChangeEvent, MouseEventHandler, useEffect, useState,
} from 'react';
import { Article } from '../types';
import ArticleBox from './ArticleBox';
import { pageSizeInputs, sortByInputs, apiKey } from '../data';

function News() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('publishedAt');
  const [pageNum, setPageNum] = useState<number>(1);
  const [resultPages, setResultPages] = useState<number>(0);

  const refreshPageContent = async () => {
    setIsLoading(true);
    try {
      const address = `https://newsapi.org/v2/everything?q=${searchValue}`
        + `&from=2021-10-02&sortBy=${sortBy}&apiKey=${apiKey}`
        + `&pageSize=${pageSize}&page=${pageNum}`;
      const req = new Request(address);
      const result = await fetch(req);
      const data = await result.json();
      setArticles(data.articles);
      setResultPages(Math.floor(data.totalResults / pageSize));
    } catch (e) {
      console.error('error has occurred: ', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPageNum(1);
    await refreshPageContent();
  };

  const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
  };

  const handleSortByChange = (value: string) => {
    setSortBy(value);
  };

  const handleClick = async (event: MouseEventHandler<HTMLButtonElement>) => {
    const { name } = event.target;
    if (name === 'prev') {
      setPageNum((currentPageNumber) => currentPageNumber - 1);
      await refreshPageContent();
    } else if (name === 'next') {
      setPageNum((currentPageNumber) => currentPageNumber + 1);
      await refreshPageContent();
    }
  };

  useEffect(() => {
    if (searchValue !== '') {
      refreshPageContent();
    }
  }, [pageNum, pageSize, sortBy]);

  const renderPageSizeInput = (
    inputID: string,
    inputName: string,
    inputValue: string | number,
    stateName: string,
    stateValue: string | number,
    handlerFunction, // : HandlePageSizeChange | HandleSortByChange,
  ) => (
    <label htmlFor={inputID} key={inputValue}>
      {inputName}
      <input
        type="radio"
        id={inputID}
        checked={stateValue === inputValue}
        onChange={() => handlerFunction(inputValue)}
        disabled={isLoading}
      />
    </label>
  );

  return (
    <div className="page-wrap">
      <form className="search-form" onSubmit={handleSubmit}>
        <label htmlFor="search">
          <input id="search" type="text" placeholder="I'm looking for..." value={searchValue} onChange={handleSearchValueChange} disabled={isLoading} />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Search'}
        </button>
      </form>
      <div className="feed-controls">
        <div className="feed-controls__news-per-page">
          News per page:
          {pageSizeInputs.map((element) => renderPageSizeInput(
            element.inputID,
            element.inputName,
            element.inputValue,
            'pageSize',
            pageSize,
            handlePageSizeChange,
          ))}
        </div>
        <div className="feed-controls__sorting">
          Sort news by:
          {sortByInputs.map((element) => renderPageSizeInput(
            element.inputID,
            element.inputName,
            element.inputValue,
            'sortBy',
            sortBy,
            handleSortByChange,
          ))}
        </div>
        <div className="feed-controls__pagination">
          <p className="feed-controls__pageNumber">
            Page:
            {pageNum}
            {resultPages === 0 ? '' : (<span> of </span>)}
            {resultPages === 0 ? '' : (resultPages)}
          </p>
          <button
            onClick={handleClick}
            name="prev"
            disabled={pageNum === 1 || isLoading}
          >
            Previous page
          </button>
          <button
            onClick={handleClick}
            name="next"
            disabled={articles === undefined || articles.length === 0 || isLoading}
          >
            Next page
          </button>
        </div>
      </div>
      <div className="articles-field">
        {articles.map((element) => (
          <ArticleBox
            key={element.url}
            data={element}
            searchParams={{
              searchValue,
              pageSize,
              sortBy,
              pageNum,
            }}
          />))}
      </div>
    </div>
  );
}

export default News;
