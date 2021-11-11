import React, { FC } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

interface RoutesListItem {
  path: string,
  name: string,
}

const RenderNavigation: FC<RoutesListItem> = ({ path, name }) => {
  const location = useLocation();
  const browserPath = location.pathname;
  return (
    <li>
      <Link
        to={path}
        className={browserPath === path ? 'menu-link__active' : 'menu-link'}
      >
        {name}
      </Link>
    </li>
  );
};

export default RenderNavigation;
