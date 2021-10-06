import React, { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react';
import { Article } from '../types';
import ArticleBox from './ArticleBox';

function News() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('publishedAt');
  const [pageNum, setPageNum] = useState<number>(1);

  const refreshPageContent = async () => {
    setIsLoading(true);
    try {
      // const apiKey = '00c5fceb74a64cee90041cb63724b62a';
      const apiKey = 'f1eca3f7183846eea73575a543a71641'; // disposable mail
      const address = `https://newsapi.org/v2/everything?q=${searchValue}`
        + `&from=2021-10-02&sortBy=${sortBy}&apiKey=${apiKey}`
        + `&pageSize=${pageSize}&page=${pageNum}`;
      const req = new Request(address);
      const result = await fetch(req)
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false);
          return data;
        });
      // console.log('result is: ', result.articles);
      setArticles(result.articles);
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>, name?: string, param?: string | number) => {
    const { type, value } = event.target;
    if (name === 'pageSize') {
      setPageSize(Number(param as number));
    } else if (name === 'sortBy') {
      setSortBy(param as string);
    } else if (type === 'text') {
      setSearchValue(value);
    }
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

  return (
    <div className="page-wrap">
      <form className="search-form" onSubmit={handleSubmit}>
        <label htmlFor="search">
          <input id="search" type="text" placeholder="I'm looking for..." value={searchValue} onChange={handleChange} disabled={isLoading} />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Search'}
        </button>
      </form>
      <div className="feed-controls">
        <div className="feed-controls__news-per-page">
          News per page:
          <label htmlFor="show10">
            10
            <input
              type="radio"
              id="show10"
              checked={pageSize === 10}
              onChange={(e) => handleChange(e, 'pageSize', 10)}
              disabled={isLoading}
            />
          </label>
          <label htmlFor="show20">
            20
            <input
              type="radio"
              id="show20"
              checked={pageSize === 20}
              onChange={(e) => handleChange(e, 'pageSize', 20)}
              disabled={isLoading}
            />
          </label>
          <label htmlFor="show50">
            50
            <input
              type="radio"
              id="show50"
              checked={pageSize === 50}
              onChange={(e) => handleChange(e, 'pageSize', 50)}
              disabled={isLoading}
            />
          </label>
        </div>
        <div className="feed-controls__sorting">
          Sort news by:
          <label htmlFor="publishedAt">
            Date
            <input
              type="radio"
              id="publishedAt"
              checked={sortBy === 'publishedAt'}
              onChange={(e) => handleChange(e, 'sortBy', 'publishedAt')}
              disabled={isLoading}
            />
          </label>
          <label htmlFor="relevancy">
            Relevancy
            <input
              type="radio"
              id="relevancy"
              checked={sortBy === 'relevancy'}
              onChange={(e) => handleChange(e, 'sortBy', 'relevancy')}
              disabled={isLoading}
            />
          </label>
          <label htmlFor="popularity">
            Popularity
            <input
              type="radio"
              id="popularity"
              checked={sortBy === 'popularity'}
              onChange={(e) => handleChange(e, 'sortBy', 'popularity')}
            />
          </label>
        </div>
        <div className="feed-controls__pagination">
          <p className="feed-controls__pageNumber">
            Page:
            {pageNum}
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
        {articles.map((element) => <ArticleBox key={element.url} data={element} />)}
      </div>
    </div>
  );
}

export default News;
