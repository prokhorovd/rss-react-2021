import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import loadDataFromApi from '../helpers';

// function return article object or object with title prop = 'not found';
const findArticle = (articles, articleId) => {
  const filteredArticles = articles.filter((article) => {
    // transform url to id
    const id = article.url
      .split('')
      .filter((symbol: string) => /:|\.|\/|%|-|\?/.test(symbol) ? '' : symbol)
      .join('');
    // check for match
    if (id === articleId) {
      return article;
    }
  });
  if (filteredArticles.length === 0) {
    return { title: 'Not found' };
  }
  return filteredArticles[0];
};

function RenderArticleData(props) {
  const { data } = props;
  const key = data[0];
  let value = '';
  if (typeof data[1] === 'string') {
    value = data[1].toString();
  } else if (typeof data[1] === 'object' && data[1] !== null) {
    value = data[1].name;
  } else {
    value = 'null';
  }
  return (
    <div>
      <b>
        {key}
        {': '}
      </b>
      {value}
    </div>
  );
}

function Details() {
  const [result, setResult] = useState({ title: 'Loading...' });
  // disassemble link and get params
  const location = useLocation();
  const path = location.pathname;
  const linkParamsStr = path.split('/')[2];
  const linkParamsObj = {
    searchValue: '',
    pageSize: 100,
    sortBy: 'publishedAt',
    id: '',
  };
  linkParamsStr.split('&').map((param) => {
    const key = param.split('=')[0];
    const value = param.split('=')[1];
    linkParamsObj[key] = value;
  });
  // get articles, found match, render info
  const getResult = async () => {
    // get last 100 news from api
    const data = await loadDataFromApi(linkParamsObj);
    // filter articles
    const filteredArticle = findArticle(data.articles, linkParamsObj.id);
    setResult(filteredArticle);
  };
  // useEffect to refresh result
  useEffect(() => {
    if (result.title === 'Loading...') {
      getResult();
    }
  }, []);
  const articleData = Object.entries(result);
  return (
    <div>
      {articleData.map((element) => {
        return (
          <RenderArticleData key={element[1]} data={element} />
        );
      })}
    </div>
  );
}

export default Details;
