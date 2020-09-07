import React from "react";
import { Link } from "react-router-dom";

const DefaultJumbotron = (props) => {
  return (
    <header className="jumbotron">
      <div className="container">
        <div>
          <h1 className="title-font">Welcome to YelpCamp {props.name}</h1>
          <p className="secondary-font">View thousands of campgrounds from all over the world</p>
          <p>
            <Link to="/" className="btn btn-primary btn-lg secondary-font">Back to landing page</Link>
            <a className="btn btn-lg btn-primary secondary-font" onClick={props.toggleAddCampground}>Add a New Campground</a>
          </p>
        </div>
      </div>
    </header>
  );
}

export default DefaultJumbotron;