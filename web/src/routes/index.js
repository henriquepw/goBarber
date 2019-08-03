import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/signIn';
import SignUp from '../pages/signUp';

import Dashboard from '../pages/dashboard';
import Profile from '../pages/profile';

export default () => (
  <Switch>
    <Route path='/' component={SignIn} exact />
    <Route path='/register' component={SignUp} />

    <Route path='/dashboard' component={Dashboard} isPrivate />
    <Route path='/profile' component={Profile} isPrivate />

    <Route path='/' component={() => <h1>404</h1>} />
  </Switch>
);
