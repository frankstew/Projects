import React, { Component } from "react";
import { Link } from "react-router-dom";
import AddCampgroundJumbotron from "./addCampgroundJumbotron.js";
import DefaultJumbotron from "./defaultJumbotron.js";
import CampgroundCard from "./campgroundCard.js";

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowStyle: {
        display: "flex",
        flexWrap: "wrap"
      }
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <header className="jumbotron">
            <div className="container">
              {this.props.addingCampground ?
                <AddCampgroundJumbotron
                  handleChange={this.props.handleChange}
                  handleCampgroundSubmit={this.props.handleCampgroundSubmit}
                  toggleAddCampground={this.props.toggleAddCampground} 
                /> : 
                <DefaultJumbotron
                  toggleAddCampground={this.props.toggleAddCampground}
                />
              } 
            </div>
          </header>

            {/* {this.props.campgrounds.map((cg, index) => {
              console.log(cg);
              return (
                <h1 key={index}>{cg.name}</h1>
              );
            })} */}
            <div className = "row text-center" style={this.state.rowStyle}>

{/* ternary bc need to wait for get request first */}
              {this.props.campgrounds ? 
                this.props.campgrounds.map((campground, index) => {
                  return (
                    <CampgroundCard 
                      campground={campground}
                      key={campground._id}
                    />
                  );
                }) :
                <h1>Loading...</h1>
                }
            </div>
          </div>
        </div>
    );
  }
}

export default IndexPage;