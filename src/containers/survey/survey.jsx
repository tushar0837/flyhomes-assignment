import React, { Component } from 'react';

import { API } from '../../api_path_constants';
import SurveyComponent from '../../components/survey'

class Survey extends Component {
    constructor(props){
        super(props)
        this.state = {
            priceMin: 0,
            priceMax: 0,
            places: [],
            properties: [],
            selectedPlaces:[],
            error: "",
            snackOpen: false,
            completed: false,
            placeOptions: [
                { value: 'seattle', label: 'Seattle' },
                { value: 'new_york', label: 'New York' },
                { value: 'boston', label: 'Boston' },
                { value: 'chicago', label: 'Chicago' },
                { value: 'san_fracisco', label: 'San Fracisco' },
                { value: 'portland', label: 'Portland' },
                { value: 'la', label: 'Los Angles' },
              ],
            allTypes: [{name:"home", text: "Home", selected: false},
            {name: "store_mall_directory", text: "Shop", selected: false},
            {name: "business", text: "Office", selected: false } ]
        }
    }
    componentWillMount(){
        this.loadData()
    }
    loadData = () => {
        API.createRequest("surveys", "get_survey")().then(res => {
            return res.json()
        }).then(response => {
            console.log(response)
            if(response.message !== "success"){
                this.createSurvey()
            } else {
                this.setState({priceMin: response.survey.price_min, priceMax: response.survey.price_max})
                this.manageProperties(response.survey.properties)
                this.managePlaces(response.survey.places)
            }
        })
    } 
    managePlaces = (placesFromServer) => {
        let selectedPlaces = [], places  = []
        this.state.placeOptions.forEach((place) => {
            if(placesFromServer.indexOf(place.label) >=0){
                selectedPlaces.push(place)
                places.push(place.label)
            }
        })
        this.setState({selectedPlaces, places})
    }
    manageProperties = (properties) => {
        let property = this.state.allTypes.map((type) => {
            properties.indexOf(type.text) >=0 ? type.selected = true : type.selected = false
            return type
        })
        this.setState({allTypes: property})
        this.setState({properties})
    }
    createSurvey = () => {
        API.createRequest("surveys", "create_survey")(this.state.priceMin, this.state.priceMax, this.state.places, this.state.properties, this.state.completed).then(res => {
            return res.json()
        }).then(response => {
            console.log(response)
        })
    }
    updateServer = () => {
        API.createRequest("surveys", "update_survey")(this.state.priceMin, this.state.priceMax, this.state.places, this.state.properties, this.state.completed).then(res => {
            return res.json()
        }).then(response => {
            console.log(response)
        })
    }

    handleChange = (placesEvent) => {
        let places = placesEvent.map(place => place.label)
        this.setState({places, selectedPlaces: placesEvent}, () => {this.updateServer()})
    }

    selectCard = (index) => {
        let {allTypes, properties } = this.state
        properties.indexOf(allTypes[index].text) >=0 ? properties.splice(properties.indexOf(allTypes[index].text), 1) : properties.push(allTypes[index].text)
        allTypes[index].selected = !allTypes[index].selected
        this.setState({allTypes, properties}, () => {
            this.updateServer()
        })
    }
    priceChange = (type, event) => {
        this.setState({[type]: event.target.value})
    }

    handleSnackClose = () => {
        this.setState({ snackOpen: false });
    };
    finishSurvey = () => {
        if(this.state.priceMax && this.state.priceMin && this.state.places.length && this.state.properties.length){
            this.setState({completed: true}, () => {
                this.updateServer()
                this.props.history.push('/')
            })
        } else {
            this.setState({error:"Please fill all the fields", snackOpen: true})
        }
    }
    render() {
        return (
            <SurveyComponent 
            selectCard={this.selectCard}
            handleChange={this.handleChange}
            updateServer={this.updateServer}
            createSurvey={this.createSurvey}
            manageProperties={this.manageProperties}
            loadData={this.loadData}
            priceChange={this.priceChange}
            state={this.state}
            handleSnackClose={this.handleSnackClose}
            finishSurvey={this.finishSurvey}
            />
            
        );
  }
}
export default Survey;
