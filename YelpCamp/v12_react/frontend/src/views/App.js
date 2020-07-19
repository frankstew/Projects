import React, { Component } from 'react';
import axios from "axios";

import { Switch, Route, Link, BrowserRouter as Router, Redirect } from "react-router-dom";
import LandingPage from "./landing.js";
import IndexPage from "./campgrounds/index.js";
import Navbar from "./layouts/navbar.js";
import ShowPage from "./campgrounds/show.js"
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
      redirectToCampgrounds: false,
      newCampground: {
        CampgroundName: "",
        CampgroundImg: "",
        CampgroundDescription: ""
      }
    };
  }
  // handleClick(event) {
  //   event.preventDefault();
  //   // if a request is made and it cant find it on the frontend, it will look to localhost 5000 bc that is what the proxy is set to
  //   axios.get("/").then((response) => {
  //     this.setState({
  //       message: response.data
  //     });
  //   }).catch(() => {
  //     console.log("Error");
  //   });
  // }

  handleAddCampgroundChange(e) {
    e.persist();
    let value = e.target.value;
    this.setState(prevState => ({
      newCampground: {
        ...prevState.newCampground,
        [e.target.name]: value
      }
    }));
  }

  handleEditCampgroundChange(e) {
    e.persist();
    let value = e.target.value;
    this.setState(prevState => ({
      editedCampground: {
        ...prevState.editedCampground,
        [e.target.name]: value
      }
    }));
  }

  async getCampgroundData() {
    const response = await axios.get("/campgrounds").catch((err) => {
      console.log("axios error: " + err);
    });

    if (response && (JSON.stringify(response.data.campgrounds) != JSON.stringify(this.state.campgrounds))) {
      this.setState({
        campgrounds: response.data.campgrounds
      });
    } 
  }

  async getCampgroundShowData(campgroundID, forceUpdate = false) {
    const response = await axios.get("/campgrounds/" + campgroundID).catch((err) => {
      console.log("axios show page error: " + err);
    });

    if (response && ((this.state.campgroundToShow._id !== campgroundID) || forceUpdate)) {
      this.setState({
        campgroundToShow: response.data
      })
    }
  }

  async deleteCampground(campgroundID) {
    const response = await axios.delete("/campgrounds/" + campgroundID).catch((err) => {
      console.log("axios destroy error:" + err);
    });

    if (response) {
      await this.getCampgroundData().catch((err) => {
        console.log("getCampgroundData error: " + err);
      });
      console.log("Campground Destroyed");
    }
  }

  toggleAddCampground(e) {
    e.preventDefault();
    const updatedAddingCampground = !this.state.addingCampground;
    this.setState({
      addingCampground: updatedAddingCampground
    });
  }

  toggleEditCampground(e) {
    e.preventDefault();
    this.setState({
      editingCampground: !this.state.editingCampground
    });
  }

  async handleCampgroundSubmit(e, addOrEdit, campgroundID = null) {
    e.preventDefault();

    // if add campground
    if (addOrEdit === "ADD") {
      await axios.post("/campgrounds", this.state.newCampground).then((response) => {
        // console.log(response);
        this.setState({
          addingCampground: !this.state.addingCampground,
          redirectToCampgrounds: true
        });
      }).catch((err) => {
        console.log("axios post error: " + err);
      });
      // if edit campground
    } else if (addOrEdit === "EDIT") {
      
      const editedCampground = {
        updatedCampgroundName: e.target.CampgroundName.value,
        updatedCampgroundImg: e.target.CampgroundImg.value,
        updatedCampgroundDescription: e.target.CampgroundDescription.value
      }

      const response = await axios.put("/campgrounds/" + campgroundID, {
        editedCampground
      }).catch((err) => {
        console.log("axios put error: " + err);
      });
      
      if (response) {
        this.setState({
          editingCampground: !this.state.editingCampground
        });
        // true to force the campgroundToShow to update, fix l9r
        this.getCampgroundShowData(campgroundID, true);
        console.log(response);
      }
    }
    

    
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
              return (<h1>Loading...</h1>);
            }
          }} />

          <Route exact path="/campgrounds/:id" 
            render={(routeProps) => {
              this.getCampgroundShowData(routeProps.match.params.id);
              if (this.state.campgroundToShow._id === routeProps.match.params.id) {
                return (
                  <div>
                    <Navbar />
                    <ShowPage 
                    handleCampgroundSubmit={this.handleCampgroundSubmit.bind(this)}
                      handleChange={this.handleEditCampgroundChange.bind(this)}
                      campground={this.state.campgroundToShow}
                      getCampgroundShowData={this.getCampgroundShowData.bind(this)}
                      toggleEditCampground={this.toggleEditCampground.bind(this)}
                      editingCampground={this.state.editingCampground}
                      {...routeProps}
                      deleteCampground={this.deleteCampground.bind(this)}
                    />
                  </div>
                );
              } else {
                return (<h1>Loading...</h1>);
              }
            }}  
          /> 
          
        </Switch>
      </Router>
    );
  }
}


export default App;