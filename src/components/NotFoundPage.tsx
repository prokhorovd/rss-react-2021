import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div>
      Page not found
      {' '}
      <Link to="/">Return to main page</Link>
    </div>
  );
}

export default NotFoundPage;
