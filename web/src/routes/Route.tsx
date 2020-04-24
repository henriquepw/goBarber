import React from 'react';
import {
  Redirect,
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouterProps,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouterProps {
  isPrivete?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivete = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivete === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivete ? '/' : '/dashboard',
              // state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
