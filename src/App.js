import React from "react";

import Routes from "./routes";

function App() {
  return (
    <div className="App">
      <style type="text/css">
        {`
    .btn-primary {
      background-color: #7ed957 !important;
      border-color:  #7ed957 !important;
    }
    `}
      </style>
      <Routes />
    </div>
  );
}

export default App;
