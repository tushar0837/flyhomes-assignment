import React, {Component} from 'react';

import {Navbar} from 'react-bootstrap';
import { Button } from '@material-ui/core'
import {withRouter} from 'react-router-dom'

import {auth} from '../auth'

class NavbarComponent extends Component{
    render(){
        return(
            <Navbar fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                    <a href="/">FLYHOMES</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Text>
                    { auth.getUserData() ? this.props.renderUser() : null}
                    </Navbar.Text>
                    {auth.checkToken() ?<Navbar.Form pullRight>
                         <Button variant="outlined" onClick={this.props.logout} >Logout</Button> 
                    </Navbar.Form> : null}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default withRouter(NavbarComponent)