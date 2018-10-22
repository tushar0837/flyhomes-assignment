import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography, withStyles } from '@material-ui/core'
import Select from 'react-select';


import  ProfileCard  from './profileCard';


const styles = {
    selectBox: {
        width: "100%",
        padding: "20px"
    },
    container: {
        display: "flex",
        flexDirection: 'column'
    },  
    cardContainer: {
        display: "flex",
        flexDirection: "row",
        padding: "15px  "
    }
}

class SurveyComponent extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid container className={classes.container}>
                <Typography variant="h5"> 
                    Where would you like to live ?
                </Typography>
                <Select
                    className={classes.selectBox}
                    value={this.props.state.selectedPlaces}
                    onChange={this.props.handleChange}
                    options={this.props.state.placeOptions}
                    isMulti={true}
                />
                {this.props.state.places.length > 0 ?
                <React.Fragment>
                    <Typography variant="h5">
                        What type of property are you looking for? 
                    </Typography>
                        <div className={classes.cardContainer}> 
                        {this.props.state.allTypes.map((type, index) => {
                            return <ProfileCard key={index} selectCard={this.props.selectCard} index={index} name={type.name} text={type.text} selected={type.selected} />
                        })}
                    </div>
                </React.Fragment>
                : null}
            </Grid>
        );
  }
}
SurveyComponent.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(SurveyComponent);
