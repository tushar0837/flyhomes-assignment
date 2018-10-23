import React, { Component } from 'react';

import { auth } from '../../auth'
import HomeComponent from '../../components/home'


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeStep: 0,
    };
    this.validateAuthentication();
  }

  //validate the token otherwise push to the landing page 
  validateAuthentication = () => {
    if (!auth.checkToken()) {
      this.props.history.push('/')
    }
  }

  render() {
    return (
      <HomeComponent
        validateAuthentication={this.validateAuthentication}
        state={this.state}
        props={this.props}
      />
    );
  }
}
export default Home;
