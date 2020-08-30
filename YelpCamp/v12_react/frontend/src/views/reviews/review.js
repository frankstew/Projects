import React from "react";
import EditReviewForm from "./editReviewForm.js";

const Review = (props) => {
  if (props.reviewIDToEdit && (props.reviewIDToEdit === props.review._id)) {
    return (
    <EditReviewForm 
      campground={props.campground}
      handleReviewSubmit={props.handleReviewSubmit}
      toggleAddReview={props.toggleAddReview}
      review={props.review}
    />
    );
  } 
  else {
    return (
     
    
    
      <div>
        <div className="row">
          <div className="col-md-3">
            <strong className="title-font">{props.review.username}</strong>
            <h6 className="secondary-font"><em>10 days ago</em></h6>
            <button className="btn btn-xs btn-primary" onClick={() => props.likeReview(props.campground._id, props.review._id)}>Like</button>
            <button className="btn btn-xs btn-danger" onClick={() => props.dislikeReview(props.campground._id, props.review._id)}>Dislike</button>
          </div>
          <div className="col-md-8">
            <p className="review-rating secondary-font">{props.review.rating} stars</p>
            <p><em>{props.review.likes} likes</em>  <em>{props.review.dislikes} dislikes</em></p>
    
            <p className="review-text secondary-font">
              {props.review.text} 
            </p>
          </div>
  
          <div className="col-md-1">
          <button className="delete-review pull-right btn btn-xs btn-danger" onClick={() => {props.deleteReview(props.campground._id, props.review._id)}}><i className="far fa-trash-alt"></i></button>
  
          <button className="btn btn-warning btn-xs" onClick={(event) => props.toggleEditReview(event, props.review._id)}>Edit</button>
  
            
        
            
            {/* <% if (currentUser && campground.reviews[i].author.id.equals(currentUser._id)) { %>
            <a href="/campgrounds/<%= campground._id %>/Reviews/<%= campground.reviews[i]._id %>/edit"><button class="btn btn-xs btn-warning">edit</button></a>
            <form action="/campgrounds/<%= campground._id %>/Reviews/<%= campground.reviews[i]._id %>?_method=DELETE" method="POST" class="delete-form">
              <button class="btn btn-xs btn-danger">Delete</button>
            </form> */}
          </div>
        </div>
        <hr></hr>
      </div>
      
    );
  }
  
}

export default Review;