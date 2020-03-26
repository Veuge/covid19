import React, { Component } from "react";
import { Link } from "react-router-dom";

import Line from './Line';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Dropdown from "../components/fields/dropdown/Dropdown";
import MainContentWrapper from "../components/main-content-wrapper/MainContentWrapper";

import { ROUTES } from "../App";
import { getHistoricDev } from "../api/getHistoric";
import { getDataLabels, getCountries, getCountriesFromIds } from "../helpers/dataHelper";

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
    getHistoricDev()
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
            <>
              <Line
                labels={getDataLabels(currentHistorics[0].timeline.cases)}
                selectedHistorics={currentHistorics}
                viewport={this.props.viewport}
              />
              <div className="box">
                <h2 className="is-size-3 has-text-centered">Ver más detalles</h2>
                <ul>
                  {getCountriesFromIds(countries, currentCountryIds).map(c => (
                    <li key={`country-${c.id}`}>
                      <Link to={{
                        pathname: ROUTES.MORE_DETAILS.path,
                        country: currentHistorics.find(h => h.id === c.id)
                      }}>
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
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