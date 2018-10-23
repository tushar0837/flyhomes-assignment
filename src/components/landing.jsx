import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Grid } from '@material-ui/core'
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
    flex: 0.5,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  signUpButton: {
    marginTop: "15px"
  },
  container: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    padding: "20px"
  },
  textField: {
    textAlign: "center"
  },
  rememberMe: {
    marginLeft: "10%"
  },
  loginButton: {
    width: "80%",
    marginLeft: "10%"
  },
  divider: {
    top: "20px",
    width: "1px",
    height: "100%",
    borderLeft: "1px solid #000",
    borderWidth: "0 0 0 1px",
  },
};

class LandingComponent extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.landingContainer}>
      <Card className={classes.card}>
      <Grid container alignContent="center" justify="center">
          <Grid className={classes.signUp}>
            <Typography variant="h4" gutterBottom>
              <b> New User ? </b>
            </Typography>
            <Typography className={classes.textField} variant="h4" gutterBottom>
              Create a FlyHomes account
            </Typography>
            <Button href="/signUp" className={classes.signUpButton} variant="outlined"> Create Account</Button>
          </Grid>
          <div className={classes.divider}></div>
          <Grid className={classes.login}>
            <Typography variant="h4" gutterBottom>
              LOGIN
            </Typography>
            <form className={classes.container}>
              <TextField
                id="email"
                label="Email"
                type="email"
                className={classes.textField}
                value={this.props.state.email}
                onChange={(event) => this.props.handleTextChange('email', event)}
                margin="normal"
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                defaultValue={this.props.state.password}
                className={classes.textField}
                onChange={(event) => this.props.handleTextChange('password', event)}
                margin="normal"
              />
              <Button className={classes.loginButton} variant="outlined" onClick={this.props.login}>
                Login
                </Button>
            </form>
          </Grid>
        </Grid>
        </Card>
        <Snackbar
          open={this.props.state.snackOpen}
          onClose={this.props.handleSnackClose}
          autoHideDuration={3000}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.state.error}</span>}
        />
      </div>
    );
  }
}

LandingComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingComponent);
