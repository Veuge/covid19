import React from "react";
import classes from "./loader.module.scss";

const Loader = ({ color }) => {
  return (
    <div className={classes.ldsRipple}>
      <div className={color === "blue" ? classes.blue : classes.green} />
      <div/>
    </div>
  );
};

export default Loader;