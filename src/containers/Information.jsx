import React, { Component } from "react";
import { Link } from "react-router-dom";

import Line from './Line';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/loader/Loader";
import Dropdown from "../components/fields/dropdown/Dropdown";
import MainContentWrapper from "../components/main-content-wrapper/MainContentWrapper";

import { ROUTES } from "../App";
import { getHistoric } from "../api/getHistoric";
import {
  getDataLabels,
  getCountries,
  getUniqueCountriesFromIds
} from "../helpers/dataHelper";

class Information extends Component {
  state = {
    loading: true,
    historic: null,
    countries: [],
    currentCountryIds: [],
    currentHistorics: []
  };

  componentDidMount() {
    getHistoric()
      .then(response => {
        this.setState({
          loading: false,
          historic: response.data,
          countries: getCountries(response.data)
        }, () => {
          console.log({state: this.state});
        });
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
    <Loader color="blue" />
  );

  renderChart = () => {
    const { currentHistorics } = this.state;
    const { viewport } = this.props;
    const labels = getDataLabels(currentHistorics[0].timeline.cases);
    return (
      <Line
        labels={labels}
        selectedHistorics={currentHistorics}
        viewport={viewport}
      />
    )
  };

  renderViewMore = () => {
    const { countries, currentHistorics, currentCountryIds } = this.state;
    const selectedCountries = getUniqueCountriesFromIds(countries, currentCountryIds);

    return (
      <div className="box">
        <h2 className="is-size-3 has-text-centered">Ver más detalles</h2>
        <div className="tags are-medium" style={{ marginTop: 20 }}>
          {selectedCountries.map(c => (
            <span className="tag" key={`country-${c.id}`}>
              <Link
                to={{
                  pathname: ROUTES.MORE_DETAILS.path,
                  country: currentHistorics.find(h => h.id === c.id)
                }}
              >
                {c.nameInSpanish}
              </Link>
            </span>
          ))}
        </div>
      </div>
    )
  }

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
            <>
              {this.renderChart()}
              {this.renderViewMore()}
            </>
          )}
        </div>
    );
  }

  renderBody = () => {
    const { loading } = this.state;
    return (
      <>
        <Header />
        <MainContentWrapper>
          {loading ? this.renderLoader() : this.renderContent()}
        </MainContentWrapper>
        <Footer />
      </>
    )
  }

  render() {
    return this.renderBody();
  }
}

export default Information;