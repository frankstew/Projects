import React from "react";
import { Link } from "react-router-dom";

const EditCampgroundThumbnail = (props) => {
  return (
    <div>
      <div className="thumbnail">
      <form name="editCampgroundForm" onSubmit={(event) => {props.handleCampgroundSubmit(event, "EDIT", props.campground._id)}}>
        
        <div className="form-group">
          <input defaultValue={props.campground.img} onChange={props.handleChange} className="form-control secondary-font" type="text" name="CampgroundImg" placeholder="Campground Image" required />
        </div>

        <div className="form-group">
          <input defaultValue={props.campground.name} onChange={props.handleChange} className="form-control secondary-font" type="text" name="CampgroundName" placeholder="Campground name" required />
        </div>

        <div className="form-group">
          <input defaultValue={props.campground.description} onChange={props.handleChange} className="form-control secondary-font" type="text" name="CampgroundDescription" placeholder="Campground description" required />
        </div>
        <button type="submit">EDIT</button>
      </form>
        <img className="image-responsive" src={props.campground.img} />
        <div className="caption-full">
          
          {/* <h4 class="pull-right">{campground.price}/night</h4> */}
          <h4>{props.campground.name}</h4>
          <p>{props.campground.description}</p>
          <p><em>Submitted by no one yet</em></p>

          <button className="btn btn-danger secondary-font" onClick={props.toggleEditCampground}>Cancel</button>
          <button className="btn btn-warning secondary-font">Edit Campground</button>
          <Link to="/campgrounds" className="btn btn-danger secondary-font" onClick={() => {props.deleteCampground(props.campground._id)}}>Delete Campground</Link>
          {/* <p><em>Submitted by {campground.author.username}</em></p> */}

        </div>
      </div>
    </div>
  );
}

export default EditCampgroundThumbnail;