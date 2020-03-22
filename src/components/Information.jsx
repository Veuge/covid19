import React, { Component } from "react";
import axios from "axios";

import Line from './Line';
import { getData, getDataLabels, getCountries } from "../helpers/dataHelper";

class Information extends Component {
  state = {
    loading: true,
    historic: {},
    countries: {},
    currentCountry: ""
  };
  
  componentDidMount() {
    axios.get("https://corona.lmao.ninja/historical")
      .then(response => {
        const countries = getCountries(response.data);
        console.log({ data: response.data, countries });
        this.setState({
          historic: response.data.map((c, index) => ({ ...c, id: `${index}` })),
          countries: countries,
          loading: false
        })
      })
  }

  onSelectCountry = e => {
    const currentCountry = e.target.value;
    this.setState({
      currentCountry
    })
  }
  
  render() {
    const { loading, historic } = this.state;
    return (
      <div>
        {loading ? (
          <p className="Text">Loading...</p>
        ) : (
          <>
            <select
              name="countries"
              onChange={this.onSelectCountry}
              value={this.state.currentCountry}
            >
              <option value="">--Please choose an option--</option>
              {this.state.countries.map(country => (
                <option value={country.id}>
                  {`${country.name} - ${!!country.province ? country.province : ""}`}
                </option>
              ))}
            </select>
            <p className="Text">{historic.country}</p>
            {/* <Line
              data={getData(historic.timeline.cases)}
              labels={getDataLabels(historic.timeline.cases)}
            /> */}
          </>
        )}
      </div>
    )
  }
}

export default Information;