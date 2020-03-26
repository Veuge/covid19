import React, { Component } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Box from "../components/Box";
import MainContentWrapper from "../components/main-content-wrapper/MainContentWrapper";

import { ROUTES } from "../App";
import { getByCountry } from "../api/getByCountry";

class MoreDetails extends Component {
  state = {
    loading: false,
    stats: null
  }

  componentDidMount() {
    console.log("MoreDetails > componentDidMount", this.props);
    if (this.props.location.country) {
      this.setState({ loading: true });
      getByCountry(this.props.location.country.name)
        .then(response => {
          console.log("MoreDetails > componentDidMount", response.data);
          this.setState({
            stats: response.data,
            loading: false
          })
        })
        .catch(e => {
          this.setState({
            loading: false
          })
        });
    }
  }

  renderLoader = () => {
    const { loading } = this.state;
    return loading && (
      <p className="Text">Cargando...</p>
    );
  }

  renderContent = () => {
    const { stats } = this.state;
    const { location } = this.props;

    return location.country && !!stats && (
      <>
        <Link to={ROUTES.HOME.path}>Regresar</Link>
        <h3 className="is-size-4 has-text-centered">
          {location.country.name}
        </h3>
        <Box title="Casos confirmados" number={stats.cases} cls="has-text-link" />
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
          <Box title="Decesos" number={stats.deaths} cls="has-text-danger" />
          <Box title="Recuperados" number={stats.recovered} cls="has-text-success" />
        </div>
      </>
    )
  }

  renderError = () => {
    const { location } = this.props;

    return !location.country && (
      <article className="message is-danger">
        <div className="message-header">
          <p>Error</p>
        </div>
        <div className="message-body">
          No pude encontrar el país solicitado, por favor vuelve a la <strong><Link to={ROUTES.HOME.path}>página principal</Link></strong> para seleccionarlo de nuevo.
        </div>
      </article>
    )
  }

  render() {
    const { loading } = this.state;
    return (
      <>
        <Header small />
        <MainContentWrapper>
          {loading ? this.renderLoader() : this.renderContent()}
          {this.renderError()}
        </MainContentWrapper>
        <Footer />
      </>
    )
  }
}

export default MoreDetails;