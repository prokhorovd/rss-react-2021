import React from 'react';

export interface ArticleInfo {
  title: string,
  author?: string,
  description?: string,
  url?: string,
  content?: string,
  publishedAt?: string,
  source?: {id: null | string, name: null | string}
  urlToImage?: string,
}

interface Props {
  data: ArticleInfo
}

function objFlatter(obj: {[index: string]:any}, prefix = ''): object {
  console.log(obj);
  const result: {[index: string]:any} = {};
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    if (typeof (obj[key]) === 'object' && !!obj[key]) {
      Object.assign(result, objFlatter(obj[key], `${key}-`));
    } else {
      const newKey = prefix + key;
      result[newKey] = obj[key];
    }
  });
  return result;
}

function Article(props: Props) {
  const { data } = props;
  const articleData = Object.entries(objFlatter(data));
  return (
    <div>
      Article details:
      {articleData.map((element) => {
        const propKey = element[0];
        const propValue = element[1];
        return (
          <p key={propKey}>
            {propKey}
            {' : '}
            {String(propValue)}
          </p>
        );
      })}
    </div>
  );
}

export default Article;
