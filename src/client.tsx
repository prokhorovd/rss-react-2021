import * as React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import renderApp from './renderApp';

function run() {
  hydrate(
    (
      <BrowserRouter>
        { renderApp() }
      </BrowserRouter>
    ),

    document.getElementById('root'),
  );
}

run();
