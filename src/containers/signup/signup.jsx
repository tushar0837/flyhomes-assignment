import React, { Component } from 'react';
import './signup.css';  
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { API } from '../../api_path_constants'
import Snackbar from '@material-ui/core/Snackbar';

const styles = {
  card: {
    maxWidth: "50%",
    height: "500px",
    display: "flex",
    flexDirection: "row",
    flex: 1
  },
  media: {
    height: 140,
  },
  landingContainer:{
    width: "100%",
    height: "100%",
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
    margin: "10% 0%"
  },
  signUp: {
    display: "flex",
    flex: 0.5,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }, 
  login: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  signUpButton:{
    marginTop: "15px"
  },
  container:{
    width: "100%",
    height: "65%",  
    justifyContent:"center",
    alignItem:"center",
    display:"flex",
    flexDirection: "column"
  },
  textField:{
    width:"60%",
    marginLeft: "20%"
  },
  rememberMe:{
    marginLeft: "10%"
  },
  signupButton:{
    width: "60%",
    marginLeft: "20%",
    marginTop: "20px"
  },
  divider:{
    top: "20px",
    width: "1px",
    height: "100%",
    borderLeft: "1px solid #eaeaea",
    borderWidth: "0 0 0 1px",

  }
};


class Signup extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      open: false,
      error: ""
    }
  }
  handleChange = (type, event) => {
    this.setState({[type]: event.target.value})
  }
  validateForm = () =>{
    return true
  }
  signup = () => {
    if(this.validateForm()){
      API.createRequest('users', 'sign_up')(this.state.email, this.state.password, this.state.password_confirmation).then(res => 
        res.json()).then(response => {
          if(response.errors){
            this.setState({error: "Email is already taken", open: true})
            return;
          }
          window.localStorage.setItem("authentication_token", response.authentication_token)
          API.token = response.token
          this.props.history.push('/home')
          console.log(response)
        })
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.landingContainer}>
        <Card className={classes.card}>
          <div className={classes.login}> 
            <Typography variant="h4" gutterBottom>
              Create a new Account
            </Typography>
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="standard-name"
                  label="Email"
                  type="email"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={(event) => this.handleChange('email', event)}
                  margin="normal"
                />
                <TextField
                  id="standard-uncontrolled"
                  label="Password"
                  type="password"
                  defaultValue={this.state.password}
                  className={classes.textField}
                  onChange={(event) => this.handleChange('password', event)}
                  margin="normal"
                />
                <TextField
                  id="standard-uncontrolled"
                  label="Confirm Password"
                  type="password"
                  defaultValue={this.state.password}
                  className={classes.textField}
                  onChange={(event) => this.handleChange('password_confirmation', event)}
                  margin="normal"
                />
                <Button className={classes.signupButton} variant="outlined" onClick={this.signup}>
                  Sign Up
                </Button>
                <Button href="/landing" className={classes.signupButton} variant="outlined">
                  Already Registered? Login
                </Button>
            </form>
          </div>
        </Card>
        <Snackbar
          open={this.state.open}
          autoHideDuration={4000}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.error}</span>}
        />
      </div>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);
