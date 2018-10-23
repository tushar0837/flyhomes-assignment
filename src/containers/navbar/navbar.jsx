import React, { Component } from 'react';

import './navbar.css'
import { withRouter } from 'react-router-dom'
import { auth } from '../../auth'
import NavbarConponent from '../../components/navbar'

class NavbarContainer extends Component {
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