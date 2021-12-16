import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import NotFoundPage from './NotFoundPage';
import News from './News';

import store from '../app/store';

beforeEach(() => {
  render(
    <BrowserRouter>
      <NotFoundPage />
    </BrowserRouter>,
  );
});

describe('<NotFoundPage />:', () => {
  it('should contain \'Page not found\' text', () => {
    expect(screen.getByText(/page not found/i, { exact: false })).toBeInTheDocument();
  });
  it('should contain link to main page', () => {
    expect(screen.getByTestId('link-to-main-page')).toBeInTheDocument();
    expect(screen.getByTestId('link-to-main-page').getAttribute('href')).toBe('/');
  });
  it('should route to main page on click', () => {
    const history = createMemoryHistory();
    const route = '/';
    history.push(route);
    render(
      <Provider store={store}>
        <Router history={history}>
          <News />
        </Router>
      </Provider>,
    );
    expect(screen.getByRole('heading', { name: /news search/i })).toBeInTheDocument();
  });
});
