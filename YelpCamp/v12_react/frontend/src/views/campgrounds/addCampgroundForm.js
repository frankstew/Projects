import React from "react";
import { Link } from "react-router-dom";

const AddCampgroundForm = (props) => {
  return (
    <div>
      <h1 style={{marginBottom: "3rem", textAlign: "center"}} className="title-font">Add a new Campground</h1>
        <div className="container">
          <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
              <form name="addCampgroundForm" onSubmit={(event) => {props.handleCampgroundSubmit(event, "ADD")}}>

                <div className="form-group secondary-font">
                  <input onChange={props.handleChange} className="form-control secondary-font" type="text" name="CampgroundName" placeholder="Campground name" required />
                </div>

                <div className="form-group secondary-font">
                  <input onChange={props.handleChange} className="form-control" type="text" name="CampgroundImg" placeholder="Campground image url" required />
                </div>

                <div className="form-group secondary-font">
                  <input onChange={props.handleChange} className="form-control" type="text" name="CampgroundDescription" placeholder="Campground description" required />
                </div>

                  <button type="submit" className="btn btn-primary btn-lg secondary-font">Add Campground</button>
                  <button className="btn btn-lg btn-danger secondary-font" onClick={props.toggleAddCampground}>Cancel</button>
              </form>
            </div>
            
          </div>
        </div>
    </div>
    
    
  );
  
}

export default AddCampgroundForm;