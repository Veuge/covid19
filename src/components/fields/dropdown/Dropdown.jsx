import React, { useState, useRef, useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdClear } from "react-icons/md";
import PropTypes from "prop-types";

import Checkbox from "../checkbox/Checkbox";
import { getCountriesFromIds } from "../../../helpers/dataHelper";
import { getCountryProvinceConcat } from "../../../helpers/stringHelper";
import styles from "./dropdown.module.scss";

const Dropdown = props => {
  const [ isOpen, open ] = useState(false);
  const [ searchTerm, search ] = useState("");
  const [ filteredOptions, onFilter ] = useState(props.options);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const toggleDropdown = newIsOpen => {
    open(newIsOpen);
  }

  const onSearch = e => {
    const searchVal = e.target.value;
    const filterList = op => 
      op.nameInSpanish.toLowerCase().includes(searchVal.toLowerCase()) || 
      (!!op.province && op.province.toLowerCase().includes(searchVal.toLowerCase()));

    const filtered = searchVal === "" 
      ? props.options 
      : props.options.filter(filterList);

    // update state
    search(searchVal);
    onFilter(filtered);
  }

  const onSelectOptions = op => {
    props.onSelectOptions(op);
    if(props.selectedValues.length === 4) {
      toggleDropdown(false);
    }
  }

  const getSelectedValues = () => {
    return getCountriesFromIds(props.options, props.selectedValues)
      .map(c => getCountryProvinceConcat(c.nameInSpanish, c.province));
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
          ref={inputRef}
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
            label={getCountryProvinceConcat(op.nameInSpanish, op.province)}
            onCheck={() => onSelectOptions(op)}
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