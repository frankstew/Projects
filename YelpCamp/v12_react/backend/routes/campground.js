let express = require("express");
let router = express.Router();
let Campground = require("../models/campground.js");
let Review = require("../models/review.js");


//====================================================
// CAMPGROUND ROUTES
// ====================================================

// Campground index route
router.get("/", async (req, res) => {
  //console.log(req.user);
	try{
		var allCampgrounds = await Campground.find({/*name: "idk*/});
		res.send({campgrounds: allCampgrounds/*, currentUser: req.user*/});
	} catch (err) {
		console.log(err);
	}	
});

// campground CREATE route
router.post("/", async (req, res) => {

  const newCG = {
    name: req.body.CampgroundName,
    img: req.body.CampgroundImg,
    description: req.body.CampgroundDescription
  };

  const newCampground = await Campground.insertMany([newCG]).catch((err) => {
    console.log("Error adding campground, mongoose error: " + err);
  });

  if (newCampground) {
    console.log("new Campground Added");
  }
// need to res.send something so that axios knows post was successful
  res.status(200).send();

});

// SHOW ROUTE
router.get("/:id", async (req, res) => {
  const campground = await Campground.findOne({_id: req.params.id}).populate("reviews").exec().catch((err) => {
    console.log("mongoose error show page: " + err);
  });
  if (campground) {
    res.send(campground);
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updatedCG = {
    name: req.body.editedCampground.updatedCampgroundName,
    img: req.body.editedCampground.updatedCampgroundImg,
    description: req.body.editedCampground.updatedCampgroundDescription
  };

  let foundCampground = await Campground.findByIdAndUpdate(req.params.id, updatedCG).catch((err) => {
    console.log("mongoose put error: " + err);
  });

  if (foundCampground) {
    res.send(updatedCG);
  }

});


// DESTrOYYYYYYYYYYYYYYY
router.delete("/:id", async (req, res) => {
  const campgroundToDelete = await Campground.findOne({_id: req.params.id}).catch((err) => {
    console.log("mongoose destroy error: " + err);
  });

  if (campgroundToDelete) {
    // delete Reviews first
    campgroundToDelete.reviews.forEach(async (review) => {
      await Review.findOneAndDelete({_id: review}).catch((err) => { // review returns just Review id because didnt populate.exec() them
        console.log("mongoose campground destroy: Reviews destroy error: " + err);
      });
    });

    // then delete campground
    await Campground.findOneAndDelete({_id: req.params.id}).catch((err) => {
      console.log("mongoose campground destroy error: " + err);
    });
    console.log("Campground Deleted");
    res.send("Campground Deleted");
  }
});

module.exports = router;