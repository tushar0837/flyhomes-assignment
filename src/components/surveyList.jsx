import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Background from '../assets/Beach_House.jpg'
import { Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    card: {
        maxWidth: "600px",
        display: "flex",
        height: "35em",
        flexDirection: "row",
        flex: 1,
        padding: "10px",
        margin: "10px",
        marginTop: "75px",
        border: "2px solid #59a0af",
        borderRadius: "15px",
        background: "#e3edef"
    },
    landingContainer: {
        width: "100%",
        height: "-webkit-fill-available",
        display: "flex",
        alignItem: "center",
        justifyContent: "center",
        backgroundImage: `url(${Background})`
    },
    list: {
        flexDirection: "column"
    },
    item1: {
        flex: 0.33,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    item2: {
        flex: 0.33,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    mainContainer: {
        overflow: "scroll",
        flexDirection: "column",
        flex: 1,
    },
    internalContainer: {
        display: "flex",
        flexDirection: "row",
        height: "50px"
    },
    internalContainer1: {
        display: "flex",
        flexDirection: "row",
        height: "50px",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px"
    }
});

class SurveyListComponent extends Component {
    render() {
        const { classes } = this.props
        return (
            <Grid container className={classes.landingContainer}>
                <Card className={classes.card}>
                    <div className={classes.mainContainer} >
                        <div className={classes.internalContainer1}>
                            <Typography align="center" variant="h4" xs={12}>
                                Survey List
                </Typography>
                        </div>
                        <div className={classes.internalContainer}>
                            <Typography align="center" variant="h5" className={classes.item1} xs={6}>
                                Survey Date
                </Typography>
                            <Typography align="center" variant="h5" className={classes.item2} xs={3}>
                                Status
                </Typography>
                            <Typography align="center" variant="h5" className={classes.item2} xs={3}>
                                View Survey
                </Typography>
                        </div>
                        {this.props.surveys.map((survey, index) => {
                            return (<div key={survey.created_at} className={classes.internalContainer}>
                                <div className={classes.item1} xs={4}>
                                    {survey.created_at.slice(0, 10)}
                                </div>
                                <div className={classes.item2} xs={4}>
                                    {survey.completed ? "Completed" : "Not Completed"}
                                </div>
                                <div className={classes.item2} xs={4}>
                                    <Button onClick={() => this.props.viewSurvey(index)} className={classes.surveyBtn} variant="outlined"> View Survey</Button>
                                </div>
                            </div>)
                        })}
                    </div>
                </Card>
            </Grid>
        );
    }
}

SurveyListComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SurveyListComponent);

