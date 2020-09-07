import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import App from "./App.js";

const localHostURL = "http://localhost:5000";
const baseURL = process.env.baseURL ? process.env.baseURL + "/api" : localHostURL + "/api";

// proxy in package.json doesnt work but this adds localhost 5000 to all requests
axios.defaults.baseURL = baseURL;

ReactDOM.render(<App />, document.getElementById("root"));
