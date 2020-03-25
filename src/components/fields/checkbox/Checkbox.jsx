import React from "react";
import { MdDone } from "react-icons/md";
import PropTypes from "prop-types";

import styles from "./checkbox.module.scss";

const Checkbox = props => {
  const classNames = [
    styles.container,
    props.disabled ? styles.disabled : undefined
  ]
  return (
    <div
      disabled={props.disabled}
      className={classNames.join(" ")}
      onClick={!props.disabled ? props.onCheck : undefined}
    >
      <div className={styles.checkbox}>
        {props.checked && <MdDone size={18} color="#3298dc" />}
      </div>
      <p className={styles.label}>{props.label}</p>
    </div>
  );
};

Checkbox.propTypes = {
  onCheck: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool
};

export default Checkbox;
