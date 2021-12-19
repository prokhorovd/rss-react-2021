import React from 'react';
import { render, screen } from '@testing-library/react';
import About from './About';

beforeEach(() => {
  render(<About />);
});

describe('About', () => {
  it('should contain \'about\' in h3 header', () => {
    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
  });
  it('should contain description', () => {
    expect(screen.getByText(/lorem ipsum/i)).toBeInTheDocument();
  });
});
