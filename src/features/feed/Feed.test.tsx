import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Feed from './Feed';
import { mockState } from '../../__tests_mocks/test-mocks';

jest.mock('react-redux', () => {
  const ActualReactRedux = jest.requireActual('react-redux');
  return {
    ...ActualReactRedux,
    useSelector: jest.fn().mockImplementation(() => mockState),
  };
});

describe('<Feed />', () => {
  it('should render text "Loading" if state value "isLoading" === true', () => {
    mockState.isLoading = true;
    render(<Feed />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
  it('should ask for search value if it was NOT provided', () => {
    mockState.isLoading = false;
    render(<Feed />);
    expect(screen.getByText(/please provide search value/i)).toBeInTheDocument();
  });
  it('should return not found if nothing was found', () => {
    mockState.searchValue = 'something';
    render(<Feed />);
    expect(screen.getByText(/Nothing found/i)).toBeInTheDocument();
  });
  it('should render articleboxes for articles', () => {
    mockState.searchValue = 'apple';
    mockState.isLoading = false;
    mockState.feed.totalResults = 1;
    render(
      <BrowserRouter>
        <Feed />
      </BrowserRouter>,
    );
    expect(screen.getByRole('heading', { name: /mercedes gets level 3/i })).toBeInTheDocument();
  });
});
