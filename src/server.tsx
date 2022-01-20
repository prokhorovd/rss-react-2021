import express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';

import React from 'react';
import renderTemplate from './renderTemplate';
import renderApp from './renderApp';

const app = express();

app.use(express.static('build'));

app.get('*', async (req, res) => {
  const context = {};

  const content = renderToString(
    <StaticRouter location={req.url} context={context}>
      { renderApp() }
    </StaticRouter>,
  );

  res.send(
    renderTemplate({
      cssPath: 'main.css',
      jsPath: 'main.js',
      content,
    }),
  );
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server is listening on port: 3000');
});
