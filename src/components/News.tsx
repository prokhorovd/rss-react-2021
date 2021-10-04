import React, { ChangeEvent, useState } from 'react';
import { Article } from '../types';
import ArticleBox from './ArticleBox';

function News() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('publishedAt');
  const [pageNum, setPageNum] = useState<number>(1);

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const apiKey = '00c5fceb74a64cee90041cb63724b62a';
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
      setArticles(result.articles);
      // console.log('data is set');
    } catch (e) {
      console.error('error has occurred: ', e);
      // setIsLoading(false);
    } finally {
      console.log('finally');
      setIsLoading(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  function generateID() {
    const idNum = Math.floor(Math.random() * 1000000 + 1);
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
      <div className="articles-field">
        {articles.map((element) => <ArticleBox key={generateID()} data={element} />)}
      </div>
    </div>
  );
}

export default News;
