import React from "react";
import CountUp from "react-countup";

const Box = ({ title, number, cls }) => {
  return (
    <div
      className="box"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2 className="is-size-5">{title}</h2>
      <CountUp
        delay={0}
        end={number}
      >
         {({ countUpRef }) => (
          <p
            ref={countUpRef}
            className={`is-size-1 has-text-weight-bold is-family-monospace ${cls}`}
          >
            {number}
          </p>
         )}
       </CountUp>
    </div>
  )
};

export default Box;