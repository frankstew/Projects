import React from "react";
import AddReviewForm from "./addReviewForm.js";
import Review from "./review.js";

const AddReviewContainer = (props) => {
  return (
    <div className="well">
      {/* <div className="text-right">
        <button className="btn btn-success" onClick={props.toggleAddReview}>Leave a review</button>
      </div> */}
      
      <AddReviewForm 
        campground={props.campground}
        handleReviewSubmit={props.handleReviewSubmit}
        toggleAddReview={props.toggleAddReview}
      />

      <hr></hr>
      
      {props.reviews.slice(0).reverse().map((review) => {
        return (
          <Review 
            campground={props.campground}
            deleteReview={props.deleteReview}
            key={review._id}
            review={review} 
            toggleEditReview={props.toggleEditReview}
            reviewIDToEdit={props.reviewIDToEdit}
          />
        );
      })}
    </div>
  );
}

export default AddReviewContainer;