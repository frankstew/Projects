import React from "react";

const LoginForm = (props) => {
  let formInputStyle = {
    margin: "2rem 0"
  }
  return (
    <div className="container">
              <form className="form-group"  onSubmit={(e) => {props.handleLoginSubmit(e)}}>
                <input style={formInputStyle} className="active-cyan-4 mb-4 form-control" type="text" name="username" placeholder="Username" />
                <input style={formInputStyle} className="active-cyan-4 mb-4 form-control" type="password" name="password" placeholder="Password" />
                <button className="btn btn-lg btn-primary">Log In</button>
              </form>
    </div>
  
    );
}

export default LoginForm;