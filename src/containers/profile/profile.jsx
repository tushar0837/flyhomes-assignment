import React, { Component } from 'react';
import { debounce } from 'throttle-debounce';

import { API } from '../../api_path_constants'
import { auth } from '../../auth';
import ProfileComponent from '../../components/profile'

class Profile extends Component {
  constructor(props) {
    super(props)
    const userData = auth.getUserData() || {}
    this.state = {
      firstName: userData.first_name,
      lastName: userData.last_name,
      city: userData.city,
      country: userData.country,
      phone: userData.phone
    }
  }

  updateToServer = () => {
    API.createRequest('users', 'profile')(this.state.firstName, this.state.lastName, this.state.phone, this.state.city, this.state.country).then((res) =>
      res.json()).then((response) => {
        auth.setUserData(response.user)
      })
  }
  
  componentWillMount() {
    this.updateToServer = debounce(400, this.updateToServer);
  }

  handleChange = (type, event) => {
    this.setState({ [type]: event.target.value }, () => this.updateToServer())
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
