import React from "react";
import Review from "./review.js";

const DefaultReviewContainer = (props) => {
  return (
    <div className="well">
      
      {props.reviews.slice(0).reverse().map((review) => {
        return (
          <Review 
            campground={props.campground}
            deleteReview={props.deleteReview}
            key={review._id}
            review={review} 
            likeReview={props.likeReview}
            dislikeReview={props.dislikeReview}
            reviewIDToEdit={props.reviewIDToEdit}
            toggleEditReview={props.toggleEditReview}
            handleReviewSubmit={props.handleReviewSubmit}
          />
        );
      })}
    </div>
  );
}

export default DefaultReviewContainer;