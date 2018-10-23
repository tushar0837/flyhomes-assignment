import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles, Card, Typography, Icon } from '@material-ui/core'

const styles = {
    selectBox: {
        width: "100%",
        padding: "10px"
    },
    card: {
        height: "110px",
        width: "90px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#e6eced",
        margin: "10px",
        '&:hover': {
            border: "1px #2299f4 solid",
        },
    },
    selectedCard: {
        height: "110px",
        width: "90px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#d1f4fc",
        margin: "10px",
        border: "1px #2c99b2 solid"
    },
    text: {
        textAlign: "center"
    },
    icon: {
        fontSize: '3.5em'
    }
}

class ProfileCard extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Card onClick={() => {
                this.props.selectCard(this.props.index)
            }} className={this.props.selected ? classes.selectedCard : classes.card}>
                <Icon className={classes.icon} >
                    {this.props.name}
                </Icon>
                <Typography className={classes.text} variant={"h5"}>
                    {this.props.text}
                </Typography>
            </Card>
        );
    }
}

ProfileCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileCard);

