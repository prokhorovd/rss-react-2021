import React from 'react';
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
    <div>
      <nav>
        <ul>
          {routes.map(({ path, name }) => (
            <RenderNavigation key={path} path={path} name={name} />))}
        </ul>
      </nav>
      <RenderContent routes={routes} />
    </div>
  );
}

export default Routing;
