import React from "react";
import { Link } from "react-router-dom";

const ShowCampgroundThumbnail = (props) => {
  return (
    <div>
      <div className="thumbnail">
        <img className="image-responsive" src={props.campground.img} />
        <div className="caption-full">
          
          {/* <h4 class="pull-right">{campground.price}/night</h4> */}
          <h4>{props.campground.name}</h4>
          <p>{props.campground.description}</p>
          <p><em>Submitted by no one yet</em></p>

          <button className="btn btn-warning secondary-font" onClick={props.toggleEditCampground}>Edit Campground</button>
          <Link to="/campgrounds" className="btn btn-danger secondary-font" onClick={() => {props.deleteCampground(props.campground._id)}}>Delete Campground</Link>
          {props.addingReview ? 
          <span></span>
          :
          <button className="btn btn-success pull-right" onClick={props.toggleAddReview}>Leave a review</button>
          }
          {/* <p><em>Submitted by {campground.author.username}</em></p> */}

        </div>
      </div>
    </div>
  );
}

export default ShowCampgroundThumbnail;