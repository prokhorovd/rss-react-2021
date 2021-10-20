import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import { useLocation } from 'react-router';
import { CSSTransition } from 'react-transition-group';
import News from './News';
import About from './About';
import Page404 from './Page404';
import Details from './Details';

const routes = [
  { path: '/', name: 'News', Component: News },
  { path: '/about', name: 'About', Component: About },
];

function RenderNavigation() {
  const location = useLocation();
  const path = location.pathname;
  return (
    <nav>
      {routes.map((route) => (
        <ul key={route.path}>
          <li>
            <Link
              to={route.path}
              className={path === route.path ? 'menu-link__active' : 'menu-link'}
            >
              {route.name}
            </Link>
          </li>
        </ul>
      ))}
    </nav>
  );
}

function RenderContent() {
  const location = useLocation();
  if (location.pathname.split('/')[1] === 'details') {
    return (
      <div>
        <b>Element details:</b>
        {'\n\n'}
        <Details />
      </div>
    );
  } if (location.pathname !== '/' && location.pathname !== '/about') {
    return (
      <div>
        <Page404 />
      </div>
    );
  }
  return (
    routes.map(({ path, Component }) => (
      <Route key={path} exact path={path}>
        {({ match }) => (
          <CSSTransition
            in={match != null}
            timeout={300}
            classNames="page"
            unmountOnExit
          >
            <div className="page">
              <Component />
            </div>
          </CSSTransition>
        )}
      </Route>
    ))
  );
}

function Header() {
  return (
    <Router>
      <nav>
        <RenderNavigation />
      </nav>
      <RenderContent />
    </Router>
  );
}

export default Header;
