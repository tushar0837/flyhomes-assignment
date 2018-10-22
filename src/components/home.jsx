import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Background from '../assets/Beach_House.jpg'
import Profile from '../containers/profile/profile'

const styles = theme => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  card:{
    maxWidth: "500px",
    display: "flex",
    height: "38em",
    flex: 0.7,
    padding: "10px",
    margin: "10px",
    marginTop: "75px",
    border: "2px solid #59a0af",
    borderRadius: "15px",
    background: "#e3edef",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  cardContainer:{
    width: "100%",
    height: "-webkit-fill-available",
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
    backgroundImage: `url(${Background})`
  },
  textFields: {
    textAlign: "center",
    padding: "10px"
  },
  surveyBtn: {
    marginTop: "10px"
  }
});

class HomeComponent extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.cardContainer}>
        <Card className={classes.card}>
        <Typography className={classes.textFields} variant="h4">
            Welcome Back! 
        </Typography>
        <Typography className={classes.textFields} variant="h5">
            Please update your details from here
        </Typography>
            <Profile />
          <Button href="/survey" className={classes.surveyBtn} variant="outlined"> Take a Survey</Button>
        </Card>
      </div>
    );
  }
}

HomeComponent.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(HomeComponent);
