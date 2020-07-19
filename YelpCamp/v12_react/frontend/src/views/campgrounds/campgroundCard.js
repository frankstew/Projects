import React from "react";
import { Link } from "react-router-dom";

const CampgroundCard = (props) => {
  const showPageLink = "/campgrounds/" + props.campground._id;
  return (
    <div className="col-md-3 col-sm-6">
      <div className="thumbnail">
        <img src={props.campground.img} />
        <div className="caption">
          <h3 className="title-font">{props.campground.name}</h3>
          <p className="secondary-font">{props.campground.description}</p>
          {/* <Link to="/campground/:id" /> */}

          <Link to={showPageLink} className="btn btn-primary btn-sm secondary-font">
            See more info about {props.campground.name}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CampgroundCard;