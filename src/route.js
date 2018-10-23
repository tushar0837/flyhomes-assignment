import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Error from './components/error';
import Landing from './containers/landing/landing';
import Home from './containers/home/home';
import NavbarContainer from './containers/navbar/navbar';
import { auth } from './auth'
import home from './containers/home/home';
import landing from './containers/landing/landing';
import signup from './containers/signup/signup';
import survey from './containers/newSurvey/newSurvey';
import { PrivateRoute } from './components/privateRoute';
import surveyList from './containers/surveyList/surveyList';
import viewSurvey from './containers/viewSurvey/viewSurvey';


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
            <Route path="/signup" component={signup} />     
            <PrivateRoute path="/survey" component={survey} />     
            <PrivateRoute exact path="/surveyList" component={surveyList} />     
            <PrivateRoute exact path="/surveyList/:id" component={viewSurvey} />     
            <Route component={Error} />
          </Switch>
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}
