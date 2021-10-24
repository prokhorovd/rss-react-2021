import React from 'react';
import { useLocation } from 'react-router';
import { Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Details from '../Details';
import NotFoundPage from '../NotFoundPage';

function RenderContent(props) {
  const { routes } = props;
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
        <NotFoundPage />
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

export default RenderContent;
