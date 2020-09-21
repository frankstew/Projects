import React from "react";

const RegisterForm = (props) => {
  let formInputStyle = {
    margin: "2rem 0"
  }
  return (
    <div className="container">
              <form className="form-group"  onSubmit={(e) => {props.handleRegisterSubmit(e)}}>
                <input style={formInputStyle} className="active-cyan-4 mb-4 form-control" type="text" name="username" placeholder="Username" />
                <input style={formInputStyle} className="active-cyan-4 mb-4 form-control" type="password" name="password" placeholder="Password" />
                <input style={formInputStyle} className="active-cyan-4 mb-4 form-control" type="password" name="confirmPassword" placeholder="Confirm Password" />
                <button className="btn btn-lg btn-primary">Sign Up</button>
              </form>
    </div>
  
    );
}

export default RegisterForm;