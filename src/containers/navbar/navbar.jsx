import React, {Component} from 'react';

import './navbar.css'
import {withRouter} from 'react-router-dom'
import {auth} from '../../auth'
import NavbarConponent from '../../components/navbar'

class NavbarContainer extends Component{
    logout = () => {
        auth.clearToken(); 
        this.props.history.push("/landing")
    }
    renderUser = () => {
        return `Signed in as: ${auth.getUserData().first_name}`
    }
    render(){
        return(
            <NavbarConponent 
            logout={this.logout}
            renderUser={this.renderUser}
            />
        )
    }
}

export default withRouter(NavbarContainer)