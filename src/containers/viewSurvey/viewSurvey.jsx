import React, { Component } from 'react';

import { API } from '../../api_path_constants';
import SurveyComponent from '../../components/survey'

class SurveyList extends Component {
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
        this.loadData()
    }

    //loads the survey data of selected id
    loadData = () => {
        API.createRequest("surveys", "get_survey")().then(res => {
            return res.json()
        }).then(response => {
            if (response.message !== "success") {
                this.props.history.push("/home")
            } else if (response.survey.findIndex(x => x.id.toString() === this.props.match.params.id) >= 0) {
                let survey = response.survey[response.survey.findIndex(x => x.id.toString() === this.props.match.params.id)]
                this.setState({ surveyId: survey.id })
                this.setState({ priceMin: survey.price_min, priceMax: survey.price_max })
                this.manageProperties(survey.properties)
                this.managePlaces(survey.places)
            } else {
                this.props.history.push("/home")
            }
        })
    }

    //manages the places data from server to array
    managePlaces = (placesFromServer) => {
        let selectedPlaces = [], places = []
        this.state.placeOptions.forEach((place) => {
            if (placesFromServer.indexOf(place.label) >= 0) {
                selectedPlaces.push(place)
                places.push(place.label)
            }
        })
        this.setState({ selectedPlaces, places })
    }

    //manages the properties data from server to array
    manageProperties = (properties) => {
        let property = this.state.allTypes.map((type) => {
            properties.indexOf(type.text) >= 0 ? type.selected = true : type.selected = false
            return type
        })
        this.setState({ allTypes: property })
        this.setState({ properties })
    }

    //updates the server with latest data
    updateServer = () => {
        API.createRequest("surveys", "update_survey")(this.state.priceMin, this.state.priceMax, this.state.places, this.state.properties, this.state.completed, this.state.surveyId).then(res => {
            return res.json()
        }).then(response => {
        })
    }

    //hanldes the change in selected places
    handleChange = (placesEvent) => {
        let places = placesEvent.map(place => place.label)
        this.setState({ places, selectedPlaces: placesEvent }, () => { this.updateServer() })
    }

    //handles the change in selected cards of properties
    selectCard = (index) => {
        let { allTypes, properties } = this.state
        properties.indexOf(allTypes[index].text) >= 0 ? properties.splice(properties.indexOf(allTypes[index].text), 1) : properties.push(allTypes[index].text)
        allTypes[index].selected = !allTypes[index].selected
        this.setState({ allTypes, properties }, () => {
            this.updateServer()
        })
    }

    //handles change in price
    priceChange = (type, event) => {
        this.setState({ [type]: event.target.value.replace(/^0+/, '') || "0" }, () => {
            this.updateServer()
        })
    }

    //closes the navbar
    handleSnackClose = () => {
        this.setState({ snackOpen: false });
    };

    //finishes the survey with latest data, marking completed as true
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
                priceMin={this.state.priceMin}
                priceMax={this.state.priceMax}
                places={this.state.places}
                properties={this.state.properties}
                selectedPlaces={this.state.selectedPlaces}
                error={this.state.error}
                snackOpen={this.state.snackOpen}
                completed={this.state.completed}
                surveyId={this.state.surveyId}
                placeOptions={this.state.placeOptions}
                allTypes={this.state.allTypes}
            />

        );
    }
}
export default SurveyList;
