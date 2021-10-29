import React, { FC } from 'react';
import { useLocation } from 'react-router';
import { Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import Details from '../Details';
import NotFoundPage from '../NotFoundPage';

interface RoutesListItem {
  path: string,
  name: string,
  Component: FC,
}

interface Props {
  routes: RoutesListItem[];
}

const RenderContent: FC<Props> = (props) => {
  const { routes } = props;
  const location = useLocation();
  const browserPath = location.pathname;
  if (browserPath.split('/')[1] === 'details') {
    return (
      <div>
        <b>Element details:</b>
        {'\n\n'}
        <Details />
      </div>
    );
  } if (browserPath !== '/' && browserPath !== '/about') {
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
};

export default RenderContent;
