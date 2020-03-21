import React, { Component } from "react";
import axios from "axios";

import Line from "./Line";

class Information extends Component {
  state = {
    loading: true,
    historic: {}
  };
  
  componentDidMount() {
    axios.get("https://corona.lmao.ninja/historical")
      .then(response => {
        const bo = response.data.find(historic => historic.country === "Bolivia");
        console.log(bo);
        this.setState({
          historic: bo,
          loading: false
        })
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
            <p className="Text">{historic.country}</p>
            <Line />
          </>
        )}
      </div>
    )
  }
}

export default Information;