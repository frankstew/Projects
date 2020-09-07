import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand title-font" to="/">YelpCamp</Link>
        </div>
        
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
            {/* <% if (!currentUser) { %> */}
              <li><a href="/register" className="title-font">Sign Up</a></li>
              <li><a href="/login" className="title-font">Login</a></li>
            {/* <% } else { %> */}
              {/* <li><a href="#"><%= currentUser.username %></a></li> */}
              <li><a href="#" className="title-font">Frank</a></li>
            <li><a href="/logout" className="title-font">Logout</a></li>
            {/* <% } %> */}
          </ul>
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