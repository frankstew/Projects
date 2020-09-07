import axios from "axios";

let appFuncObj = {};

appFuncObj.handleAddCampgroundChange = function handleAddCampgroundChange(e) {
  e.persist();
  let value = e.target.value;
  this.setState(prevState => ({
    newCampground: {
      ...prevState.newCampground,
      [e.target.name]: value
    }
  }));
}

appFuncObj.handleEditCampgroundChange = function handleEditCampgroundChange(e) {
  e.persist();
  let value = e.target.value;
  this.setState(prevState => ({
    campgroundToShow: {
      ...prevState.campgroundToShow,
      [e.target.name]: value
    }
  }));
}

appFuncObj.getCampgroundData = async function getCampgroundData() {
  // check if campground was being edited, reset so editing goes away for next show page
  if (this.state.editingCampground) {
    this.setState({
      editingCampground: false,
    });
  }

  // check if adding comment so that it resets for next show page
  if (this.state.addingReview) {
    this.setState({
      addingReview: false
    });
  }
  const response = await axios.get("/campgrounds").catch((err) => {
    console.log("axios error: " + err);
  });

  if (response && (JSON.stringify(response.data.campgrounds) != JSON.stringify(this.state.campgrounds))) {
    this.setState({
      campgrounds: response.data.campgrounds,
      
    });
  } 
}


appFuncObj.getCampgroundShowData = async function getCampgroundShowData(campgroundID) {
  const response = await axios.get("/campgrounds/" + campgroundID).catch((err) => {
    console.log("axios show page error: " + err);
  });
  
  if (response && ((this.state.campgroundToShow._id !== campgroundID))) {
    this.setState({
      campgroundToShow: response.data
    });
  }
}

appFuncObj.deleteReview = async function deleteReview(campgroundID, reviewID) {
  const response = await axios.delete("/campgrounds/" + campgroundID + "/reviews/" + reviewID).catch((err) => {
    console.log("axios Review destroy error: " + err);
  });
  if (response) {
    this.setState({
      campgroundToShow: response.data
    });
  }
}

appFuncObj.likeReview = async function likeReview(campgroundID, reviewID) {
  const response = await axios.put("/campgrounds/" + campgroundID + "/reviews/" + reviewID, {
    likeOrDislike: "like"
  }).catch((err) => {
    console.log("axios like put error: " + err);
  });
  if (response) {
    this.setState({
      campgroundToShow: response.data
    });
  }
}

appFuncObj.dislikeReview = async function dislikeReview(campgroundID, reviewID) {
  const response = await axios.put("/campgrounds/" + campgroundID + "/reviews/" + reviewID, {
    likeOrDislike: "dislike"
  }).catch((err) => {
    console.log("axios like put error: " + err);
  });
  if (response) {
    this.setState({
      campgroundToShow: response.data
    });
  }
}

appFuncObj.deleteCampground = async function deleteCampground(campgroundID) {
  const response = await axios.delete("/campgrounds/" + campgroundID).catch((err) => {
    console.log("axios campground destroy error:" + err);
  });

  if (response) {
    await this.getCampgroundData().catch((err) => {
      console.log("getCampgroundData error: " + err);
    });
  }
}

appFuncObj.toggleAddCampground = function toggleAddCampground(e) {
  e.preventDefault();
  this.setState({
    addingCampground: !this.state.addingCampground
  });
}

appFuncObj.toggleEditCampground = function toggleEditCampground(e) {
  e.preventDefault();
  this.setState({
    editingCampground: !this.state.editingCampground
  });
}

appFuncObj.toggleAddReview = function toggleAddReview(e) {
  e.preventDefault();
  this.setState({
    addingReview: !this.state.addingReview,
    reviewIDToEdit: ""
  });
}

appFuncObj.toggleEditReview = async function toggleEditReview(e, reviewID) {
  e.preventDefault();
  // await bc sending the reviewID takes a little time I guess
  await this.setState({
    reviewIDToEdit: reviewID,
    addingReview: false
  });
}

appFuncObj.handleCampgroundSubmit = async function handleCampgroundSubmit(e, addOrEdit, campgroundID = null) {
  e.preventDefault();

  // if add campground
  if (addOrEdit === "ADD") {
    await axios.post("/campgrounds", this.state.newCampground).then((response) => {
      // console.log(response);
      this.setState({
        addingCampground: !this.state.addingCampground,
      });
    }).catch((err) => {
      console.log("axios post error: " + err);
    });
    // if edit campground
  } else if (addOrEdit === "EDIT") {
    
    const editedCampground = {
      updatedCampgroundName: e.target.name.value,
      updatedCampgroundImg: e.target.img.value,
      updatedCampgroundDescription: e.target.description.value
    }

    const response = await axios.put("/campgrounds/" + campgroundID, {
      editedCampground
    }).catch((err) => {
      console.log("axios put error: " + err);
    });
    
    if (response) {
      this.setState({
        editingCampground: !this.state.editingCampground,
        campgroundToShow: response.data
      });
    }
  }
}

appFuncObj.handleReviewSubmit = async function handleReviewSubmit(e, addOrEdit, campgroundID, reviewID = null) {
  e.preventDefault();
  let response;
  if (addOrEdit === "ADD") {
    const newReview = {
      username: e.target.username.value,
      text: e.target.text.value,
      rating: e.target.rating.value,
      likes: 0,
      dislikes: 0
    }
    // console.log(newReview);
    response = await axios.post("/campgrounds/" + campgroundID + "/reviews", {
      newReview: newReview
    }).catch((err) => {
      console.log("axios post Review error: " + err);
    });
  }
  
  else if (addOrEdit === "EDIT") {
    const updatedReview = {
      username: e.target.username.value,
      text: e.target.text.value,
      rating: e.target.rating.value
    }

    response = await axios.put("/campgrounds/" + campgroundID + "/reviews/" + reviewID, {updatedReview: updatedReview}).catch((err) => {
      console.log("axios put review error: " + err);
    });
  }

  if (response) {
    this.setState({
      addingReview: false,
      reviewIDToEdit: "",
      campgroundToShow: response.data
    });
  }
}

export default appFuncObj;