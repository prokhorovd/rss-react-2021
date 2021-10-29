import React, {
  ChangeEvent, MouseEventHandler, useCallback, useEffect, useState,
} from 'react';
import { Article } from '../types';
import ArticleBox from './ArticleBox';
import { pageSizeInputs, sortByInputs } from '../data';
import loadDataFromApi from '../helpers';

function News() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchFieldValue, setSearchFieldValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchResultsCounter, setSearchResultsCounter] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('publishedAt');
  const [pageNum, setPageNum] = useState<number>(1);
  const [resultPages, setResultPages] = useState<number>(0);

  const updatePageContent = useCallback(async () => {
    setIsLoading(true);
    const data = await loadDataFromApi({
      searchValue,
      pageNum,
      pageSize,
      sortBy,
    });
    setArticles(data.articles);
    setSearchResultsCounter(data.totalResults);
    setResultPages(Math.floor(data.totalResults / pageSize));
    setIsLoading(false);
  }, [searchValue, pageNum, pageSize, sortBy]);

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPageNum(1);
    setSearchValue(searchFieldValue);
    await updatePageContent();
  };

  const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchFieldValue(value);
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
      await updatePageContent();
    } else if (name === 'next') {
      setPageNum((currentPageNumber) => currentPageNumber + 1);
      await updatePageContent();
    }
  };

  useEffect(() => {
    updatePageContent();
  }, [updatePageContent]);

  type InputParams = {
    inputID: string,
    inputName: string,
    inputValue: string | number,
    stateValue: string | number,
    handlerFunction,
  };

  const renderPageSizeInput = (params: InputParams) => {
    const {
      inputID,
      inputName,
      inputValue,
      stateValue,
      handlerFunction,
    } = params;
    return (
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
  };

  return (
    <div className="page-wrap">
      <form className="search-form" onSubmit={handleSubmit}>
        <label htmlFor="search">
          <input
            id="search"
            type="text"
            placeholder="I'm looking for..."
            value={searchFieldValue}
            onChange={handleSearchValueChange}
            disabled={isLoading}
          />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Search'}
        </button>
      </form>
      <div className="feed-controls">
        <div className="feed-controls__news-per-page">
          News per page:
          {pageSizeInputs.map((element) => {
            const params = {
              inputID: element.inputID,
              inputName: element.inputName,
              inputValue: element.inputValue,
              stateName: 'pageSize',
              stateValue: pageSize,
              handlerFunction: handlePageSizeChange,
            };
            return renderPageSizeInput(params);
          })}
        </div>
        <div className="feed-controls__sorting">
          Sort news by:
          {sortByInputs.map((element) => {
            const params = {
              inputID: element.inputID,
              inputName: element.inputName,
              inputValue: element.inputValue,
              stateName: 'sortBy',
              stateValue: sortBy,
              handlerFunction: handleSortByChange,
            };
            return renderPageSizeInput(params);
          })}
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
            disabled={
              articles === undefined
              || articles.length === 0
              || articles.length === 1
              || searchResultsCounter === 0
              || isLoading
            }
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
            totalResults={searchResultsCounter}
            searchParams={{
              searchValue,
              pageSize,
              sortBy,
              pageNum,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default News;
