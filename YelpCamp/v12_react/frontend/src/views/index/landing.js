import React from "react";
import { Link } from "react-router-dom";

const LandingPage = (props) => {
    return (
      <div>
        {/* <div class="container">
                <% if(error && error.length > 0){ %>
                    <div class="alert alert-danger" role="alert">
                        <%= error %>
                    </div>
                <% } %>
                <% if(success && success.length > 0){ %>
                    <div class="alert alert-success" role="alert">
                        <%= success %>
                    </div>
                <% } %>
            </div> */}
            
            <div id="landing-header">
                 <h1 className="title-font">Welcome to YelpCamp!</h1>
                <Link to="/campgrounds" className="btn btn-lg btn-primary secondary-font">View All Campgrounds</Link>
            </div>
            
            <ul className="slideshow">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
      </div>
            

        
    );
}

{/* // can also use module.exports instead of export default */}
export default LandingPage;