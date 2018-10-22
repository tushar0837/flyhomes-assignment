import React, { Component } from 'react';
import {debounce} from 'throttle-debounce';

import { API } from '../../api_path_constants'
import { auth } from '../../auth';
import ProfileComponent from '../../components/profile'


class Profile extends Component {
  constructor(props){
    super(props)
    console.log(props)
    this.state = {
      firstName: auth.getUserData() ? auth.getUserData().first_name : "",
      lastName: auth.getUserData() ? auth.getUserData().last_name : "",
      city: auth.getUserData() ? auth.getUserData().city : "",
      country: auth.getUserData() ? auth.getUserData().country : "",
      phone: auth.getUserData() ? auth.getUserData().phone : null
    }
  }
  componentWillMount() {
    this.updateToServer = debounce(400, this.updateToServer);
  }

  handleChange = (type, event) => {
      this.setState({[type]: event.target.value},() => this.updateToServer())
  }
  
  updateToServer = () => {
    API.createRequest('users', 'profile')(this.state.firstName, this.state.lastName, this.state.phone, this.state.city, this.state.country).then((res) =>
    res.json()).then((response) => {
      auth.setUserData(response.user)
    })
  }

  render() {
    return (
      <ProfileComponent
      updateToServer={this.updateToServer}
      handleChange={this.handleChange}
      state={this.state}
      props={this.props}
      />
    );
  }
}

export default Profile;
