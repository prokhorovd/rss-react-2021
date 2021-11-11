import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router';
import loadDataFromApi, { Args } from '../helpers';
import Article, { ArticleInfo } from './Article';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

interface ArticleItem1 {
  title: string,
  author: string,
  description: string,
  url: string,
  content: string,
  publishedAt: string,
  source: {id: null | string, name: null | string}
  urlToImage: string,
}

// function return article object or object with title prop = 'not found';
const findArticle = (articles: ArticleItem1[], articleId: string | undefined | null) => {
  const filteredArticles = articles.filter((article) => {
    // transform url to id
    const id = article.url
      .split('')
      .filter((symbol: string) => (/:|\.|\/|%|-|\?/.test(symbol) ? '' : symbol))
      .join('');
    // check for match
    if (id === articleId) {
      return article;
    }
    return false;
  });
  if (!filteredArticles.length) {
    return { title: 'Not found' };
  }
  return filteredArticles[0];
};

function Details() {
  const [result, setResult] = useState<ArticleInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // get params from link
  const query = useQuery();
  const linkParams: Args = {
    searchValue: query.get('searchValue'),
    sortBy: query.get('sortBy'),
    id: query.get('id'),
  };
  // request news and look for match
  const getResult = async () => {
    // get last 100 news from api
    const data = await loadDataFromApi(linkParams);
    // filter articles
    const filteredArticle = findArticle(data.articles, linkParams.id);
    setResult(filteredArticle);
    setIsLoading(false);
  };
  if (!result) {
    getResult();
  }
  if (!!result && result.title === 'Not found') {
    return (
      <div>
        Not found
      </div>
    );
  }
  return (
    <div>
      {isLoading ? 'Loading...' : <Article data={result} />}
    </div>
  );
}

export default Details;
