import React, { Component } from 'react';

import { API } from '../../api_path_constants'
import { auth } from '../../auth';
import LandingComponent from '../../components/landing'


class Landing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      remember_me: 0,
      error: "",
      snackOpen: false
    }
  }

  handleChange = (type, event) => {
    this.setState({ [type]: event.target.value })
  }
  validateForm = () => {
    let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailPattern.test(String(this.state.email).toLowerCase())) {
      this.setState({ error: "Please enter a valid email" })
      return false
    } else if (this.state.password.length <= 5) {
      this.setState({ error: "Please enter a valid password" })
      return false
    }
    return true
  }
  login = () => {
    if (this.validateForm()) {
      API.createRequest('users', 'login')(this.state.email, this.state.password).then(res =>
        res.json()).then(response => {
          if (response.error) {
            this.setState({ error: response.error, snackOpen: true })
          } else {
            auth.setUserData(response);
            window.localStorage.setItem("authentication_token", response.authentication_token)
            this.props.history.push('/home', { user: response })
          }
        })
    } else {
      this.setState({ snackOpen: true })
    }
  }

  handleClose = () => {
    this.setState({ snackOpen: false });
  };

  render() {
    return (
      <LandingComponent
        handleClose={this.handleClose}
        login={this.login}
        validateForm={this.validateForm}
        handleChange={this.handleChange}
        state={this.state}
        prop={this.props}
      />
    );
  }
}

export default Landing;
