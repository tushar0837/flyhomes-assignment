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

  validateAuthentication = () => {
    if (!auth.checkToken()) {
      this.props.history.push('/')
    }
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };
  render() {
    return (
      <HomeComponent
        validateAuthentication={this.validateAuthentication}
        handleNext={this.handleNext}
        handleBack={this.handleBack}
        handleReset={this.handleReset}
        state={this.state}
        props={this.props}
      />
    );
  }
}
export default Home;
