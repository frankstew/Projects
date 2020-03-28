var express = require("express");
var router = express.Router(); // dont need var router = express();
var Campground = require("../models/campground.js");
var Comment = require("../models/comment.js");
var Middleware = require("../middleware/index.js");

//==================================
// CAMPGROUND ROUTES
// ================================

// INDEX - list all campgrounds
router.get("/", async (req, res) => { // just "/" bc of app.js require statements
	//console.log(req.user);
	try{
		var allCampgrounds = await Campground.find({/*name: "idk*/});
		res.render("campgrounds/index.ejs", {campgrounds: allCampgrounds, currentUser: req.user});
	} catch (err) {
		console.log(err);
	}
		
});

// CREATE - post a new campground to db
router.post("/", Middleware.isLoggedIn, async (req, res) => {
	var newCampground = req.body.CampgroundName;
	var newPrice = req.body.CampgroundPrice;
	var newImageURL = req.body.CampgroundImage;
	var newDescription = req.body.CampgroundDescription;
	var newAuthor = {
		id: req.user._id,
		username: req.user.username
	}
	var newCG = {
		name: newCampground,
		price: newPrice,
		img: newImageURL,
		description: newDescription,
		author: newAuthor
	};
	try {
		var newCampground = await Campground.insertMany([newCG]);
		console.log("New Camoground added");
		//console.log(newCampground);
		req.flash("success", "Campground added");
		res.redirect("/campgrounds"); // default to redirect as a GET request
	} catch (err) {
		console.log(err);
		req.flash("error", err.message);
		res.redirect("/campgrounds");
	}
	
});

// NEW - displays form for new campground
router.get("/new", Middleware.isLoggedIn, (req, res) => {
	res.render("campgrounds/new.ejs", {currentUser: req.user});
});



// SHOW - show info about 1 specific campground
// need campgrounds/new first ow will pop up as a id page
router.get("/:id", async (req, res) => {
	// show campground info with campground of id <id>
	// request sent by form via See more button on campgrounds page
	// want to render a show template with that campground
	try {
		var foundCampground = await Campground.findOne({_id: req.params.id}).populate("comments").exec();
		//res.send(campground);
		res.render("campgrounds/show.ejs", {campground: foundCampground});
	} catch (err) {
		req.flash("error", "Campground not found");
	}
});

// EDIT
router.get("/:id/edit", Middleware.checkCampgroundOwnership, async (req, res) => {
	try {
		var foundCampground = await Campground.findOne({_id: req.params.id});
		//res.send(campground);
		res.render("campgrounds/edit.ejs", {campground: foundCampground});
	} catch (err) {
		console.log(err);
		res.redirect("/campgrounds");
	}
}); 

// UPDATE

router.put("/:id", Middleware.checkCampgroundOwnership, async (req, res) => {
	try {
		var foundCampground = await Campground.findByIdAndUpdate(req.params.id, req.body.campground);
		//res.send(campground);
		req.flash("success", "Campground updated");
		res.redirect("/campgrounds/" + req.params.id);
	} catch (err) {
		console.log(err);
		req.flash("error", err.message);
		res.redirect("/campgrounds");
	}
});


// DESTROYYYYYYY

router.delete("/:id", Middleware.checkCampgroundOwnership, async (req, res) => {
	try {
		await Campground.findOneAndRemove({_id: req.params.id});
		req.flash("success", "Campground deleted");
		res.redirect("/campgrounds");
	}
	catch(err) {
		console.log(err);
		req.flash("error", err.message);
		res.redirect("/campgrounds/" + req.params.id);
	}
});



module.exports = router;
