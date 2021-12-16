import React, {
  ChangeEvent, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pageSizeInputs, sortByInputs } from '../data';
import {
  selectFeedParameters,
  setPageSize,
  setSortBy,
  setPageNum,
  setSearchValue,
  requestFeedFromAPI,
} from '../features/feed/feedSlice';
import Feed from '../features/feed/Feed';

function News() {
  const feedParameters = useSelector(selectFeedParameters);
  const dispatch = useDispatch();
  const [searchFieldValue, setSearchFieldValue] = useState<string>('');

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setSearchValue(searchFieldValue));
    dispatch(setPageNum(1));
    const linkArgs = {
      ...feedParameters,
      searchValue: searchFieldValue,
      pageNum: 1,
    };
    dispatch(requestFeedFromAPI(linkArgs));
  };

  const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchFieldValue(value);
  };

  const handlePageSizeChange = (value: number) => {
    dispatch(setPageSize(value));
    dispatch(setPageNum(1));
    const linkArgs = {
      ...feedParameters,
      pageSize: value,
      pageNum: 1,
    };
    dispatch(requestFeedFromAPI(linkArgs));
  };

  const handleSortByChange = (value: string) => {
    dispatch(setSortBy(value));
    dispatch(setPageNum(1));
    const linkArgs = {
      ...feedParameters,
      sortBy: value,
      pageNum: 1,
    };
    dispatch(requestFeedFromAPI(linkArgs));
  };

  const handleClickPrevPage = async () => {
    const newPageNum = feedParameters.pageNum - 1;
    dispatch(setPageNum(newPageNum));
    const linkArgs = {
      ...feedParameters,
      pageNum: newPageNum,
    };
    dispatch(requestFeedFromAPI(linkArgs));
  };

  const handleClickNextPage = async () => {
    const newPageNum = feedParameters.pageNum + 1;
    dispatch(setPageNum(newPageNum));
    const linkArgs = {
      ...feedParameters,
      pageNum: newPageNum,
    };
    dispatch(requestFeedFromAPI(linkArgs));
  };

  interface InputParams {
    inputID: string,
    inputName: string,
    inputValue: string | number,
    stateValue: string | number,
    handlerFunction: Function,
  }

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
          disabled={feedParameters.isLoading}
        />
      </label>
    );
  };

  return (
    <div className="page-wrap">
      <h3>News search</h3>
      <form className="search-form" onSubmit={handleSubmit}>
        <label htmlFor="search">
          <input
            id="search"
            type="text"
            placeholder="I'm looking for..."
            value={searchFieldValue}
            onChange={handleSearchValueChange}
            disabled={feedParameters.isLoading}
          />
        </label>
        <button type="submit" disabled={feedParameters.isLoading}>
          {feedParameters.isLoading ? 'Loading...' : 'Search'}
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
              stateValue: feedParameters.pageSize,
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
              stateValue: feedParameters.sortBy,
              handlerFunction: handleSortByChange,
            };
            return renderPageSizeInput(params);
          })}
        </div>
        <div className="feed-controls__pagination">
          <p className="feed-controls__pageNumber">
            Page:
            {feedParameters.pageNum}
            {feedParameters.feed.totalResults === 0 ? '' : (<span> of </span>)}
            {feedParameters.feed.totalResults === 0 ? '' : (Math.floor(feedParameters.feed.totalResults / feedParameters.pageSize))}
          </p>
          <button
            type="button"
            onClick={handleClickPrevPage}
            name="prev"
            disabled={feedParameters.pageNum === 1 || feedParameters.isLoading}
          >
            Previous page
          </button>
          <button
            type="button"
            onClick={handleClickNextPage}
            name="next"
            disabled={
              !feedParameters.feed.articles
              || feedParameters.feed.articles.length === 0
              || feedParameters.feed.articles.length === 1
              || feedParameters.totalResults === 0
              || feedParameters.isLoading
            }
          >
            Next page
          </button>
        </div>
      </div>
      <Feed />
    </div>
  );
}

export default News;
