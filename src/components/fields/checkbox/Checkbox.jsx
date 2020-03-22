import React from "react";
import { MdDone } from "react-icons/md";
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

export default Checkbox;
