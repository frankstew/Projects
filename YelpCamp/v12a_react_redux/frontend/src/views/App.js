import React, { Component } from 'react';
import axios from "axios";
import { Switch, Route, Link, BrowserRouter as Router, Redirect } from "react-router-dom";
import LandingPage from "./landing.js";
import IndexPage from "./campgrounds/index.js";
import Navbar from "./layouts/navbar.js";
import ShowPage from "./campgrounds/showPage.js";
import appFuncObj from "../appFuncs.js";
import PageNotFound from "./notFound.js";
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
      reviewIDToEdit: ""
    };
    this.handleAddCampgroundChange = appFuncObj.handleAddCampgroundChange.bind(this);
    this.handleEditCampgroundChange = appFuncObj.handleEditCampgroundChange.bind(this);
    this.getCampgroundData = appFuncObj.getCampgroundData.bind(this);
    this.getCampgroundShowData = appFuncObj.getCampgroundShowData.bind(this);
    this.deleteReview = appFuncObj.deleteReview.bind(this);
    this.likeReview = appFuncObj.likeReview.bind(this);
    this.dislikeReview = appFuncObj.dislikeReview.bind(this);
    this.deleteCampground = appFuncObj.deleteCampground.bind(this);
    this.toggleAddCampground = appFuncObj.toggleAddCampground.bind(this);
    this.toggleEditCampground = appFuncObj.toggleEditCampground.bind(this);
    this.toggleAddReview = appFuncObj.toggleAddReview.bind(this);
    this.toggleEditReview = appFuncObj.toggleEditReview.bind(this);
    this.handleCampgroundSubmit = appFuncObj.handleCampgroundSubmit.bind(this);
    this.handleReviewSubmit = appFuncObj.handleReviewSubmit.bind(this);
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
                  <Navbar />
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
                    <Navbar />
                    <ShowPage 
                    //data
                      campground={this.state.campgroundToShow}
                      editingCampground={this.state.editingCampground}
                      addingReview={this.state.addingReview}
                      {...routeProps}
                      reviewIDToEdit={this.state.reviewIDToEdit}
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
          <Route component={PageNotFound} />
        </Switch>
        
      </Router>
    );
  }
}


export default App;