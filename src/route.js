import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Home from './containers/home/home';
import Error from './containers/error/error';
import Landing from './containers/landing/landing';
import Home from './containers/home/home';
import NavbarContainer from './containers/navbar/navbar';
import { auth } from './auth'
import home from './containers/home/home';
import landing from './containers/landing/landing';
import Login from './containers/login/login';
import signup from './containers/signup/signup';
import { PrivateRoute } from './components/privateRoute';


export default class RouterContainer extends Component {
  render() {
    const IndexComponent = auth.checkToken() ? Home : Landing
    return (
      <Router>
        <div>
          <NavbarContainer />
          <Switch>
            <Route exact path="/" component={IndexComponent}/>
            <PrivateRoute path="/home" component={home} />     
            <Route path="/landing" component={landing} />     
            <Route path="/login" component={Login} />     
            <Route path="/signup" component={signup} />     
            <Route component={Error} />
          </Switch>
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}
