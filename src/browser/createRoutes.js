import App from './app/App.react';
import Auth from './auth/Page.react';
import Home from './home/Page.react';
import Intl from './intl/Page.react';
import NotFound from './notfound/Page.react';
import React from 'react';
import Todos from './todos/Page.react';
import { IndexRoute, Route } from 'react-router';

export default function createRoutes(getState) {
  const requireAuth = (nextState, replace) => {
    const loggedInUser = getState().users ? getState().users.viewer : null;
    if (!loggedInUser) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
  };

  return (
    <Route component={App} path="/">
      <IndexRoute component={Home} />
      <Route component={Auth} path="login" />
      <Route component={Intl} path="intl" onEnter={requireAuth} />
      <Route component={Todos} path="todos" />
      <Route component={NotFound} path="*" />
    </Route>
  );
}
