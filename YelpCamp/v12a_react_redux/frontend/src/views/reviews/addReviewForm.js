import React from "react";

const AddReviewForm = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-5">
          <form name="addReviewForm" onSubmit={(event) => {props.handleReviewSubmit(event, "ADD", props.campground._id)}}>

            <div className="form-group secondary-font">
              <input onChange={props.handleChange} className="form-control secondary-font" type="text" name="username" placeholder="author username" required />
            </div>

            <div className="form-group secondary-font">
              <textarea rows="5" onChange={props.handleChange} className="form-control" type="text" name="text" placeholder="Review here"/>
            </div>

            <div className="form-group secondary-font">
              <input onChange={props.handleChange} className="form-control" type="number" step="1" min="1" max="5" name="rating" placeholder="Rating" required />
            </div>

              <button type="submit" className="btn btn-primary btn-lg secondary-font" style={{margin: "10px 0px"}}>Submit Review</button>
              <button className="btn btn-lg btn-danger secondary-font" onClick={props.toggleAddReview}>Cancel</button>
          </form>
        </div>
        
      </div>
    </div>
  );

}

export default AddReviewForm;