import React, { Component } from 'react';
import { API } from '../../api_path_constants';
import SurveyListComponent from '../../components/surveyList';


class SurveyList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            surveys: []
        }
        this.loadData()
    }

    loadData = () => {
        API.createRequest("surveys", "get_survey")().then(res => {
            return res.json()
        }).then(response => {
            if (response.message === "success") {
                this.setState({ surveys: response.survey })
            }
        })
    }
    viewSurvey = (index) => {
        this.props.history.push(`/surveyList/${this.state.surveys[index].id}`)
    }
    render() {
        return (
            <SurveyListComponent
                surveys={this.state.surveys}
                viewSurvey={this.viewSurvey}
            />
        );
    }
}

export default SurveyList;
