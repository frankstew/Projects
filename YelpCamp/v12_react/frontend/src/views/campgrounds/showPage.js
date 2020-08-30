import React from "react";
import { Link } from "react-router-dom";
import ShowCampgroundThumbnail from "./showCampgroundThumbnail.js";
import EditCampgroundThumbnail from "./editCampgroundThumbnail.js";
import Review from "../reviews/review.js";
import AddReviewForm from "../reviews/addReviewForm.js";
import DefaultReviewContainer from "../reviews/defaultReviewContainer.js";
import AddReviewContainer from "../reviews/addReviewContainer.js"

const ShowPage = (props) => {
  // console.log(props.campground);
  return (
    <div>
      <Link className="btn btn-default" to="/campgrounds">Back to campgrounds</Link>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <p className="lead">YelpCamp</p>
            <div className="list-group">
              <li className="list-group-item active">Campground Info</li>
              <li className="list-group-item">Photos</li>
            </div>
                {/* <!-- MAPS API ADDING A MAP -->
            <div id="map"></div>
            <div><button class="btn btn-info" id="directions">Directions</button></div>
             */}
          </div>
          <div className="col-md-9">
            {props.editingCampground ? 
              <EditCampgroundThumbnail 
                handleEditCampgroundChange={props.handleEditCampgroundChange}
                handleCampgroundSubmit={props.handleCampgroundSubmit}
                campground={props.campground}
                toggleEditCampground={props.toggleEditCampground}
              /> :
              <ShowCampgroundThumbnail 
                toggleEditCampground={props.toggleEditCampground}
                campground={props.campground}
                deleteCampground={props.deleteCampground}
                toggleAddReview={props.toggleAddReview}
                addingReview={props.addingReview}
              />
            }
            

            
            {props.addingReview ? 
              <AddReviewContainer 
                deleteReview={props.deleteReview}
                reviews={props.campground.reviews}
                campground={props.campground}
                handleReviewSubmit={props.handleReviewSubmit}
                toggleAddReview={props.toggleAddReview}
                likeReview={props.likeReview}
                dislikeReview={props.dislikeReview}
                toggleEditReview={props.toggleEditReview}
                reviewIDToEdit={props.reviewIDToEdit}
              />
              :
              <DefaultReviewContainer 
                campground={props.campground}
                deleteReview={props.deleteReview}
                toggleAddReview={props.toggleAddReview}
                reviews={props.campground.reviews}
                likeReview={props.likeReview}
                dislikeReview={props.dislikeReview}
                reviewIDToEdit={props.reviewIDToEdit}
                toggleEditReview={props.toggleEditReview}
                handleReviewSubmit={props.handleReviewSubmit}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowPage;