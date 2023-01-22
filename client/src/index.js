import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { DashBoard_Provider } from './context/DashBoardContext';


ReactDOM.render(
  <DashBoard_Provider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </DashBoard_Provider>,
  document.getElementById("root")
);
