import React, { Component } from "react";

import Line from './Line';
import Dropdown from "./Dropdown";
import { getData, getDataLabels, getCountries } from "../helpers/dataHelper";
import { getHistoric } from "../api/getHistoric";

class Information extends Component {
  state = {
    loading: true,
    historic: null,
    countries: [],
    currentCountryId: "",
    currentHistoric: null
  };

  componentDidMount() {
    getHistoric()
      .then(response => {
        this.setState({
          loading: false,
          historic: response.data,
          countries: getCountries(response.data)
        })
      })
  }

  onSelectCountry = e => {
    const { historic } = this.state;

    const currentCountryId = e.target.value;
    const currentHistoric = historic.find(h => h.id === e.target.value);
    this.setState({
      currentCountryId,
      currentHistoric
    });
  }

  renderLoader = () => (
    <p className="Text">Loading...</p>
  );

  renderContent = () => {
    const { currentCountryId, countries, currentHistoric } = this.state;
    return (
      <>
        <Dropdown
          value={currentCountryId}
          onChange={this.onSelectCountry}
          options={countries}
          labelField={"name"}
          valueField={"id"}
        />
        {!!currentHistoric && (
          <Line
            country={currentHistoric.name}
            data={getData(currentHistoric.timeline.cases)}
            labels={getDataLabels(currentHistoric.timeline.cases)}
          />
        )}
      </>
    );
  }

  renderBody = () => {
    const { loading } = this.state;
    return loading ? this.renderLoader() : this.renderContent()
  }

  render() {
    return (
      <div>
        {this.renderBody()}
      </div>
    )
  }
}

export default Information;