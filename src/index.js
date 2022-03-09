import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EnQIne from "./pages/enqine/EnQIne";
import Debug from "./pages/enqine/Debug";
import Main from "./pages/main/Main";

import "./index.css";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/enqine" element={<EnQIne />} />
      <Route path="/enqine/debug" element={<Debug />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
