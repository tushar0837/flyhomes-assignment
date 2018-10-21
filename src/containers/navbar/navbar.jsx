import React, {Component} from 'react';
import {Navbar} from 'react-bootstrap';
import { Button } from '@material-ui/core'
import './navbar.css'
import {withRouter} from 'react-router-dom'
import {auth} from '../../auth'

class NavbarContainer extends Component{
    logout = () => {
        auth.clearToken(); 
        this.props.history.push("/landing")
    }
    render(){
        return(
            <Navbar fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                    <a href="/">Flyhomes</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Text>
                    Signed in as: Mark Otto
                    </Navbar.Text>
                    {auth.checkToken() ?<Navbar.Form pullRight>
                         <Button variant="outlined" onClick={this.logout} >Logout</Button> 
                    </Navbar.Form> : null}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default withRouter(NavbarContainer)