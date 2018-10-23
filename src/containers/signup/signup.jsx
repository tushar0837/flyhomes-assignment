import React, { Component } from 'react';

import { auth } from '../../auth';
import { API } from '../../api_path_constants'
import SignupComponent from '../../components/signup'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      snackOpen: false,
      error: ""
    }
  }
  //hanldes change in text fields
  handleChange = (type, event) => {
    this.setState({ [type]: event.target.value })
  }

  //validates the signup form and signup
  validateForm = () => {
    let emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailPattern.test(String(this.state.email).toLowerCase())) {
      this.setState({ error: "Please enter a valid email" })
      return false
    } else if (this.state.password.length <= 5) {
      this.setState({ error: "Password must be more than 5 digits" })
      return false
    } else if (this.state.password !== this.state.password_confirmation) {
      this.setState({ error: "Passord and Confirmation password must be same" })
      return false
    }
    return true
  }
  signup = () => {
    if (this.validateForm()) {
      API.createRequest('users', 'sign_up')(this.state.email, this.state.password, this.state.password_confirmation).then(res =>
        res.json()).then(response => {
          if (response.errors) {
            this.setState({ error: "Email is already registered", snackOpen: true })
            return;
          }
          auth.setUserData(response);
          window.localStorage.setItem("authentication_token", response.authentication_token)
          this.props.history.push('/home')
        })
    } else {
      this.setState({ snackOpen: true })
    }
  }
  render() {
    return (
      <SignupComponent
        signup={this.signup}
        validateForm={this.validateForm}
        handleChange={this.handleChange}
        email={this.state.email}
        password={this.state.password}
        password_confirmation={this.state.password_confirmation}
        snackOpen={this.state.snackOpen}
        error={this.state.error}
      />
    );
  }
}


export default Signup;
