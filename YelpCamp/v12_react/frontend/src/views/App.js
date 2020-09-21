import React, { Component } from 'react';
import axios from "axios";
import { Switch, Route, Link, BrowserRouter as Router, Redirect } from "react-router-dom";
import LandingPage from "./index/landing.js";
import IndexPage from "./campgrounds/index.js";
import Navbar from "./layouts/navbar.js";
import ShowPage from "./campgrounds/showPage.js";
import appFuncObj from "../appFuncs.js";
import PageNotFound from "./index/notFound.js";
import RegisterPage from "./index/register.js";
import LoginPage from "./index/login.js";
import FlashMessage from "./layouts/flashMessage.js"
// use "export default" with "import" and "module.exports" with "require"

// import { match } from 'assert';

// proxy in package.json doesnt work but this adds localhost 5000 to all requests
const localHostURL = "http://localhost:5000";
axios.defaults.baseURL = localHostURL;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campgroundToShow: {},
      campgrounds: null,
      editingCampground: false,
      addingCampground: false,
      addingReview: false,
      redirectToCampgrounds: false,
      newCampground: {},
      reviewIDToEdit: "",
      currentUser: "",
      // something like this...
      flash: {
        danger: "",
        success: "",
        info: "",
        warning: ""
      },
      failedRegister: false,
      failedLogin: false
    };
    
    // campgrounds
    this.handleAddCampgroundChange = appFuncObj.handleAddCampgroundChange.bind(this);
    this.handleEditCampgroundChange = appFuncObj.handleEditCampgroundChange.bind(this);
    this.getCampgroundData = appFuncObj.getCampgroundData.bind(this);
    this.getCampgroundShowData = appFuncObj.getCampgroundShowData.bind(this);
    this.deleteCampground = appFuncObj.deleteCampground.bind(this);
    this.toggleAddCampground = appFuncObj.toggleAddCampground.bind(this);
    this.toggleEditCampground = appFuncObj.toggleEditCampground.bind(this);
    this.handleCampgroundSubmit = appFuncObj.handleCampgroundSubmit.bind(this);
    // reviews
    this.toggleAddReview = appFuncObj.toggleAddReview.bind(this);
    this.toggleEditReview = appFuncObj.toggleEditReview.bind(this);
    this.deleteReview = appFuncObj.deleteReview.bind(this);
    this.likeReview = appFuncObj.likeReview.bind(this);
    this.dislikeReview = appFuncObj.dislikeReview.bind(this);
    this.handleReviewSubmit = appFuncObj.handleReviewSubmit.bind(this);
    // auth
    this.handleRegisterSubmit = appFuncObj.handleRegisterSubmit.bind(this);
    this.handleLoginSubmit = appFuncObj.handleLoginSubmit.bind(this);
    this.handleLogoutSubmit = appFuncObj.handleLogoutSubmit.bind(this);
    // set state from any component, pass in obj key: val pair and it will call setState
    this.resetState = appFuncObj.resetState.bind(this);
  }


  render() {
    return (
// {/* REACT ROUTER ROUTES */}
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          
          <Route exact path="/campgrounds" render={() => {
            this.getCampgroundData();
            if (this.state.campgrounds) {
              return (
                <div>
                  <Navbar 
                    currentUser={this.state.currentUser}
                    handleLogoutSubmit={this.handleLogoutSubmit}
                  />
                  <IndexPage 
                    handleChange={this.handleAddCampgroundChange.bind(this)}
                    handleCampgroundSubmit={this.handleCampgroundSubmit.bind(this)}
                    addingCampground={this.state.addingCampground}
                    toggleAddCampground={this.toggleAddCampground.bind(this)}
                    campgrounds={this.state.campgrounds} 
                  />
                </div>
              );
            } else {
              return (<h1 className="secondary-font">Loading...</h1>);
            }
          }} />

          <Route exact path="/campgrounds/:id" 
            render={(routeProps) => {
              this.getCampgroundShowData(routeProps.match.params.id);
              if ((this.state.campgroundToShow._id === routeProps.match.params.id)) {
                return (
                  <div>
                    <Navbar 
                      currentUser={this.state.currentUser}
                      handleLogoutSubmit={this.handleLogoutSubmit}
                    />
                    <ShowPage 
                    //data
                      campground={this.state.campgroundToShow}
                      editingCampground={this.state.editingCampground}
                      addingReview={this.state.addingReview}
                      {...routeProps}
                      reviewIDToEdit={this.state.reviewIDToEdit}
                      resetState={this.resetState}
                    //fcns
                      deleteReview={this.deleteReview.bind(this)}
                      handleReviewSubmit={this.handleReviewSubmit.bind(this)}
                      handleCampgroundSubmit={this.handleCampgroundSubmit.bind(this)}
                      handleEditCampgroundChange={this.handleEditCampgroundChange.bind(this)}
                      getCampgroundShowData={this.getCampgroundShowData.bind(this)}
                      deleteCampground={this.deleteCampground.bind(this)}
                    //toggle fcns
                      toggleEditCampground={this.toggleEditCampground.bind(this)}
                      toggleAddReview={this.toggleAddReview.bind(this)}
                      likeReview={this.likeReview.bind(this)}
                      dislikeReview={this.dislikeReview.bind(this)}
                      toggleEditReview={this.toggleEditReview.bind(this)}
                    />
                  </div>
                );
              } else {
                return (<h1 className="secondary-font">Loading...</h1>);
              }
            }}  
          /> 

          <Route exact path="/register" 
            render={() => {
              if (this.state.currentUser) {
                return <Redirect to="/campgrounds" />
              }
              if (this.state.failedRegister) {
                return (
                  <div>
                  <Navbar 
                    currentUser={this.state.currentUser}
                    handleLogoutSubmit={this.handleLogoutSubmit}
                  />
                  <h1 className="against-background title-font">Sorry passwords don't match, try again</h1>
                  {/* <FlashMessage type={"danger"} message={this.state.flash.danger} /> */}
                  <RegisterPage 
                    handleRegisterSubmit={this.handleRegisterSubmit}
                  />
                </div>
                );
              }
                return (
                  <div>
                  <Navbar 
                    currentUser={this.state.currentUser}
                    handleLogoutSubmit={this.handleLogoutSubmit}
                  />
                  {/* <FlashMessage type={"danger"} message={this.state.flash.danger} /> */}
                  <RegisterPage 
                    handleRegisterSubmit={this.handleRegisterSubmit}
                  />
                </div>
                );
              
            }} 
          />

          <Route exact path="/login" 
            render={() => {
              if (this.state.currentUser) {
                return <Redirect to="/campgrounds" />
              }
              if (this.state.failedLogin) {
                return (
                  <div>
                  <Navbar 
                    currentUser={this.state.currentUser}
                    handleLogoutSubmit={this.handleLogoutSubmit}
                  />
                  <h1 className="against-background title-font">Incorrect Username or password</h1>
                  {/* <FlashMessage type={"danger"} message={this.state.flash.danger} /> */}
                  <LoginPage 
                    handleLoginSubmit={this.handleLoginSubmit}
                  />
                </div>
                );
              }
                return (
                  <div>
                  <Navbar 
                    currentUser={this.state.currentUser}
                    handleLogoutSubmit={this.handleLogoutSubmit}
                  />
                  {/* <FlashMessage type={"danger"} message={this.state.flash.danger} /> */}
                  <LoginPage 
                    handleLoginSubmit={this.handleLoginSubmit}
                  />
                </div>
                );
              
            }} 
          />
          <Route component={PageNotFound} />
        </Switch>
        
      </Router>
    );
  }
}


export default App;