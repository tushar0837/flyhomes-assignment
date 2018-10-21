import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Card from '@material-ui/core/Card';
import { auth } from '../../auth'
import Profile from '../profile/profile'

const styles = theme => ({
  root: {
    width: '90%',
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  card:{
    maxWidth: "50%",
    height: "500px",
    display: "flex",
    flexDirection: "row",
    flex: 1,
    justifyContent: "center"
  },
  cardContainer:{
    width: "100%",
    height: "100%",
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
    margin: "10% 0%"
  }
});

function getSteps() {
  return ['First, Tell Us About Yourself', 'Where would you like to live', 'What Type(s) Of Property Are You Looking For?', 'What Is Your Preferred Price Range?'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <Profile />;
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Uknown stepIndex';
  }
}


class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      activeStep: 0,
   };
   this.validateAuthentication();
  }

  validateAuthentication = () => {
    if(auth.checkToken()){
      this.props.history.push('/')
    }
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };
  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

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
            {this.state.activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>All steps completed</Typography>
                <Button onClick={this.handleReset}>Reset</Button>
              </div>
            ) : (
              <div>
                {getStepContent(activeStep)}
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  <Button variant="contained" color="primary" onClick={this.handleNext}>
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

Home.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Home);
