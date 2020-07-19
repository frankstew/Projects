import React from "react";
import { Link } from "react-router-dom";
import ShowCampgroundThumbnail from "./showCampgroundThumbnail.js";
import EditCampgroundThumbnail from "./editCampgroundThumbnail.js";

const ShowPage = (props) => {
  return (
    <div>
      <Link className="btn btn-default" to="/campgrounds">Back to campgrounds</Link>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <p className="lead">YelpCamp</p>
            <div className="list-group">
              <li className="list-group-item active">infor 1</li>
              <li className="list-group-item">infor 1</li>
              <li className="list-group-item">infor 1</li>
            </div>
                {/* <!-- MAPS API ADDING A MAP -->
            <div id="map"></div>
            <div><button class="btn btn-info" id="directions">Directions</button></div>
             */}
          </div>
          <div className="col-md-9">
          {props.editingCampground ? 
            <EditCampgroundThumbnail 
              handleChange={props.handleChange}
              handleCampgroundSubmit={props.handleCampgroundSubmit}
              campground={props.campground}
              toggleEditCampground={props.toggleEditCampground}
            /> :
            <ShowCampgroundThumbnail 
              toggleEditCampground={props.toggleEditCampground}
              campground={props.campground}
              deleteCampground={props.deleteCampground}
            />
          }
            

            <div className="well">
              <div className="text-right">
                <a  className="btn btn-success" href="/campgrounds/<%= campground._id %>/comments/new">Leave a review</a>
              </div>
              <hr />
              {props.campground.comments.map((comment) => {
                return (
                  <div key={comment._id}>
                    <div className="row">
                      <div className="col-md-12">
                        <strong>{comment.username}</strong>
                        <span className="pull-right">10 days ago</span>
                        <p>{comment.text}</p>
                        {/* <% if (currentUser && campground.comments[i].author.id.equals(currentUser._id)) { %>
                        <a href="/campgrounds/<%= campground._id %>/comments/<%= campground.comments[i]._id %>/edit"><button class="btn btn-xs btn-warning">edit</button></a>
                        <form action="/campgrounds/<%= campground._id %>/comments/<%= campground.comments[i]._id %>?_method=DELETE" method="POST" class="delete-form">
                          <button class="btn btn-xs btn-danger">Delete</button>
                        </form> */}
                      </div>
                    </div>
                  </div>
                );
                
              })}

			</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowPage;