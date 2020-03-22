import React from "react";

const Dropdown = props => {
  return (
    <select
      value={props.value}
      onChange={props.onChange}
    >
      <option value="">-- Seleccionar un país --</option>
      {props.options.map(country => (
        <option value={country.id} key={`country-${country.id}`}>
          {`${country.name} ${!!country.province ? `- ${country.province}` : ""}`}
        </option>
      ))}
    </select>
  )
};

export default Dropdown;