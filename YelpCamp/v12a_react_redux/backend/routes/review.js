let express = require("express");
let router = express.Router({mergeParams: true});
let Campground = require("../models/campground.js");
let Review = require("../models/review.js");





// ******************************************************************************************
// Review ROUTES
// ***********************************************************************************************

// CREATE
router.post("/", async(req, res) => {
  // create Review
  let review = await Review.create(req.body.newReview).catch((err) => {
    console.log("mongo Review.create error: " + err);
  });

  // save Review
  if(review) {
    review.save();
  }

  // add Review to campground for which it is associated
  // need to populate so that we dont have to call SHOW route again to display Reviews, Reviews are only IDs until we populate here
  let campground = await Campground.findById(req.params.campground_id).populate("reviews").exec().catch((err) => {
    console.log(err);
  });
  if (campground) {
    campground.reviews.push(review);
    campground.save();
    res.status(200);
    res.send(campground);
  }
});

// UPDATE (LIKE/DISLIKE/GENERAL UPDATE)
router.put("/:review_id", async (req, res) => {
  if (req.body.likeOrDislike) {
    let reviewToUpdate = await Review.findById(req.params.review_id).catch((err) => {
      console.log("mongo find review error put review: " + err);
    });

    if (req.body.likeOrDislike == "like") {
      reviewToUpdate.likes += 1;
      reviewToUpdate.save()
    }
  
    else if (req.body.likeOrDislike == "dislike") {
      reviewToUpdate.dislikes += 1;
      reviewToUpdate.save()
    }
  }
  
  else if (req.body.updatedReview) {
    // console.log(req.params.updatedReview);
    let updatedReview = await Review.findByIdAndUpdate(req.params.review_id, req.body.updatedReview).catch((err) => {
      console.log("mongo update review error: " + err);
    });
  }
  
  

  let foundCampground = await Campground.findById(req.params.campground_id).populate("reviews").exec().catch((err) => {
    console.log("mongo like review get cg error: " + error);
  });
  if (foundCampground) {
    res.send(foundCampground);
  }
});

// DESTROY
router.delete("/:review_id", async(req, res) => {
  // remove Review reference from campground Reviews array
  await removeReviewRefFromCG(req.params.id, req.params.review_id);
  
  // delete Review from db
  let delReviewResponse = await deleteReviewFromDB(req.params.review_id);

  // populate Reviews in updatedCG
  let updatedCG = Campground.findById(req.params.id).populate("reviews").exec().catch((err) => {
    console.log("mongoose find updated CG Review delete error: " + err);
  });

  // send updatedCG to frontend
  if (delReviewResponse && updatedCG) {
    res.send(updatedCG);
  }
});





// ************************************************
// Helper Functions
// ************************************************ 

async function deleteReviewFromDB(reviewID) {
  
  let delReviewResponse = await Review.findOneAndRemove({_id: reviewID}).catch((err) => {
    console.log("Mongo Review destroy error: " + err);
  });
  
  if (delReviewResponse) {
    return delReviewResponse;
  }
}


async function removeReviewRefFromCG(campgroundID, reviewID) {
  let foundCampground = await Campground.findById(campgroundID).catch((err) => {
    console.log("mongoose Review delete error: " + err);
  });
  
  if (foundCampground) {
    foundCampground.reviews.splice(foundCampground.reviews.indexOf(reviewID), 1);
    foundCampground.save();
    return;
  }
}


// export
module.exports = router;