import React, { Component } from 'react';

import { withRouter } from 'react-router-dom'
import { auth } from '../../auth'
import NavbarConponent from '../../components/navbar'

class NavbarContainer extends Component {

    //Log out the user and clears the token
    logout = () => {
        auth.clearToken();
        this.props.history.push("/landing")
    }
    render() {
        return (
            <NavbarConponent
                logout={this.logout}
            />
        )
    }
}

export default withRouter(NavbarContainer)