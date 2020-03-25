import React, { Component } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Information from "./containers/Information";
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
        <Header />
        <section className={`${classes.infoContainer} is-large`}>
          <Information viewport={{ w: this.width, h: this.h }} />
        </section>
        <Footer />
      </>
    );
  }
}

export default App;
