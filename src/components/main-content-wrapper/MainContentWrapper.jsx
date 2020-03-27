import React from "react";
import classes from "./mainContentWrapper.module.scss";

const MainContentWrapper = ({ children }) => (
  <section className={`${classes.mainContentContainer} is-large`}>
    {children}
  </section>
);

export default MainContentWrapper;