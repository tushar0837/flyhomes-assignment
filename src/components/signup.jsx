import React, { Component } from 'react';
import PropTypes from 'prop-types';


import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';

import Background from '../assets/Beach_House.jpg'

const styles = {
  card: {
    maxWidth: "600px",
    display: "flex",
    height: "35em",
    flexDirection: "row",
    flex: 1,
    padding: "10px",
    margin: "10px",
    marginTop: "75px",
    border: "2px solid #59a0af",
    borderRadius: "15px",
    background: "#e3edef"
  },
  media: {
    height: 140,
  },
  landingContainer: {
    width: "100%",
    height: "-webkit-fill-available",
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
    backgroundImage: `url(${Background})`
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
  signUpButton: {
    marginTop: "15px"
  },
  container: {
    width: "100%",
    height: "65%",
    justifyContent: "center",
    alignItem: "center",
    display: "flex",
    flexDirection: "column"
  },
  textField: {
    width: "80%",
    marginLeft: "10%"
  },
  rememberMe: {
    marginLeft: "10%"
  },
  signupButton: {
    width: "60%",
    marginLeft: "20%",
    marginTop: "20px"
  },
  divider: {
    top: "20px",
    width: "1px",
    height: "100%",
    borderLeft: "1px solid #eaeaea",
    borderWidth: "0 0 0 1px",

  }
}


class SignupComponent extends Component {
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
                id="email"
                label="Email"
                type="email"
                className={classes.textField}
                value={this.props.name}
                onChange={(event) => this.props.handleChange('email', event)}
                margin="normal"
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                defaultValue={this.props.password}
                className={classes.textField}
                onChange={(event) => this.props.handleChange('password', event)}
                margin="normal"
              />
              <TextField
                id="c-password"
                label="Confirm Password"
                type="password"
                defaultValue={this.props.password_confirmation}
                className={classes.textField}
                onChange={(event) => this.props.handleChange('password_confirmation', event)}
                margin="normal"
              />
              <Button className={classes.signupButton} variant="outlined" onClick={this.props.signup}>
                Sign Up
                </Button>
              <Button href="/landing" className={classes.signupButton} variant="outlined">
                Already Registered? Login
                </Button>
            </form>
          </div>
        </Card>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={this.props.snackOpen}
          autoHideDuration={4000}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.error}</span>}
        />
      </div>
    );
  }
}

SignupComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignupComponent);
