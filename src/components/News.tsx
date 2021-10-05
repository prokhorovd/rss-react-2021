import React, { ChangeEvent, MouseEventHandler, useState } from 'react';
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
    await refreshPageContent();
  };

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { name, type, value } = event.target;
    if (name === 'pageSize') {
      setPageSize(Number(value));
      // await refreshPageContent();
    } else if (name === 'sortBy') {
      setSortBy(value);
      // await refreshPageContent();
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

  function generateID(date) {
    // const idNum = Math.floor(Math.random() * 1000000 + 1);
    const idNum = Date.parse(date);
    // console.log('generated id: ', idNum);
    return idNum;
  }

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
              name="pageSize"
              value={10}
              checked={pageSize === 10}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="show20">
            20
            <input
              type="radio"
              id="show20"
              name="pageSize"
              value={20}
              checked={pageSize === 20}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="show50">
            50
            <input
              type="radio"
              id="show50"
              name="pageSize"
              value={50}
              checked={pageSize === 50}
              onChange={handleChange}
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
              name="sortBy"
              value="publishedAt"
              checked={sortBy === 'publishedAt'}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="relevancy">
            Relevancy
            <input
              type="radio"
              id="relevancy"
              name="sortBy"
              value="relevancy"
              checked={sortBy === 'relevancy'}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="popularity">
            Popularity
            <input
              type="radio"
              id="popularity"
              name="sortBy"
              value="popularity"
              checked={sortBy === 'popularity'}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="feed-controls__pagination">
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
        {articles.map((element) => <ArticleBox key={generateID(element.publishedAt)} data={element} />)}
      </div>
    </div>
  );
}

export default News;
