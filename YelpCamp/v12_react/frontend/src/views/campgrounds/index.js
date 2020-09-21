import React, { Component } from "react";
import { Link } from "react-router-dom";
import AddCampgroundJumbotron from "./addCampgroundJumbotron.js";
import DefaultJumbotron from "./defaultJumbotron.js";
import CampgroundCard from "./campgroundCard.js";
import FlashMessage from "../layouts/flashMessage.js"

const IndexPage = (props) => {
  let rowStyle = {
          display: "flex",
          flexWrap: "wrap"
        }

    if (props.successMessage) {
      
      return (
        <div>
          <div className="container">
            <header className="jumbotron">
              <div className="container">
                <FlashMessage type={"success"} message={"SUCEESSSS"} />
                  {props.addingCampground ?
                    <AddCampgroundJumbotron
                      handleChange={props.handleChange}
                      handleCampgroundSubmit={props.handleCampgroundSubmit}
                      toggleAddCampground={props.toggleAddCampground} 
                    /> : 
                    <DefaultJumbotron
                      toggleAddCampground={props.toggleAddCampground}
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
              <div className = "row text-center" style={rowStyle}>
  
  {/* ternary bc need to wait for get request first */}
                {props.campgrounds ? 
                  props.campgrounds.map((campground, index) => {
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

    return (
      <div>
        <div className="container">
          <header className="jumbotron">
            <div className="container">
            
              {props.addingCampground ?
                <AddCampgroundJumbotron
                  handleChange={props.handleChange}
                  handleCampgroundSubmit={props.handleCampgroundSubmit}
                  toggleAddCampground={props.toggleAddCampground} 
                /> : 
                <DefaultJumbotron
                  toggleAddCampground={props.toggleAddCampground}
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
            <div className = "row text-center" style={rowStyle}>

{/* ternary bc need to wait for get request first */}
              {props.campgrounds ? 
                props.campgrounds.map((campground, index) => {
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

export default IndexPage;