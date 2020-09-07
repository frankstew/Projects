import React from "react";
import { Link } from "react-router-dom";

const EditCampgroundThumbnail = (props) => {
  return (
    <div>
      <div className="thumbnail">
      
        <img className="image-responsive" src={props.campground.img} />
        <div className="caption-full">
          
          {/* <h4 class="pull-right">{campground.price}/night</h4> */}
          <h4>{props.campground.name}</h4>
          <p>{props.campground.description}</p>
          <p><em>Submitted by no one yet</em></p>

        <form name="editCampgroundForm" onSubmit={(event) => {props.handleCampgroundSubmit(event, "EDIT", props.campground._id)}}>
    
          <div className="caption-full">
            <div className="form-group">
              <input defaultValue={props.campground.img} onChange={props.handleEditCampgroundChange} className="form-control secondary-font" type="text" name="img" placeholder="Campground Image" required />
            </div>

            <div className="form-group">
              <input defaultValue={props.campground.name} onChange={props.handleEditCampgroundChange} className="form-control secondary-font" type="text" name="name" placeholder="Campground name" required />
            </div>

            <div className="form-group">
              <textarea rows="10" defaultValue={props.campground.description} onChange={props.handleEditCampgroundChange} className="form-control secondary-font" type="text" name="description" placeholder="Campground description" required />
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary secondary-font">Submit changes</button>
          <button className="btn btn-danger secondary-font" onClick={props.toggleEditCampground}>Cancel</button>

        </form>

          {/* <p><em>Submitted by {campground.author.username}</em></p> */}

        </div>
      </div>
    </div>
  );
}

export default EditCampgroundThumbnail;