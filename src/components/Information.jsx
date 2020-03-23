import React, { Component } from "react";

import Line from './Line';
import Dropdown from "./fields/dropdown/Dropdown";
import { getDataLabels, getCountries } from "../helpers/dataHelper";
import { getHistoric } from "../api/getHistoric";

class Information extends Component {
  state = {
    loading: true,
    historic: null,
    countries: [],
    currentCountryIds: [],
    currentHistorics: [],
    checked: false
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

    const currentCountryId = e.id;
    const currentHistoric = historic.find(h => h.id === currentCountryId);
    this.setState(prevState => {
      const { currentCountryIds, currentHistorics } = prevState;
      const alreadySelected = currentCountryIds.includes(currentCountryId);
      let newIds = [], newHistorics = [];
      if(alreadySelected) {
        newIds = currentCountryIds.filter(cids => cids !== currentCountryId);
        newHistorics = currentHistorics.filter(h => h.id !== currentCountryId);
      } else {
        newIds = [...currentCountryIds, currentCountryId];
        newHistorics = [...currentHistorics, currentHistoric];
      }

      return {
        currentCountryIds: newIds,
        currentHistorics: newHistorics
      }
    });
  }

  onClear = () => {
    this.setState({
      currentCountryIds: [],
      currentHistorics: []
    })
  };

  renderLoader = () => (
    <p className="Text">Cargando...</p>
  );

  renderContent = () => {
    const { currentCountryIds, countries, currentHistorics } = this.state;
    return (
        <div className="container">
          <Dropdown
            options={countries}
            selectedValues={currentCountryIds}
            onSelectOptions={this.onSelectCountry}
            onClearAll={this.onClear}
          />
          {!!currentHistorics.length && (
            <Line
              labels={getDataLabels(currentHistorics[0].timeline.cases)}
              selectedHistorics={currentHistorics}
              viewport={this.props.viewport}
            />
          )}
        </div>
    );
  }

  renderBody = () => {
    const { loading } = this.state;
    return loading ? this.renderLoader() : this.renderContent()
  }

  render() {
    return this.renderBody();
  }
}

export default Information;