import React, { useState, useRef } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdClear } from "react-icons/md";
import PropTypes from "prop-types";

import Checkbox from "../checkbox/Checkbox";
import styles from "./dropdown.module.scss";

const Dropdown = props => {
  const [ isOpen, open ] = useState(false);
  const [ searchTerm, search ] = useState("");
  const [ filteredOptions, onFilter ] = useState(props.options);
  const triggerRef = useRef();

  const toggleDropdown = newIsOpen => {
    open(newIsOpen);
  }

  const onSearch = e => {
    const searchVal = e.target.value;
    const filtered = searchVal === "" 
      ? props.options 
      : props.options.filter(op => op.name.toLowerCase().includes(searchVal.toLowerCase()) || (!!op.province && op.province.toLowerCase().includes(searchVal.toLowerCase())));

    // update state
    search(searchVal);
    onFilter(filtered);
  }

  const getSelectedValues = () => {
    return props.selectedValues.map(sv => {
      const selectedCountry = props.options.find(o => o.id === sv);
      return !!selectedCountry ? selectedCountry.name : "";
    });
  }

  const renderTrigger = () => (
    <div ref={triggerRef} className={styles.triggerBox} onClick={() => toggleDropdown(!isOpen)}>
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
      <div className={styles.box} style={{ top: triggerRef.current.getBoundingClientRect().y + triggerRef.current.getBoundingClientRect().height + 5, width: triggerRef.current.getBoundingClientRect().width }}>
        <div className={styles.dropdownControls}>
          <input
            className={styles.searchInput}
            type="text"
            onChange={onSearch}
            value={searchTerm}
            placeholder="Buscar país"
          />
          <button
            style={{ marginRight: 5 }}
            onClick={props.onClearAll}>
              Borrar selección
          </button>
          <button onClick={() => toggleDropdown(false)}>
            <MdClear />
          </button>
        </div>
        <div className={styles.optionsBox}>
          {filteredOptions.map(op => (
            <div className={styles.checkbox} key={`check-${op.id}`}>
              <Checkbox
                label={op.name}
                onCheck={() => props.onSelectOptions(op)}
                checked={props.selectedValues.includes(op.id)}
                disabled={props.selectedValues.length >= 5}
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
  onSelectOptions: PropTypes.func.isRequired,
  onClearAll: PropTypes.func
}

export default Dropdown;