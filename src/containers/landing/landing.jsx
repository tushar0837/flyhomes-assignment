import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './landing.css';
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { API } from '../../api_path_constants'
import Snackbar from '@material-ui/core/Snackbar';
import { auth } from '../../auth';

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
    flex: 0.5,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  signUpButton:{
    marginTop: "15px"
  },
  container:{
    width: "100%",
    height: "50%",  
    justifyContent:"center",
    display:"flex",
    flexDirection: "column"
  },
  textField:{
    width:"80%",
    marginLeft: "10%"
  },
  rememberMe:{
    marginLeft: "10%"
  },
  loginButton:{
    width: "80%",
    marginLeft: "10%"
  },
  divider:{
    top: "20px",
    width: "1px",
    height: "100%",
    borderLeft: "1px solid #eaeaea",
    borderWidth: "0 0 0 1px",

  }
};

class Landing extends Component {
  constructor(props){
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
    if(type == "remember_me"){
      this.setState({[type]: event.target.checked})
    } else {
      this.setState({[type]: event.target.value})
    }
  }
  validateForm = () =>{
    let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(String(this.state.email).toLowerCase());
  }
  login = () => {
    if(this.validateForm()){
      API.createRequest('users', 'login')(this.state.email, this.state.password).then(res => 
        res.json()).then(response => {
          auth.setUserData(response);
          window.localStorage.setItem("authentication_token", response.authentication_token)
          this.props.history.push('/home')
      })
    } else {
      this.setState({error: "Please enter a valid email", snackOpen: true})
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.landingContainer}>
        <Card className={classes.card}>
          <div className={classes.signUp}>
            <Typography variant="h4" gutterBottom>
               <b> New User ? </b>
            </Typography>
            <Typography variant="h4" gutterBottom>
                Create a FlyHomes account
            </Typography>
            <Button href="/signUp" className={classes.signUpButton} variant="outlined"> Create Account</Button>
          </div>
          <div className={classes.divider}></div>
          <div className={classes.login}> 
            <Typography variant="h4" gutterBottom>
              LOGIN
            </Typography>
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  id="standard-name"
                  label="Email"
                  type="email"
                  className={classes.textField}
                  value={this.state.email}
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
                <div className={classes.rememberMe}>
                  <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.remember_me}
                      onChange={(event) => this.handleChange('remember_me', event)} 
                      color="primary"
                    />
                    }
                    label="Keep me logged in"
                  />
                </div>
                <Button className={classes.loginButton} variant="outlined" onClick={this.login}>
                  Login
                </Button>
            </form>
          </div>
        </Card>
        <Snackbar
          open={this.state.snackOpen}
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

Landing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Landing);
