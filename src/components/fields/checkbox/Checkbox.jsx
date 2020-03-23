import React from "react";
import { MdDone } from "react-icons/md";
import PropTypes from "prop-types";

import styles from "./checkbox.module.scss";

const Checkbox = props => {
  return (
    <div className={styles.container} onClick={props.onCheck}>
      <div className={styles.checkbox}>
        {props.checked && <MdDone size={18} color="blue" />}
      </div>
      <p className={styles.label}>{props.label}</p>
    </div>
  );
};

Checkbox.propTypes = {
  onCheck: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Checkbox;
