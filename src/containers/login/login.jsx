import React, { Component } from 'react';
import './login.css';
import { API } from '../../api_path_constants'
import { Button } from '@material-ui/core';
import { auth } from '../../auth';

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: "",
      remember_me: 1
    }
  }
  handleChange = (type, event) => {
    this.setState({[type]: event.target.value})
  }
  validateForm = () =>{
    return true
  }
  login = () => {
    if(this.validateForm()){
      // fetch('http://localhost:3000/users/sign_in', {
      // method: 'POST',
      // body: JSON.stringify({"user": this.state}),
      // headers: {
      //   "Content-Type": "application/json; charset=utf-8",
      // }
      // }).then(res => res.json())
      // .then(response => console.log('Success:', JSON.stringify(response)))
      // .catch(error => console.error('Error:', error));
      // backend.poke("login", {
      //     bodyData: JSON.stringify({"user": this.state}),
      //     success_callback: (response) => {
      //       console.log(response)
      //     },
      //     failure_callback: (response) => {
      //       console.log(response)
      //     }
      //   }
      // )
      API.createRequest('users', 'login')(this.state.email, this.state.password).then(res => 
        res.json()).then(response => {
          auth.setUserData(response);
          window.localStorage.setItem("authentication_token", response.authentication_token).then(
            res => {
              this.props.history.push('/home')
            }
          )
          API.token = response.token
          API.user.email = response.email
          API.user.id = response.id
         })
    }
  }
  render() {
    return (
      <div className="login">
        Welcome Back <br/>
        email:<input type="email" onChange={(event) => this.handleChange("email", event)} value={this.state.email} /> <br/>
        password:<input type="password" onChange={(event) => this.handleChange("password", event)} value={this.state.password} /> <br/>
        <Button variant="outlined" onClick={this.login}>Login</Button>
      </div>
    );
  }
}

export default Login;
