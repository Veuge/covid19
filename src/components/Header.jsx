import React from "react";
import { FaGithubAlt } from "react-icons/fa";
import classes from "./header.module.scss";

const REPO_LINK = "https://github.com/Veuge/covid19";

const Header = () => (
  <section className="hero is-info">
    <a className={classes.repoLink} href={REPO_LINK} target="__blank">
      <FaGithubAlt size={40} />
    </a>
    <div className="hero-body" style={{ paddingTop: 8 }}>
      <div className="container">
        <h1 className="title is-family-monospace has-text-centered">
          Visualizador de COVID-19
        </h1>
        <h2 className="is-size-7 is-family-monospace has-text-centered">
          Esta aplicación compara la cantidad de casos confirmados de COVID-19
          vs. tiempo en los diferentes países. Selecciona los países que quieres
          comparar (máximo 5). Selecciona o pasa el mouse sobre los puntos de la
          gráfica para ver los detalles.
        </h2>
      </div>
    </div>
  </section>
);

export default Header;
