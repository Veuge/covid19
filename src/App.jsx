import React, { Component } from "react";
import { FaHeart } from "react-icons/fa";

import Information from "./components/Information";
import classes from "./App.module.scss";

class App extends Component {
  height = window.innerHeight;
  width = window.innerWidth;

  componentDidMount() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  render() {
    return (
      <>
        <section className="hero is-info">
          <div className="hero-body">
            <div className="container">
              <h1 className="title is-family-monospace has-text-centered">
                Visualizador de COVID-19
              </h1>
              <h2 class="is-size-7 is-family-monospace has-text-centered">
                Esta aplicación compara la cantidad de casos confirmados de COVID-19 vs. tiempo en los diferentes países. Selecciona los países que quieres comparar (maximo 5). Selecciona o pasa el mouse sobre los puntos de la gráfica para ver los detalles.
              </h2>
            </div>
          </div>
        </section>
        <section className={`${classes.infoContainer} is-large`}>
          <Information viewport={{ w: this.width, h: this.h }} />
        </section>
        <footer className="footer">
          <div className="content has-text-centered">
            <p>
              Hecho con <FaHeart /> por{" "}
              <a href="https://veuge.github.io/">Vero Clavjo</a>. Esta página
              usa la API de{" "}
              <a href="https://github.com/novelcovid/api">NovelCOVID</a>.
            </p>
          </div>
        </footer>
      </>
    );
  }
}

export default App;
