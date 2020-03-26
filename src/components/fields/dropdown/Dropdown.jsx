import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdClear } from "react-icons/md";
import PropTypes from "prop-types";

import Checkbox from "../checkbox/Checkbox";
import { getCountriesFromIds } from "../../../helpers/dataHelper";
import styles from "./dropdown.module.scss";

const Dropdown = props => {
  const [ isOpen, open ] = useState(false);
  const [ searchTerm, search ] = useState("");
  const [ filteredOptions, onFilter ] = useState(props.options);

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
    return getCountriesFromIds(props.options, props.selectedValues)
      .map(c => c.name);
  }

  const renderTrigger = () => (
    <div
      tabIndex={0}
      className={styles.triggerBox}
      onClick={() => toggleDropdown(!isOpen)}
    >
      <p className={styles.selectedValues}>{getSelectedValues().join(", ")}</p>
      {isOpen ? (
        <MdKeyboardArrowUp color="#3298dc" />
      ) : (
        <MdKeyboardArrowDown color="#3298dc" />
      )}
    </div>
  );

  const renderBoxActions = () => {
    return (
      <div className={styles.actionsContainer} style={{ display: "flex" }}>
        <input
          className={`input is-info is-small ${styles.searchInput}`}
          type="text"
          onChange={onSearch}
          value={searchTerm}
          placeholder="Buscar país"
        />
        <div className={styles.buttonContainer}>
          <button
            className="button is-small is-outlined"
            style={{ marginRight: 5 }}
            onClick={props.onClearAll}>
              Borrar selección
          </button>
          <button className="button is-small is-outlined" onClick={() => toggleDropdown(false)}>
            <MdClear />
          </button>
        </div>
      </div>
    );
  }

  const renderOptions = () => (
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
  );

  const renderOptionsBox = () => (
    isOpen && (
      <div className={styles.box}>
        {renderBoxActions()}
        {renderOptions()}
      </div>
    )
  );

  return (
    <div className={styles.container}>
      <p className="label">Seleccione países</p>
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