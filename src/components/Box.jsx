import React from "react";

const Box = ({ title, number, cls }) => {
  return (
    <div
      className="box"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2 className="is-size-5">{title}</h2>
      <p className={`is-size-1 has-text-weight-bold is-family-monospace ${cls}`}>{number}</p>
    </div>
  )
};

export default Box;