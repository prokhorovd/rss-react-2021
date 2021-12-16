import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ArticleBox from './ArticleBox';
import { testData, testSearchParameters} from '../__tests_mocks/test-mocks';

beforeEach(() => {
  render(
    <BrowserRouter>
      <ArticleBox
        data={testData}
        searchParams={testSearchParameters}
      />
    </BrowserRouter>,
  );
});

describe('ArticleBox component: ', () => {
  // screen.debug();
  it('shows data received from api', () => {
    // expect(screen.getByText(new RegExp(testData.author, 'i'))).toBeInTheDocument();
    expect(screen.getByText(testData.title, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(testData.source.name, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(testData.author, { exact: false })).toBeInTheDocument();
    // article text
    expect(screen.getByText(testData.content, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(testData.description, { exact: false })).toBeInTheDocument();
  });
  it('have date of publishing', () => {
    // published at
    const publicationDate = (new Date(testData.publishedAt)).toLocaleString();
    expect(screen.getByText(publicationDate, { exact: false })).toBeInTheDocument();
  });
  it('have correct link to source and source img', () => {
    // Read more link
    const link = screen.getByRole('link', { name: /read more/i }).getAttribute('href');
    expect(link).toBe(testData.url);
    expect(screen.getByRole('link', { name: /read more/i })).toBeInTheDocument();
    // img link
    const imgLink = screen.getByAltText('news').getAttribute('src');
    expect(imgLink).toBe(testData.urlToImage);
  });
  it('correctly generate output link for details component', () => {
    const idTransform = testData.url
      .split('')
      .filter((char) => (/:|\.|\/|%|-|\?/.test(char) ? '' : char))
      .join('');
    const detailsLinkSample = `/details?searchValue=${testSearchParameters.searchValue}&sortBy=${testSearchParameters.sortBy}&id=${idTransform}`;
    const detailsLink = screen.getByRole('link', { name: /Details/i }).getAttribute('href');
    expect(detailsLink).toBe(detailsLinkSample);
  });
});
