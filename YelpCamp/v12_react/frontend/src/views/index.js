import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import App from "./App.js";

// proxy in package.json doesnt work but this adds localhost 5000 to all requests
const localHostURL = "http://localhost:5000";
axios.defaults.baseURL = localHostURL;

ReactDOM.render(<App />, document.getElementById("root"));
