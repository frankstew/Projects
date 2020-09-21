import React from "react";
import RegisterForm from "./registerForm.js";
import { Link } from "react-router-dom";

const RegisterPage = (props) => {
  let buttonStyle = {
    marginBottom: "3rem"
  }
  return (
    <div>
      <Link style={buttonStyle} className="btn btn-default" to="/campgrounds">Back to campgrounds</Link>
      <div className="container">
        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
            <div className="jumbotron signUp-jumbotron">
              <h1 className="against-background title-font">Sign Up</h1>

              <RegisterForm 
                handleRegisterSubmit={props.handleRegisterSubmit}
              />
            </div>
            
          </div>
          
        </div>
      
      </div>
    </div>
    
    
  )
}

export default RegisterPage;