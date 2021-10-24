import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

function RenderNavigation(props) {
  const { routes } = props;
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

export default RenderNavigation;
