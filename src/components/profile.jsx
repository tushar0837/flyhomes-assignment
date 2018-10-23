import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Grid, TextField, withStyles } from '@material-ui/core'

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  textField: {
    width: "85%",
    fontSize: 15
  },
  resize: {
    fontSize: 13
  }
}

class ProfileComponent extends Component {

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.container}>
        <TextField
          id="name"
          InputProps={{
            classes: {
              input: classes.resize,
            },
          }}
          label="First Name"
          type="name"
          value={this.props.state.firstName}
          className={classes.textField}
          onChange={(event) => this.props.handleChange('firstName', event)}
          margin="normal"
        />
        <TextField
          id="lastname"
          InputProps={{
            classes: {
              input: classes.resize,
            },
          }}
          label="Last Name"
          type="name"
          value={this.props.state.lastName}
          className={classes.textField}
          onChange={(event) => this.props.handleChange('lastName', event)}
          margin="normal"
        />
        <TextField
          id="controller"
          InputProps={{
            classes: {
              input: classes.resize,
            },
          }}
          label="Phone"
          type="number"
          value={this.props.state.phone}
          className={classes.textField}
          onChange={(event) => this.props.handleChange('phone', event)}
          margin="normal"
        />
        <TextField
          id="city"
          InputProps={{
            classes: {
              input: classes.resize,
            },
          }}
          label="City"
          type="name"
          value={this.props.state.city}
          className={classes.textField}
          onChange={(event) => this.props.handleChange('city', event)}
          margin="normal"
        />
        <TextField
          id="country"
          InputProps={{
            classes: {
              input: classes.resize,
            },
          }}
          label="Country"
          type="name"
          value={this.props.state.country}
          className={classes.textField}
          onChange={(event) => this.props.handleChange('country', event)}
          margin="normal"
        />
      </Grid>
    );
  }
}
ProfileComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileComponent);
