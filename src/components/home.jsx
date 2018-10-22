import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Card from '@material-ui/core/Card';

import Profile from '../containers/profile/profile'
import Survey from '../containers/survey/survey'

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
    maxWidth: "600px",
    display: "flex",
    height: "37em",
    flexDirection: "row",
    flex: 1,
    padding: "2%",
    margin: "10px"
  },
  cardContainer:{
    width: "100%",
    height: "100%",
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
    margin: "75px 0%"
  }
});

function getSteps() {
  return ['First, Tell Us About Yourself', 'Now Lets Set Up Your Feed'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <Profile />;
    case 1:
      return <Survey />;
    default:
      return <Profile />
  }
}


class HomeComponent extends Component {
  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.props.state;

    return (
      <div className={classes.cardContainer}>
        <Card className={classes.card}>
        <div className={classes.root}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(label => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          
          <div>
            {this.props.state.activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>All steps completed</Typography>
                <Button onClick={this.props.handleReset}>Reset</Button>
              </div>
            ) : (
              <div>
                {getStepContent(activeStep)}
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.props.handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  <Button variant="contained" color="primary" onClick={this.props.handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        </Card>
      </div>
    );
  }
}

HomeComponent.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(HomeComponent);
