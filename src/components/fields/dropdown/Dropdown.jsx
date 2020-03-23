import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import PropTypes from "prop-types";

import Checkbox from "../checkbox/Checkbox";
import styles from "./dropdown.module.scss";

const Dropdown = props => {
  console.log("Dropdown", props);
  const [ isOpen, open ] = useState(false);
  const [ searchTerm, search ] = useState("");
  const [ filteredOptions, onFilter ] = useState(props.options);

  const openDropdown = () => {
    open(!isOpen);
  }

  const onSearch = e => {
    const searchVal = e.target.value;
    const filtered = searchVal === "" 
      ? props.options 
      : props.options.filter(op => op.name.includes(searchVal) || (!!op.province && op.province.includes(searchVal)));

    // update state
    search(searchVal);
    onFilter(filtered);
  }

  const getSelectedValues = () => {
    return props.selectedValues.map(sv => {
      const selectedCountry = props.options.find(o => o.id === sv);
      return !!selectedCountry ? `${selectedCountry.name} ${selectedCountry.province || ""}` : "";
    });
  }

  const renderTrigger = () => (
    <div className={styles.triggerBox} onClick={openDropdown}>
      <p className={styles.selectedValues}>{getSelectedValues().join(", ")}</p>
      {isOpen ? (
        <MdKeyboardArrowUp color="blue" />
      ) : (
        <MdKeyboardArrowDown color="blue" />
      )}
    </div>
  );

  const renderOptionsBox = () => (
    isOpen && (
      <div className={styles.box}>
        <input className={styles.searchInput} type="text" onChange={onSearch} value={searchTerm} />
        <div className={styles.optionsBox}>
          {filteredOptions.map(op => (
            <div className={styles.checkbox} key={`check-${op.id}`}>
              <Checkbox
                label={`${op.name} ${!!op.province ? `- ${op.province}` : ""}`}
                onCheck={() => props.onSelectOptions(op)}
                checked={props.selectedValues.includes(op.id)}
              />
            </div>
          ))}
        </div>
      </div>
    )
  );

  return (
    <div className={styles.container}>
      {renderTrigger()}
      {renderOptionsBox()}
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.array.isRequired,
  selectedValues: PropTypes.array.isRequired,
  onSelectOptions: PropTypes.func.isRequired
}

export default Dropdown;