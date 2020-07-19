var express = require("express");
var router = express.Router({mergeParams: true}); // dont need var router = express();
// mergeParams allows campground ids to get through to comment routes
var Campground = require("../models/campground.js");
var Comment = require("../models/comment.js");
var Middleware = require("../middleware/index.js");


// ===========================
// Comments Routes
// ===========================

// NEW - show new comment form, with middleware

router.get("/new", Middleware.isLoggedIn, async (req, res) => {
	try {
		var foundCampground = await Campground.findOne({_id: req.params.id});
		res.render("comments/new.ejs", {campground: foundCampground});
	} catch(err) {
		console.log(err);
	}
});


// CREATE - post new comment
router.post("/", Middleware.isLoggedIn, async (req, res) => {
	try {
		/* 
		was having trouble with a duplicate key error from mongo, duplicate was username: null in YelpCamp.comments. had to remove comments
		 collection AND campgrounds collection bc campgrounds still referenced the one with username:null
		*/
		var comment = await Comment.create(req.body.comment);
		// add username and id to comment
		comment.author.id = req.user._id;
		comment.author.username = req.user.username;
		// save comment and add to campground
		comment.save();
		var foundCampground = await Campground.findById(req.params.id);
		foundCampground.comments.push(comment);
		foundCampground.save();
		req.flash("success", "Thank you for reviewing this campground");
		res.redirect("/campgrounds/" + req.params.id);
	} catch(err) {
		console.log(err);
		req.flash("error", err.message);
		res.redirect("/campgrounds");
	}
});

// EDIT

router.get("/:comment_id/edit", Middleware.checkCommentOwnership, async (req, res) => {
	try {
		var foundCampground = await Campground.findById(req.params.id);
		var foundComment = await Comment.findById(req.params.comment_id);
		res.render("comments/edit.ejs", {comment: foundComment, campground: foundCampground});
	} catch(err) {
		console.log(err);
		req.flash("error", "Something went wrong");
		res.redirect("back");
	}

});
// UPDATE

router.put("/:comment_id", Middleware.checkCommentOwnership, async (req, res) => {
	try {
		var foundComment = await Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment);
		req.flash("success", "Review was updated");
		res.redirect("/campgrounds/" + req.params.id);
	} catch (err) {
		console.log(err);
		req.flash("error", err.message);
		res.redirect("/campgrounds");
	}
});

// DESTROY

router.delete("/:comment_id", Middleware.checkCommentOwnership, async (req, res) => {
	try {
		await Comment.findOneAndRemove({_id: req.params.comment_id});
		req.flash("success", "Review deleted succesfully");
		res.redirect("/campgrounds/" + req.params.id);
	}
	catch(err) {
		console.log(err);
		req.flash("error", err.message);
		res.redirect("/campgrounds/" + req.params.id);
	}
});





module.exports = router;