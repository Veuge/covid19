import React from 'react';
import './App.scss';

import Information from "./components/Information";

function App() {
  return (
    <div className="App">
      <h1 className="Title Text">Visualizador de COVID 19</h1>
      <Information />
    </div>
  );
}

export default App;
