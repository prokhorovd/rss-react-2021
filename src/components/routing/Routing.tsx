import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import News from '../News';
import About from '../About';
import RenderNavigation from './RenderNavigation';
import RenderContent from './RenderContent';

const routes = [
  { path: '/', name: 'News', Component: News },
  { path: '/about', name: 'About', Component: About },
];

function Routing() {
  return (
    <Router>
      <nav>
        <ul>
          {routes.map((routeElement) => {
            const { path, name } = routeElement;
            return <RenderNavigation key={path} path={path} name={name} />;
          })}
        </ul>
      </nav>
      <RenderContent routes={routes} />
    </Router>
  );
}

export default Routing;
