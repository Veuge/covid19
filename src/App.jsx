import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Information from "./containers/Information";
import MoreDetails from "./containers/MoreDetails";

export const ROUTES = {
  MORE_DETAILS: {
    path: "/mas-detalles",
    component: MoreDetails
  },
  HOME: {
    path: "/",
    component: Information
  }
}

class App extends Component {
  height = window.innerHeight;
  width = window.innerWidth;

  componentDidMount() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            path={ROUTES.MORE_DETAILS.path}
            component={ROUTES.MORE_DETAILS.component}
            name="more-details"
          />
          <Route
            exact
            path={ROUTES.HOME.path}
            component={() => (
              <ROUTES.HOME.component viewport={{ w: this.width, h: this.h }} />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
