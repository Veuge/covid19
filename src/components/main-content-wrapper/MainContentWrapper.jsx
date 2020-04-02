import React from "react";

const MainContentWrapper = ({ children }) => (
  <section className="section" style={{ flex: 1 }}>
    <div className="columns">
      <div className="column" />
      <div className="column is-10">
        {children}
      </div>
      <div className="column" />
    </div>
  </section>
);

export default MainContentWrapper;