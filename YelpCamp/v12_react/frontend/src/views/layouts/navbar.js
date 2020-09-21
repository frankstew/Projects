import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  // let list;
  // if (props.currentUser) {
  //   let 
  // }
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand title-font" to="/">YelpCamp</Link>
        </div>
        
        <div className="collapse navbar-collapse">
        {props.currentUser && 
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/campgrounds" className="title-font">{props.currentUser.username}</Link></li>
            <li><Link to="/campgrounds" className="title-font" onClick={(e) => {props.handleLogoutSubmit(e)}}>Logout</Link></li>
          </ul>
        }

        {!props.currentUser &&
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/register" className="title-font">Sign Up</Link></li>
            <li><Link to="/login" className="title-font">Login</Link></li>
          </ul>
        }
          
        </div>
      </div>
    </nav>

    // {/* ERROR MESSAGE STUFF WITH CONNECT-FLASH */}
          //  {/* <div class="container">
          //     <% if (error && error.length > 0) {%>
          //       <div class="alert alert-danger">
          //         <%= error %>
          //       </div>
          //     <% } %>

          //     <% if (success && success.length > 0) { %>
          //       <div class="alert alert-success">
          //         <%= success %>
          //       </div>
          //     <% } %>
          //      </div> }
  );
}

export default Navbar;