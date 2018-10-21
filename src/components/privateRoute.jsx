import React from 'react'
import { auth } from '../auth';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      auth.checkToken() === true
        ? <Component {...props} />
        : <Redirect to='/landing' />
    )} />
  )