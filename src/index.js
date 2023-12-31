import React from "react";
import ReactDOM from "react-dom/client";
import "./Styles/index.css";
import App from "./Components/App";
import { BrowserRouter as Router } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
