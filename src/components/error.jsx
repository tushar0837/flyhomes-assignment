import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Background from '../assets/Beach_House.jpg'

const styles = theme => ({
  card: {
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
  cardContainer: {
    width: "100%",
    height: "-webkit-fill-available",
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
    backgroundImage: `url(${Background})`
  },
  errorMessage: {
    textAlign: "center",
    padding: "10px"
  },
});

class Error extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.cardContainer}>
        <Card className={classes.card}>
          <Typography className={classes.errorMessage} variant="h4">
            Error: 404 <br />
            You are not supposed to be here <br />
            Don't worry we all make mistakes
            </Typography>
        </Card>
      </div>
    );
  }
}

Error.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Error);
