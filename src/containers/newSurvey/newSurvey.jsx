import React, { Component } from 'react';

import { API } from '../../api_path_constants';
import SurveyComponent from '../../components/survey'

class Survey extends Component {
    constructor(props) {
        super(props)
        this.state = {
            priceMin: 0,
            priceMax: 0,
            places: [],
            properties: [],
            selectedPlaces: [],
            error: "",
            snackOpen: false,
            completed: false,
            surveyId: -1,
            placeOptions: [
                { value: 'seattle', label: 'Seattle' },
                { value: 'new_york', label: 'New York' },
                { value: 'boston', label: 'Boston' },
                { value: 'chicago', label: 'Chicago' },
                { value: 'san_fracisco', label: 'San Fracisco' },
                { value: 'portland', label: 'Portland' },
                { value: 'la', label: 'Los Angles' },
            ],
            allTypes: [{ name: "home", text: "Home", selected: false },
            { name: "store_mall_directory", text: "Shop", selected: false },
            { name: "business", text: "Office", selected: false }]
        }
        this.createSurvey()
    }
    //creates a new survey
    createSurvey = () => {
        API.createRequest("surveys", "create_survey")(this.state.priceMin, this.state.priceMax, this.state.places, this.state.properties, this.state.completed).then(res => {
            return res.json()
        }).then(response => {
            this.setState({ surveyId: response.survey.id })
        })
    }
    //updates the current survey
    updateServer = () => {
        API.createRequest("surveys", "update_survey")(this.state.priceMin, this.state.priceMax, this.state.places, this.state.properties, this.state.completed, this.state.surveyId).then(res => {
            return res.json()
        }).then(response => {
        })
    }

    //handle places data change
    handleChange = (placesEvent) => {
        let places = placesEvent.map(place => place.label)
        this.setState({ places, selectedPlaces: placesEvent }, () => { this.updateServer() })
    }

    //handles click on cards
    selectCard = (index) => {
        let { allTypes, properties } = this.state
        properties.indexOf(allTypes[index].text) >= 0 ? properties.splice(properties.indexOf(allTypes[index].text), 1) : properties.push(allTypes[index].text)
        allTypes[index].selected = !allTypes[index].selected
        this.setState({ allTypes, properties }, () => {
            this.updateServer()
        })
    }

    //handles price change
    priceChange = (type, event) => {
        this.setState({[type]: event.target.value.replace(/^0+/, '') || "0"}, () => {
            this.updateServer()
        })
    }

    //closes the snackbar
    handleSnackClose = () => {
        this.setState({ snackOpen: false });
    };

    //finishes the survey and validates the form  
    finishSurvey = () => {
        if (this.state.priceMax && this.state.priceMin >= 0 && this.state.places.length && this.state.properties.length && this.state.priceMax > this.state.priceMin) {
            this.setState({ completed: true }, () => {
                this.updateServer()
                this.props.history.push('/')
            })
        } else if (!this.state.priceMax || this.state.priceMin0 < 0 || !this.state.places.length || !this.state.properties.length) {
            this.setState({ error: "Please fill all the fields", snackOpen: true })
        } else if (this.state.priceMax <= this.state.priceMin) {
            this.setState({ error: "Price Max should be greater than Price Min", snackOpen: true })
        }
    }
    render() {
        return (
            <SurveyComponent
                selectCard={this.selectCard}
                handleChange={this.handleChange}
                priceChange={this.priceChange}
                state={this.state}
                handleSnackClose={this.handleSnackClose}
                finishSurvey={this.finishSurvey}
            />

        );
    }
}
export default Survey;
