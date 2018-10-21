import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core'
import ChipInput from 'material-ui-chip-input'
import { API } from '../../api_path_constants';


class Survey extends Component {
    constructor(props){
        super(props)
        this.state = {
            chips: ["as"],
            priceMin: 0,
            priceMax: 0
        }
    }

    componentWillMount(){
        this.updateData()
    }
    updateData = () => {
        API.createRequest("surveys", "get_survey")().then(res => {
            return res.json()
        }).then(response => {
            console.log(response)
            if(response.message != "success"){
                this.createSurvey()
            } else {
                this.setState({priceMin: response.survey.price_min, priceMax: response.survey.price_max})
            }
        })
    }
    createSurvey = () => {
        API.createRequest("surveys", "create_survey")().then(res => {
            res.json()
        }).then(response => {
            console.log(response)
        })
    }
    handleAddChip = (chip) => {
        let {chips} = this.state
        chips.push(chip)
        this.setState({chips}, () => this.updateServer())

    }
    updateServer = () => {
        API.createRequest("surveys", "update_survey")(100, 2000, this.state.chips).then(res => {
        res.json()
        }).then(response => {
        console.log(response)
        })
    }
    handleDeleteChip = (chip, index) => {
        let {chips} = this.state
        chips.splice(index, 1)
        this.setState({chips})
    }

    render() {
        return (
            <Grid container>
                <Typography> 
                    Where would you like to live ?
                </Typography>
                <ChipInput
                    fullWidth   
                    value={this.state.chips}
                    onAdd={(chip) => this.handleAddChip(chip)}
                    onDelete={(chip, index) => this.handleDeleteChip(chip, index)}
                />
                <Typography>
                    What type of property are you looking for? {this.state.priceMax}
                </Typography>
            </Grid>
        );
  }
}

export default Survey;
