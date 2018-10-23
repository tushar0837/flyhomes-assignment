import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import Background from '../assets/Beach_House.jpg'
import { Grid, Typography, withStyles, TextField, Button } from '@material-ui/core'
import Select from 'react-select';
import Snackbar from '@material-ui/core/Snackbar';


import ProfileCard from './profileCard';


const styles = theme => ({
    selectBox: {
        width: "100%",
        padding: "20px"
    },
    container: {
        display: "flex",
        flexDirection: 'column'
    },
    cardContainer1: {
        display: "flex",
        flexDirection: "row",
        padding: "15px",
    },
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
    card: {
        maxWidth: "500px",
        display: "flex",
        height: "44em",
        flex: 0.7,
        padding: "10px",
        margin: "10px",
        marginTop: "75px",
        border: "2px solid #59a0af",
        borderRadius: "15px",
        background: "#e3edef",
        alignItems: " center",
        justifyContent: "flex-start",
        flexDirection: "column",
    },
    cardContainer: {
        width: "100%",
        height: "-webkit-fill-available",
        display: "flex",
        alignItem: "center",
        justifyContent: "center",
        backgroundImage: `url(${Background})`,
    },
    textFields: {
        textAlign: "center",
        padding: "10px"
    },
    surveyBtn: {
        background: "#d1f4fc",
        marginTop: "10px"
    },
    fieldContainer: {
        display: "flex",
        flex: 1,
        alignItem: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    textField: {
        flex: 0.5,
        margin: "2%",
        height: "3.2em"
    },
    finishBtn: {
        width: "50%",
        marginLeft: "25%",
        marginTop: "3%"
    },
    snackbar: {
        fontSize: 15
    }
})


class SurveyComponent extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.cardContainer}>
                <Card className={classes.card}>
                    <Typography className={classes.textFields} variant="h4">
                        Survey
                </Typography>
                    <Typography className={classes.textFields} variant="h5">
                        Please answer below questions to setup your feed
                </Typography>
                    <Grid container className={classes.container}>
                        <Typography variant="h5">
                            Where would you like to live ?
                </Typography>
                        <Select
                            className={classes.selectBox}
                            value={this.props.selectedPlaces}
                            onChange={this.props.handleChange}
                            options={this.props.placeOptions}
                            isMulti={true}
                        />
                        {this.props.places.length > 0 || this.props.properties.length > 0 ?
                            <React.Fragment>
                                <Typography variant="h5">
                                    What type of property are you looking for?
                    </Typography>
                                <div className={classes.cardContainer1}>
                                    {this.props.allTypes.map((type, index) => {
                                        return <ProfileCard key={index} selectCard={this.props.selectCard} index={index} name={type.name} text={type.text} selected={type.selected} />
                                    })}
                                </div>
                            </React.Fragment>
                            : null}

                        {this.props.properties.length > 0 ?
                            <React.Fragment>
                                <Typography variant="h5">
                                    What Is Your Preferred Price Range?
                    </Typography>
                                <div className={classes.fieldContainer}>
                                    <TextField
                                        id="priceMin"
                                        label="Price Min"
                                        type="number"
                                        value={this.props.priceMin}
                                        className={classes.textField}
                                        onChange={(event) => this.props.priceChange('priceMin', event)}
                                        margin="normal"
                                    />
                                    <TextField
                                        id="priceMax"
                                        label="Price Max"
                                        type="number"
                                        value={this.props.priceMax}
                                        className={classes.textField}
                                        onChange={(event) => this.props.priceChange('priceMax', event)}
                                        margin="normal"
                                    />
                                </div>
                            </React.Fragment>
                            : null
                        }
                        <Button onClick={() => { this.props.finishSurvey() }} className={classes.finishBtn} variant="outlined"> Finish </Button>
                    </Grid>
                </Card>
                <Snackbar
                    open={this.props.snackOpen}
                    className={classes.snackbar}
                    onClose={this.props.handleSnackClose}
                    autoHideDuration={3000}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.props.error}</span>}
                />
            </div>
        );
    }
}
SurveyComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SurveyComponent);
