import React from 'react'

import { Route, Redirect } from 'react-router-dom';
import { auth } from '../auth';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      auth.checkToken() === true
        ? <Component {...props} />
        : <Redirect to='/landing' />
    )} />
  )