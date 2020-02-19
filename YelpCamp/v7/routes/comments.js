var express = require("express");
var router = express.Router({mergeParams: true}); // dont need var router = express();
// mergeParams allows campground ids to get through to comment routes
var Campground = require("../models/campground.js");
var Comment = require("../models/comment.js");

// ===========================
// Comments Routes
// ===========================

// NEW - show new comment form, with middleware

router.get("/new", isLoggedIn, async (req, res) => {
	try {
		var foundCampground = await Campground.findOne({_id: req.params.id});
		res.render("comments/new.ejs", {campground: foundCampground, currentUser: req.user});
	} catch(err) {
		console.log(err);
	}
});


// CREATE - post new comment
router.post("/", isLoggedIn, async (req, res) => {
	try {
		var foundCampground = await Campground.findById(req.params.id);
		var comment = await Comment.create(req.body.comment);
		foundCampground.comments.push(comment);
		foundCampground.save();
		res.redirect("/campgrounds/" + req.params.id);
	} catch(err) {
		console.log(err);
		res.redirect("/campgrounds");
	}
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;