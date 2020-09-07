import React from "react";
import AddCampgroundForm from "./addCampgroundForm.js";

const AddCampgroundJumbotron = (props) => {
  return (
    <header className="jumbotron">
      <div className="container">
        <AddCampgroundForm 
          handleChange={props.handleChange}
          handleCampgroundSubmit={props.handleCampgroundSubmit}
          toggleAddCampground={props.toggleAddCampground}
        />
      </div>
    </header>
  );
}

export default AddCampgroundJumbotron;