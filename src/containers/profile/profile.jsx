import React, { Component } from 'react';
import { Grid, TextField, withStyles }  from '@material-ui/core'
import PropTypes from 'prop-types';
import { API } from '../../api_path_constants'
import { auth } from '../../auth';

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  textField:{
    width: "70%"
  }
}

class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      firstName: auth.getUserData() ? auth.getUserData().first_name : "",
      lastName: auth.getUserData() ? auth.getUserData().last_name : "",
      city: auth.getUserData() ? auth.getUserData().city : "",
      country: auth.getUserData() ? auth.getUserData().country : "",
      phone: auth.getUserData() ? auth.getUserData().phone : null
    }
    this.getDataFromServer()
  }
  getDataFromServer = () => {

  }

  handleChange = (type, event) => {
    this.setState({[type]: event.target.value},() => this.updateToServer())  
  }
  
  updateToServer = () => {
    API.createRequest('users', 'profile')(this.state.firstName, this.state.lastName, this.state.phone, this.state.city, this.state.country)
  }

  render() {
    const { classes } = this.props;
    return (
    <Grid container className={classes.container}>
      <TextField
        id="standard-name"
        label="First Name"
        type="name"
        value={this.state.firstName}
        className={classes.textField}
        onChange={(event) => this.handleChange('firstName', event)}
        margin="normal"
      />
      <TextField
        id="standard-uncontrolled"
        label="Last Name"
        type="name"
        value={this.state.lastName}
        className={classes.textField}
        onChange={(event) => this.handleChange('lastName', event)}
        margin="normal"
      />
      <TextField
        id="standard-uncontrolled"
        label="Phone"
        type="number"
        value={this.state.phone}
        className={classes.textField}
        onChange={(event) => this.handleChange('phone', event)}
        margin="normal"
      />
      <TextField
        id="standard-uncontrolled"
        label="City"
        type="name"
        value={this.state.city}
        className={classes.textField}
        onChange={(event) => this.handleChange('city', event)}
        margin="normal"
      />
      <TextField
        id="standard-uncontrolled"
        label="Country"
        type="name"
        value={this.state.country}
        className={classes.textField}
        onChange={(event) => this.handleChange('country', event)}
        margin="normal"
      />
    </Grid>
    );
  }
}
Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
