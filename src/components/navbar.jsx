import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Navbar } from 'react-bootstrap';
import { Button, withStyles } from '@material-ui/core'
import { withRouter } from 'react-router-dom'

import { auth } from '../auth'

const styles = {
    mainNav:{
        background: "rgba(0,0,0,0.25)",
    },
    text: {
        color: "white!important",
    }

}

class NavbarComponent extends Component {
    render() {
    const { classes } = this.props;
        return (
            <Navbar className={classes.mainNav} fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a className={classes.text} href="/">FLYHOMES</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Text className={classes.text}>
                        {auth.getUserData().first_name ? `Signed in as: ${auth.getUserData().first_name }` : null}
                    </Navbar.Text>
                    {auth.checkToken() ?
                    <Navbar.Form pullRight>
                        <Button className={classes.text} variant="outlined" onClick={this.props.logout} >Logout</Button>
                    </Navbar.Form> : null}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

NavbarComponent.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(withRouter(NavbarComponent));
