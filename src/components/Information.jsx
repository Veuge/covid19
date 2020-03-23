import React, { Component } from "react";

import Line from './Line';
import Dropdown from "./fields/dropdown/Dropdown";
import Checkbox from "./fields/checkbox/Checkbox"
import { getData, getDataLabels, getCountries } from "../helpers/dataHelper";
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
    debugger;
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

  renderLoader = () => (
    <p className="Text">Loading...</p>
  );

  renderContent = () => {
    const { currentCountryIds, countries, currentHistoric } = this.state;
    return (
      <>
        <Dropdown
          options={countries}
          selectedValues={currentCountryIds}
          onSelectOptions={this.onSelectCountry}
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
      <>
        <Checkbox
          label="A checkbox"
          checked={this.state.checked}
          onCheck={() => this.setState(prev => ({ checked: !prev.checked }))}
        />
        {this.renderBody()}
      </>
    )
  }
}

export default Information;