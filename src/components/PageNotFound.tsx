import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div>
      Page not found
      {' '}
      <Link to="/">Return to main page</Link>
    </div>
  );
}

export default PageNotFound;
